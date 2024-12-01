import {
  RDSDataClient,
  ExecuteStatementCommand,
  ExecuteStatementCommandInput,
} from "@aws-sdk/client-rds-data";

import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

import { Tracer } from "@aws-lambda-powertools/tracer";
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware";
import middy from "@middy/core";

const dbClusterArn = process.env.DB_CLUSTER_ARN;
const secretArn = process.env.DB_SECRET_ARN;
const databaseName = process.env.DB_NAME;

const TABLE = "items";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const tracer = new Tracer({ serviceName: "getItemFunction" });
const rdsClient = tracer.captureAWSv3Client(new RDSDataClient());

export const lambdaHandler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    console.log("~received request ", event);

    // @ts-ignore
    let claims = event.requestContext.authorizer?.jwt;

    console.log("~jwwt ", JSON.stringify(claims));

    claims = claims.claims;

    if (!claims) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "User not authorized" }),
      };
    }
    const userId = claims.sub; // Cognito User Pool ID (unique identifier)
    const userEmail = claims.email; // User's email address, if available

    console.log("Authenticated user:", { userId, userEmail });
    return {
      statusCode: 200,
      body: JSON.stringify(event),
    };
  } catch (error) {
    console.error("Error executing query:", error);
    return {
      statusCode: 500,
      body: "error",
    };
  }
};

// Wrap the handler with middy
export const handler = middy(lambdaHandler)
  // Use the middleware by passing the Tracer instance as a parameter
  .use(captureLambdaHandler(tracer));

// const id = request.pathParameters?.id;

// console.log(`id: ${id}`);

// if (!id) {
//   return {
//     statusCode: 400,
//     body: JSON.stringify({ error: "Missing 'id' parameter" }),
//   };
// }
// const sql = `SELECT * FROM ${TABLE} WHERE id = :id`;
//   const parameters = [{ name: "id", value: { longValue: Number(id) } }];

//   const params: ExecuteStatementCommandInput = {
//     secretArn: secretArn,
//     resourceArn: dbClusterArn,
//     sql: sql,
//     database: databaseName,
//     parameters: parameters,
//   };

//   const command = new ExecuteStatementCommand(params);
//   const response = await rdsClient.send(command);

//   const items: Item[] = (response.records || []).map((record: any) => ({
//     id: record[0].longValue as number,
//     name: record[1].stringValue as string,
//     description: record[2].stringValue as string,
//     price: record[3].doubleValue as number,
//     image: record[4].stringValue as string,
//   }));
