import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from "@repo/auth/password";
import * as userOnboardingsController from "@repo/db/controllers/userOnboardings.controller";
import * as usersController from "@repo/db/controllers/users.controller";
import * as authSchemas from "@repo/validators/auth.validators";
import { TRPCError } from "@trpc/server";
import { ZodError, type ZodIssue } from "zod";

import createSession from "../helpers/createSession";
import sendVerificationEmail from "../helpers/sendVerificationEmail";
import assertDatabaseResult from "../helpers/trpcAssert";
import { authedProcedure, publicProcedure, router } from "../trpc";

export default router({
  login: publicProcedure
    .input(authSchemas.login)
    .mutation(async ({ input }) => {
      const user = await usersController.getByEmail(input.email);
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
      const session = await createSession(user);
      return session;
    }),
  register: publicProcedure
    .input(authSchemas.register)
    .mutation(async ({ input }) => {
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
      const emailExists = await usersController.getByEmail(input.email);

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
      const user = await usersController.create({
        ...input,
        typeId: 1,
        password: hash,
        emailVerified: false,
        organizationId: null,
      });
      assertDatabaseResult(user);

      const onboarding = await userOnboardingsController.create({
        userId: user.id,
        invitedUsers: false,
        welcomed: false,
      });
      assertDatabaseResult(onboarding);

      await sendVerificationEmail(user.id, user.email);
      const session = await createSession(user);

      return session;
    }),
  logout: authedProcedure.input(authSchemas.logout).mutation(async () => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
  forgotPassword: publicProcedure
    .input(authSchemas.forgotPassword)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
});
