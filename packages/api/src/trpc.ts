import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { verifyToken } from "@repo/auth/tokens";
import { db } from "@repo/db";
import { initTRPC, TRPCError } from "@trpc/server";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";

interface CreateContextInput
  extends CreateAWSLambdaContextOptions<APIGatewayProxyEventV2> {
  setCookie: (name: string, value: string) => void;
}

export async function createContext({ event, setCookie }: CreateContextInput) {
  const session = {
    userId: 1,
    organizationId: 1,
  };
  return {
    db,
    session: session,
    setCookie,
  };

  const token = event.headers?.["authorization"];
  console.log({ token });
  if (!token) {
    return {
      db,
      session: null,
      setCookie,
    };
  }
  try {
    const verifiedToken = await verifyToken(token);
    const session = {
      userId: verifiedToken.payload.userId,
      organizationId: verifiedToken.payload.organizationId,
    };
    return {
      db,
      session: session,
      setCookie,
    };
  } catch {
    console.error("bad token");
    return {
      db,
      session: null,
      setCookie,
    };
  }
}

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const { router, createCallerFactory } = t;

export const publicProcedure = t.procedure;

// export const protectedProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
