import "dotenv/config";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDSDataClient } from "@aws-sdk/client-rds-data";

const rdsClient = new RDSDataClient({ region: "us-east-1" });
console.log(
  "~attempting to connect to rds data client with following env vars"
);
console.log("~database ", process.env["DATABASE"]!);
console.log("~SECRET_ARN ", process.env["SECRET_ARN"]!);
console.log("~RESOURCE_ARN ", process.env["RESOURCE_ARN"]!);

export const db = drizzle(rdsClient, {
  database: process.env["DATABASE"]!,
  secretArn: process.env["SECRET_ARN"]!,
  resourceArn: process.env["RESOURCE_ARN"]!,
});
