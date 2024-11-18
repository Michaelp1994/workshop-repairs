import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import type { Context } from "./createContext";

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

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

export const organizationProcedure = t.procedure.use(({ ctx, next }) => {
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
