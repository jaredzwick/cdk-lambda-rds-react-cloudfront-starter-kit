import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import middy from "@middy/core";
import { initDrizzleContext } from "../../db/client";

export const getMyProfileHandler = middy().handler(
  async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
      const db = await initDrizzleContext();
      const res = await db.query.users.findMany();
      console.log("Current time from database:", res);

      // Close the connection
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
