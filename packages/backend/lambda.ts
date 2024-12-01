import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuid } from "uuid";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { db } from "./db/db";

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const user: typeof usersTable.$inferInsert = {
      name: "John",
      age: 30,
      email: "john@example.com",
    };

    await db.insert(usersTable).values(user);
    console.log("New user created!");

    const users = await db.select().from(usersTable);
    console.log("Getting all users from the database: ", users);
    /*
    const users: {
      id: number;
      name: string;
      age: number;
      email: string;
    }[]
    */

    await db
      .update(usersTable)
      .set({
        age: 31,
      })
      .where(eq(usersTable.email, user.email));
    console.log("User info updated!");

    await db.delete(usersTable).where(eq(usersTable.email, user.email));
    console.log("User deleted!");
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `hello world ${
          process.env.DATABASE_URL
        } 8 2 * 2  ${uuid()}- girl suck this big dick`,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Internal Server Error - ${err.message}`,
      }),
    };
  }
};
