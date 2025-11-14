import { TRPCError } from "@trpc/server";

import { userService } from "./services";
import { procedure } from "./trpc";

export const publicProcedure = procedure;

export const authedProcedure = procedure.use(({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      session: {
        userId: ctx.session.userId,
      },
    },
  });
});

export const organizationProcedure = procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  const user = await userService.getUserById(ctx.session.userId);
  if (!user?.organizationId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      session: {
        userId: ctx.session.userId,
        organizationId: user.organizationId,
        userTypeId: user.typeId,
      },
    },
  });
});
