import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import * as child_process from "child_process";
export interface ApproachOneStatelessStackProps extends cdk.StackProps {
  apiUrl: string;
}
export class FrontendStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: ApproachOneStatelessStackProps
  ) {
    super(scope, id, props);

    const apiUrl = cdk.Fn.importValue("ApiUrl");
    const userPoolId = cdk.Fn.importValue("UserPoolId");
    const userPoolClientId = cdk.Fn.importValue("UserPoolClientId");
    const identityPoolId = cdk.Fn.importValue("IdentityPoolId");

    const hostingBucket = new Bucket(this, "FrontendBucket", {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const distribution = new Distribution(this, "CloudfrontDistribution", {
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(hostingBucket),
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

    // Build the frontend
    child_process.execSync(`npm run build`, {
      cwd: "../frontend/",
      env: {
        ...process.env,
        VITE_API_URL: apiUrl,
        VITE_USER_POOL_ID: userPoolId,
        VITE_USER_POOL_CLIENT_ID: userPoolClientId,
        VITE_IDENTITY_POOL_ID: identityPoolId,
      },
    });

    new BucketDeployment(this, "BucketDeployment", {
      sources: [Source.asset("../frontend/dist")],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: distribution.domainName,
      description: "The distribution URL",
    });
  }
}
