import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as rds from "aws-cdk-lib/aws-rds";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigatewayv2Authorizers from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Duration } from "aws-cdk-lib";
import { Architecture } from "aws-cdk-lib/aws-lambda";
import path = require("path");
import { Provider } from "aws-cdk-lib/custom-resources";
import { computeDirHash } from "./utils";

export class BackendStack extends cdk.Stack {
  public readonly apiUrl: string;
  public readonly userPoolId: string;
  public readonly userPoolClientId: string;
  public readonly identityPoolId: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2,
      natGateways: 0, // Adding a NAT Gateway for outbound internet access
      subnetConfiguration: [
        {
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC, // Public subnets for Lambda
          cidrMask: 24,
        },
        {
          name: "PrivateDatabase",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // No outbound internet
          cidrMask: 24,
        },
      ],
    });

    const dbSecret = new secretsmanager.Secret(this, "Secret", {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "master" }),
        generateStringKey: "password",
        excludePunctuation: true,
        includeSpace: false,
      },
    });

    const databaseSecurityGroup = new ec2.SecurityGroup(
      this,
      "DatabaseSecurityGroup",
      { vpc }
    );

    const dbInstance = new rds.DatabaseInstance(this, "PostgreSqlInstance", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        ec2.InstanceSize.MICRO
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [databaseSecurityGroup],
      allocatedStorage: 20,
      storageType: rds.StorageType.GP2,
      multiAz: false,
      publiclyAccessible: false,
      backupRetention: cdk.Duration.days(2), // bump this up when going live
      deleteAutomatedBackups: true,
      deletionProtection: false,
      credentials: rds.Credentials.fromSecret(dbSecret),
    });

    const rdsAPIFunction = new nodeLambda.NodejsFunction(
      this,
      "RdsAPIFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        entry: "lambda/handlers/entry-auth-handler.ts",
        handler: "handler",
        vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        allowAllOutbound: true,
        allowPublicSubnet: true, // Enable internet access for the function
        tracing: cdk.aws_lambda.Tracing.ACTIVE,
        environment: {
          DB_SECRET_ARN: dbSecret.secretArn,
          DB_URL: dbInstance.dbInstanceEndpointAddress,
          DB_NAME: "postgres",
        },
        bundling: {
          minify: true,
          sourceMap: true,
          keepNames: true,
          format: nodeLambda.OutputFormat.ESM,
          sourcesContent: true,
          mainFields: ["module", "main"],
          externalModules: [], // we bundle all the dependencies
          esbuildArgs: {
            "--tree-shaking": "true",
          },
          // We include this polyfill to support `require` in ESM due to AWS X-Ray SDK for Node.js not being ESM compatible
          banner:
            'import { createRequire } from "module";const require = createRequire(import.meta.url);',
        },
      }
    );

    const migrationsDir = path.join(__dirname, "..", `/lambda/db/migrations`);
    const lambdaMigratorFunction = new nodeLambda.NodejsFunction(
      this,
      `cuddle-db-migration-function`,
      {
        memorySize: 128,
        timeout: Duration.seconds(60),
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        architecture: Architecture.ARM_64,
        bundling: {
          commandHooks: {
            beforeBundling: (_, _a: string) => [],
            beforeInstall: (_, _a: string) => [],
            afterBundling: (_, outputDir: string) => {
              return [
                `mkdir -p ${outputDir}/migrations && cp -r ${migrationsDir}/* ${outputDir}/migrations`,
              ];
            },
          },
        },
        entry: path.join(__dirname, "../lambda/db/migrate.ts"),
        functionName: `cuddle-db-migration`,
        handler: "handler",
        vpc: vpc,
        vpcSubnets: vpc.selectSubnets({
          subnetType: ec2.SubnetType.PUBLIC,
        }),
        allowAllOutbound: true,
        allowPublicSubnet: true,
        environment: {
          DB_SECRET_ARN: dbSecret.secretArn,
          DB_URL: dbInstance.dbInstanceEndpointAddress,
          DB_NAME: "postgres",
        },
      }
    );

    databaseSecurityGroup.addIngressRule(
      ec2.Peer.securityGroupId(
        rdsAPIFunction.connections.securityGroups[0].securityGroupId
      ),
      ec2.Port.tcp(5432),
      "Allow Lambda access"
    );
    databaseSecurityGroup.addIngressRule(
      ec2.Peer.securityGroupId(
        lambdaMigratorFunction.connections.securityGroups[0].securityGroupId
      ),
      ec2.Port.tcp(5432),
      "Allow Lambda access"
    );

    dbInstance.connections.addSecurityGroup(databaseSecurityGroup);

    dbSecret.grantRead(rdsAPIFunction);
    dbSecret.grantRead(lambdaMigratorFunction);

    const dbMigrationProvider = new Provider(this, "DbMigrationProvider", {
      onEventHandler: lambdaMigratorFunction,
    });

    const customResource = new cdk.CustomResource(
      this,
      "Custom::DbSchemaMigration",
      {
        serviceToken: dbMigrationProvider.serviceToken,
        resourceType: "Custom::DbSchemaMigration",
        properties: {
          migrationDirectoryHash: computeDirHash(migrationsDir),
        },
      }
    );

    const cuddleAuthedIntegration = new HttpLambdaIntegration(
      "cuddleAuthedIntegration",
      rdsAPIFunction
    );

    const userPool = new cognito.UserPool(this, "CuddleUserPool", {
      userPoolName: "CuddleUserPool",
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: { email: { required: true, mutable: true } },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      authFlows: { userPassword: true, userSrp: true },
      oAuth: {
        scopes: [cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL],
      },
    });

    const authorizer = new apigatewayv2Authorizers.HttpUserPoolAuthorizer(
      "CuddleUserPoolAuthorizer",
      userPool,
      {
        userPoolClients: [userPoolClient],
        identitySource: ["$request.header.Authorization"],
      }
    );
    const httpApi = new apigatewayv2.HttpApi(this, "cuddleAuthedApi", {
      defaultAuthorizer: authorizer,
      createDefaultStage: true,
      apiName: "cuddle-api",
      defaultIntegration: cuddleAuthedIntegration,
    });

    this.apiUrl = httpApi.apiEndpoint;

    this.userPoolId = userPool.userPoolId;
    this.userPoolClientId = userPoolClient.userPoolClientId;

    const identityPool = new cognito.CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: true,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    this.identityPoolId = identityPool.ref;

    const authenticatedRole = new iam.Role(
      this,
      "CognitoDefaultAuthenticatedRole",
      {
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": identityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "authenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
      }
    );

    const unauthenticatedRole = new iam.Role(
      this,
      "CognitoDefaultUnauthenticatedRole",
      {
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": identityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "unauthenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
      }
    );

    authenticatedRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonCognitoPowerUser")
    );
    unauthenticatedRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonCognitoReadOnly")
    );

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      "IdentityPoolRoleAttachment",
      {
        identityPoolId: identityPool.ref,
        roles: {
          authenticated: authenticatedRole.roleArn,
          unauthenticated: unauthenticatedRole.roleArn,
        },
      }
    );

    new cdk.CfnOutput(this, "UserPoolIdOutput", {
      value: this.userPoolId,
      exportName: "UserPoolId",
    });

    new cdk.CfnOutput(this, "UserPoolClientIdOutput", {
      value: this.userPoolClientId,
      exportName: "UserPoolClientId",
    });

    new cdk.CfnOutput(this, "IdentityPoolIdOutput", {
      value: this.identityPoolId,
      exportName: "IdentityPoolId",
    });

    new cdk.CfnOutput(this, "ApiUrlOutput", {
      value: this.apiUrl,
      exportName: "ApiUrl",
    });
  }
}
