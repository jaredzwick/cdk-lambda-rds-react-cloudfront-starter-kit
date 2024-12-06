import * as fs from "fs";
import * as path from "path";
import {
  CloudFormationClient,
  DescribeStacksCommand,
} from "@aws-sdk/client-cloudformation";
export const computeDirHash = (dir: string): string => {
  const files = fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isFile());
  // Compute hash or process files
  return files.map((file) => fs.readFileSync(path.join(dir, file))).join();
};

export const writeEnv = async (stackName: string) => {
  const ENV_FILE_PATH = path.resolve("../frontend/.env");
  try {
    const command = new DescribeStacksCommand({
      StackName: `${stackName}-cuddle-backend`,
    });
    const cloudFormationClient = new CloudFormationClient();
    const response = await cloudFormationClient.send(command);

    const stack = response.Stacks?.[0];
    if (!stack) {
      throw new Error(`Stack  ${stackName}-cuddle-backend not found.`);
    }

    const outputs = stack.Outputs || [];
    const envVars = outputs
      .map((output) => `VITE_${output.ExportName}=${output.OutputValue}`)
      .join("\n");

    fs.writeFileSync(ENV_FILE_PATH, envVars, { encoding: "utf-8" });
    console.log(`.env file updated successfully at ${ENV_FILE_PATH}`);
  } catch (error) {
    console.error("Error fetching stack outputs:", error);
  }
};
