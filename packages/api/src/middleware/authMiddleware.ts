import { initTRPC, TRPCError } from "@trpc/server";

import type { Meta } from "../meta";

import { Context } from "../createContext";

export default function createAuthMiddleware() {
  const t = initTRPC.context<Context>().meta<Meta>().create();

  return {
    pluginProc: t.procedure.use(({ ctx, next }) => {
      if (!ctx.session || !ctx.session.userId) {
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
    }),
  };
}
