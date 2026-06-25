import AuthService from "../services/auth.service";
import {
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  registerSchema,
} from "../validators/auth.validators";
import { TRPCError } from "@trpc/server";

import { authedProcedure, publicProcedure } from "../procedures";
import { router } from "../trpc";

export default function authRouter(authService: AuthService) {
  return router({
    login: publicProcedure
      .input(loginSchema)
      .mutation(async ({ input, ctx }) => {
        const user = await authService.login(input);
        await ctx.setSession(user);
        return {
          onboardingCompleted: user.onboardingCompleted,
          emailVerified: user.emailVerified,
        };
      }),
    register: publicProcedure
      .input(registerSchema)
      .mutation(async ({ input, ctx }) => {
        const user = await authService.register(input);
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
}
