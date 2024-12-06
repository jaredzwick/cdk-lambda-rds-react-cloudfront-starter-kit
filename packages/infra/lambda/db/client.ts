import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const initDrizzleContext = async () => {
  const secretsManagerClient = new SecretsManagerClient({});

  // Retrieve the database credentials from Secrets Manager
  const secretValue = await secretsManagerClient.send(
    new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN })
  );
  const secret = JSON.parse(secretValue.SecretString!);

  const { username, password } = secret;

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

  const db = drizzle(client, {
    schema,
  });

  return db;
};
