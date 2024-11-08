import type { APIGatewayProxyEventV2, Context } from "aws-lambda";

import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import cookie, { SerializeOptions } from "cookie";

import { appRouter } from "./router";
import { createContext } from "./trpc";

// export const handler = awsLambdaRequestHandler({
//   router: appRouter,
//   createContext,
// });

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  let cookies: null | string = null;
  const tomorrow = new Date(Date.now() + 3600 * 1000 * 100);
  function setCookie(name: string, value: string) {
    cookies = cookie.serialize(name, value, {
      httpOnly: true,
      // expires: tomorrow,
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
      path: "/",
    });
  }
  const response = await awsLambdaRequestHandler({
    router: appRouter,
    createContext: ({ event, context, info }) =>
      createContext({ event, context, info, setCookie }),
  })(event, context);

  if (cookies) {
    response.headers["Set-Cookie"] = cookies;
  }

  return response;
};
