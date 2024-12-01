import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as rds from "aws-cdk-lib/aws-rds";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as iam from "aws-cdk-lib/aws-iam";

export class BackendStack extends cdk.Stack {
  public readonly apiUrl: string;
  public readonly userPoolId: string;
  public readonly userPoolClientId: string;
  public readonly identityPoolId: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new cdk.aws_ec2.Vpc(this, "Vpc", {
      maxAzs: 2,
    });

    const dbSecret = new secretsmanager.Secret(this, "Secret", {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "master" }),
        generateStringKey: "password",
        excludePunctuation: true,
        includeSpace: false,
      },
    });

    const cluster = new rds.DatabaseCluster(this, "Database", {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_16_4,
      }),
      writer: rds.ClusterInstance.serverlessV2("writerInstance"),
      vpc,
      credentials: rds.Credentials.fromSecret(dbSecret),
      enableDataApi: true,
      serverlessV2MaxCapacity: 6,
      serverlessV2MinCapacity: 0.5,
      defaultDatabaseName: "postgres",
    });

    const rdsAPIFunction = new nodeLambda.NodejsFunction(
      this,
      "RdsAPIFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        entry: "lambda/handlers/getItem.ts",
        handler: "handler",
        environment: {
          DB_SECRET_ARN: dbSecret.secretArn,
          DB_CLUSTER_ARN: cluster.clusterArn,
          DB_NAME: "postgres",
        },
      }
    );

    cluster.grantDataApiAccess(rdsAPIFunction);
    dbSecret.grantRead(rdsAPIFunction);

    const itemsIntegration = new HttpLambdaIntegration(
      "ItemsIntegration",
      rdsAPIFunction
    );

    const httpApi = new apigatewayv2.HttpApi(this, "ItemsApi");

    httpApi.addRoutes({
      path: "/items/{id}",
      methods: [apigatewayv2.HttpMethod.GET],
      integration: itemsIntegration,
    });

    const userPool = new cognito.UserPool(this, "CuddleUserPool", {
      userPoolName: "CuddleUserPool",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true, // Allow sign-in with email
      },
      autoVerify: {
        email: true, // Automatically verify email
      },
      standardAttributes: {
        email: {
          required: true, // Email is a required attribute
          mutable: true,
        },
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY, // Account recovery via email only
    });

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      authFlows: {
        userPassword: true, // Allow password-based authentication
        userSrp: true,
      },
    });

    this.userPoolId = userPool.userPoolId;
    this.userPoolClientId = userPoolClient.userPoolClientId;

    const identityPool = new cognito.CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: true, // Only authenticated users
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    this.identityPoolId = identityPool.ref;
    // IAM Role for Authenticated Users
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

    // IAM Role for Unauthenticated Users (optional)
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

    // Attach Policies to Roles
    authenticatedRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonCognitoPowerUser")
    );
    unauthenticatedRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonCognitoReadOnly")
    );

    // Attach Roles to Identity Pool
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

    this.apiUrl = httpApi.apiEndpoint;

    new cdk.CfnOutput(this, "ApiUrlOutput", {
      value: this.apiUrl,
      exportName: "ApiUrl",
    });
  }
}
