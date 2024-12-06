import {
  CdkCustomResourceEvent,
  CdkCustomResourceResponse,
  Context,
} from "aws-lambda";
import { initDrizzleContext } from "./client";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export const handler = async (
  event: CdkCustomResourceEvent,
  context: Context
): Promise<CdkCustomResourceResponse> => {
  try {
    const db = await initDrizzleContext();
    await migrate(db, {
      migrationsFolder: `${__dirname}/migrations`,
    });
    return { Status: "Success" };
  } catch (e) {
    console.log("~err ", e);
    return { Status: "FAILED" };
  }
};
