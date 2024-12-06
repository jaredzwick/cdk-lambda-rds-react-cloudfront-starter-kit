#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";
import { FrontendStack } from "../lib/frontend-stack";
import { writeEnv } from "../lib/utils";

const app = new cdk.App();
const stackName = app.node.tryGetContext("stackName");
const backendStack = new BackendStack(app, "BackendStack", {
  stackName: `${stackName}-cuddle-backend`,
});

writeEnv(stackName).then(() => {
  console.log("~env file written");
});

const frontendStack = new FrontendStack(app, "FrontendStack", {
  stackName: `${stackName}-cuddle-frontend`,
});

frontendStack.addDependency(backendStack);
