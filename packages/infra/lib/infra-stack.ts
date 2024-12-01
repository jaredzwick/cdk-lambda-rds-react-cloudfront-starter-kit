import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as rds from "aws-cdk-lib/aws-rds";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
const path = "./resources/";
export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostingBucket = new Bucket(this, "FrontendBucket", {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const distribution = new Distribution(this, "CloudfrontDistribution", {
      defaultBehavior: {
        origin: new S3Origin(hostingBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    new BucketDeployment(this, "BucketDeployment", {
      sources: [Source.asset(path)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new CfnOutput(this, "CloudFrontURL", {
      value: distribution.domainName,
      description: "The distribution URL",
      exportName: "CloudfrontURL",
    });

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
        entry: "lambda/handlers/getItem.ts", // Path to the Lambda function code
        handler: "handler", // Exported handler function name
        tracing: cdk.aws_lambda.Tracing.ACTIVE, // Enable X-Ray tracing
        environment: {
          DB_SECRET_ARN: dbSecret.secretArn,
          DB_CLUSTER_ARN: cluster.clusterArn,
          DB_NAME: "postgres",
          POWERTOOLS_SERVICE_NAME: "getItemService",
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
  }
}
