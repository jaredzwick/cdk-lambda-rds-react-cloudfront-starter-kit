import middy from "@middy/core";
import { getHandler } from "./getItem";
import httpRouterHandler from "@middy/http-router";
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { Method } from "@middy/http-router";
import { getMyProfileHandler } from "./profile/get-my-profile";
const tracer = new Tracer({ serviceName: "entryAuthHandler" });

const routes = [
  {
    method: "GET" as Method,
    path: "/items",
    handler: getHandler,
  },
  {
    method: "GET" as Method,
    path: "/profile",
    handler: getMyProfileHandler,
  },
];

export const handler = middy()
  .use(captureLambdaHandler(tracer))
  .handler(httpRouterHandler(routes));
