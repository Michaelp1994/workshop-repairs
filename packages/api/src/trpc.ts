import type { OrganizationID } from "@repo/db/schemas/organization.schema";
import type { UserID } from "@repo/validators/ids.validators";
import type { APIGatewayProxyEvent } from "aws-lambda";

import { db } from "@repo/db";
import { initTRPC, TRPCError } from "@trpc/server";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";

export interface Session {
  userId: UserID;
  organizationId: OrganizationID;
}

export async function createContext({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>) {
  const token = event.headers?.["authorization"];
  console.log({ token });
  // TODO: for now, i can't be fucked working on auth any longer, this will have to do.
  // I have tried IAM, nextAuth, Lucia Auth (session based) and JWT. all have flaws.
  return {
    db,
    session: {
      userId: 1,
      organizationId: 1,
    },
    context,
  };
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
