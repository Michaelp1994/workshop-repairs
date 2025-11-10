import {
  loginService,
  registerService,
} from "@repo/services/services/auth.service";
import {
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  registerSchema,
} from "@repo/validators/server/auth.validators";
import { TRPCError } from "@trpc/server";

import { authedProcedure, publicProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const user = await loginService(input);
    await ctx.setSession(user);
    return {
      onboardingCompleted: user.onboardingCompleted,
      emailVerified: user.emailVerified,
    };
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await registerService(input);
      await ctx.setSession(user);
      return true;
    }),
  logout: authedProcedure.input(logoutSchema).mutation(({ ctx }) => {
    ctx.clearSession();
    return true;
  }),
  forgotPassword: publicProcedure.input(forgotPasswordSchema).mutation(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
});
