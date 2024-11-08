import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { createContext } from "./createContext";
import { appRouter } from "./router";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
