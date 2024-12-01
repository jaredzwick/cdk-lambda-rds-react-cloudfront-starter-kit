#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";
import { FrontendStack } from "../lib/frontend-stack";
const app = new cdk.App();
const backendStack = new BackendStack(app, "BackendStack");
const frontendStack = new FrontendStack(app, "FrontendStack", {
  apiUrl: backendStack.apiUrl,
});

frontendStack.addDependency(backendStack);
