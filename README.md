# Cuddle

This repository contains the source code for cuddle companion app.

It's split into a monorepo using npm workspace style packages/

`packages/frontend` contains the front end react project

`packages/infra` contains the cdk aws architecture and lambda handlers



# Architecture

We use a fairly typical APIG -> Lambda -> RDS architecture with with a lambda handler REST API.

All the aws resources are reproducible via IAC using CDK.

Checkout `infra/lib`  for each stack and `infra/bin` for the app

# Authentication

Authentication occurs via cognito user pool. So the api gateway has a default authenticator using the user pool identity.

Unauthenticated routes are handled via the lambda `entry-public-handler` and for the most part are read only

Authenticated routes are handled via the lambda `entry-auth-handler`.

We use middy for routing to the appropriate nested request handler.

# Database and Migrations

The database is an RDS postgres instance with a secrets manager authentication.

We use drizzle as a typed db client, schema, and migrator.

There is a custom cdk resource that migrates the database on each deploy by calling the lambda handler at `db/migrate.ts`.

When updating the schema run `cd lambda/db && drizzle-kit generate` which will automatically generate the sql file and apply it on the next deployment.


# Deployment and development
cd into `packages/infra` and run `cdk deploy --all --context stackName=yourName` to provision the aws resources.
This should populate your frontend .env with the required variables
cd into `packages/frontend` and npm run dev to develop the frontend locally

