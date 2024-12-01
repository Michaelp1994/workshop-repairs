import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from "@repo/auth/password";
import {
  createUser,
  getUserByEmail,
} from "@repo/db/repositories/user.repository";
import { createUserOnboarding } from "@repo/db/repositories/userOnboarding.repository";
import {
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  registerSchema,
} from "@repo/validators/server/auth.validators";
import { TRPCError } from "@trpc/server";
import { ZodError, type ZodIssue } from "zod";

import sendVerificationEmail from "../helpers/sendVerificationEmail";
import assertDatabaseResult from "../helpers/trpcAssert";
import { authedProcedure, publicProcedure, router } from "../trpc";

export default router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const user = await getUserByEmail(input.email);
    if (!user) {
      throw new ZodError([
        {
          code: "custom",
          path: ["root"],
          message: "Login details are not correct.",
        },
      ]);
    }
    const passwordCorrect = await verifyPasswordHash(
      user?.password,
      input.password,
    );
    if (!passwordCorrect) {
      throw new ZodError([
        {
          code: "custom",
          path: ["root"],
          message: "Login details are not correct.",
        },
      ]);
    }

    await ctx.setSession(user);
    return {
      onboardingCompleted: user.onboardingCompleted,
      emailVerified: user.emailVerified,
    };
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const issues: ZodIssue[] = [];
      const passwordStrongEnough = await verifyPasswordStrength(input.password);

      if (!passwordStrongEnough) {
        issues.push({
          code: "custom",
          path: ["password"],
          message:
            "Your password has been found in a data breach. Please choose a different password",
        });
      }
      const emailExists = await getUserByEmail(input.email);

      if (emailExists) {
        issues.push({
          code: "custom",
          path: ["email"],
          message: "This email has already been registered with an account",
        });
      }

      if (issues.length > 0) {
        throw new ZodError(issues);
      }

      const hash = await hashPassword(input.password);
      const user = await createUser({
        ...input,
        typeId: 1,
        password: hash,
        emailVerified: false,
        organizationId: null,
      });
      assertDatabaseResult(user);

      const onboarding = await createUserOnboarding({
        userId: user.id,
        invitedUsers: false,
        welcomed: false,
      });
      assertDatabaseResult(onboarding);

      await sendVerificationEmail(user.id, user.email);
      await ctx.setSession(user);
      return true;
    }),
  logout: authedProcedure.input(logoutSchema).mutation(async ({ ctx }) => {
    ctx.clearSession();
    return true;
  }),
  forgotPassword: publicProcedure
    .input(forgotPasswordSchema)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
});
