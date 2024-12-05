import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Client } from "pg";
import middy from "@middy/core";

export const getHandler = middy().handler(
  async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
      console.log("~received event ", event);
      const secretsManagerClient = new SecretsManagerClient({});

      // Retrieve the database credentials from Secrets Manager
      const secretValue = await secretsManagerClient.send(
        new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN })
      );
      console.log("~secretValue ", secretValue);

      const secret = JSON.parse(secretValue.SecretString!);
      console.log("~secret ", secret);

      const { username, password } = secret;
      console.log("~username ", username);
      console.log("~password ", password);

      // Configure the PostgreSQL client
      const client = new Client({
        host: process.env.DB_URL,
        user: username,
        password: password,
        database: process.env.DB_NAME,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      // Connect to the database
      await client.connect();
      const res = await client.query("SELECT NOW()");
      console.log("Current time from database:", res.rows);

      // Close the connection
      await client.end();
      return {
        statusCode: 200,
        body: JSON.stringify(res),
      };
    } catch (error) {
      console.error("Error executing query:", error);
      return {
        statusCode: 500,
        body: "error",
      };
    }
  }
);

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
