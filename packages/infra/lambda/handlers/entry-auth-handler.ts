import middy from "@middy/core";
import { getHandler } from "./getItem";
import httpRouterHandler from "@middy/http-router";
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { Method } from "@middy/http-router";
const tracer = new Tracer({ serviceName: "entryAuthHandler" });

const routes = [
  {
    method: "GET" as Method,
    path: "/items",
    handler: getHandler,
  },
];

export const handler = middy()
  .use(captureLambdaHandler(tracer))
  .handler(httpRouterHandler(routes));
