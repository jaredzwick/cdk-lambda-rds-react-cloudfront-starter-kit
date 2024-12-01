#!/usr/bin/env node

import { Command } from "commander";
import { execSync } from "child_process";
import {
  CloudFormationClient,
  DescribeStacksCommand,
} from "@aws-sdk/client-cloudformation";
import fs from "fs-extra";
import path from "path";

const program = new Command();

const runCommand = (command: string, cwd: string = process.cwd()) => {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: "inherit", cwd });
  } catch (error) {
    console.error(`Error running command: ${command}`);
    process.exit(1);
  }
};

const writeEnvFile = async (apiEndpoint: string, cognitoClientId: string) => {
  const envPath = path.resolve(process.cwd(), "frontend", ".env");
  const content = `REACT_APP_API_ENDPOINT=${apiEndpoint}\nREACT_APP_COGNITO_CLIENT_ID=${cognitoClientId}\n`;

  try {
    await fs.ensureFile(envPath);
    await fs.writeFile(envPath, content, "utf8");
    console.log(`Environment variables written to ${envPath}`);
  } catch (error) {
    console.error(`Error writing .env file: ${error}`);
    process.exit(1);
  }
};

program
  .command("sam:build")
  .description("Build the SAM application")
  .action(() => {
    runCommand("sam build");
  });

program
  .command("sam:deploy")
  .description("Deploy the SAM application")
  .requiredOption("--stack-name <name>", "Stack name for the SAM deployment")
  .action((options) => {
    const { stackName } = options;
    runCommand(
      `sam deploy --stack-name ${stackName} --region us-east-1 --resolve-s3  --capabilities CAPABILITY_NAMED_IAM`
    );
  });

program
  .command("setup-env")
  .description(
    "Fetch API Gateway endpoint and Cognito Pool Client ID and write to frontend .env file"
  )
  .requiredOption("--stack-name <name>", "Stack name for fetching resources")
  .action(async (options) => {
    const { stackName } = options;

    const cloudFormationClient = new CloudFormationClient({});
    const command = new DescribeStacksCommand({ StackName: stackName });

    try {
      console.log(`Fetching outputs for stack: ${stackName}`);
      const response = await cloudFormationClient.send(command);
      const outputs = response.Stacks?.[0]?.Outputs || [];

      const apiEndpoint =
        outputs.find((output) => output.OutputKey === "ApiEndpoint")
          ?.OutputValue || "";
      const cognitoClientId =
        outputs.find((output) => output.OutputKey === "CognitoPoolClientId")
          ?.OutputValue || "";

      if (!apiEndpoint || !cognitoClientId) {
        console.error(
          "Required outputs (ApiEndpoint, CognitoPoolClientId) not found in stack."
        );
        process.exit(1);
      }

      await writeEnvFile(apiEndpoint, cognitoClientId);
    } catch (error) {
      console.error("Error fetching stack outputs:", error);
      process.exit(1);
    }
  });

program
  .command("npm-install")
  .description("Run npm install in the frontend directory")
  .action(() => {
    const frontendPath = path.resolve(process.cwd(), "frontend");
    if (!fs.existsSync(frontendPath)) {
      console.error(`Frontend directory not found at ${frontendPath}`);
      process.exit(1);
    }
    runCommand("npm install", frontendPath);
  });

program.parse(process.argv);
