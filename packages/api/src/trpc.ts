import { initTRPC, TRPCError } from "@trpc/server";

import type { Context } from "./createContext";

const t = initTRPC.context<Context>().create();

export const { router, createCallerFactory } = t;

export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      session: {
        userId: ctx.session.userId,
        organizationId: ctx.session.organizationId,
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.userId || !ctx.session.organizationId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      session: {
        userId: ctx.session.userId,
        organizationId: ctx.session.organizationId,
      },
    },
  });
});
