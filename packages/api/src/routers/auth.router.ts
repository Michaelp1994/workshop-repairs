import { hashPassword, verifyPasswordHash } from "@repo/auth/password";
import { generateToken } from "@repo/auth/tokens";
import * as authController from "@repo/db/controllers/auth.controller";
import * as usersController from "@repo/db/controllers/users.controller";
import * as authSchemas from "@repo/validators/auth.validators";
import { TRPCError } from "@trpc/server";

import sendVerificationEmail from "../helpers/sendVerificationEmail";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export default router({
  login: publicProcedure
    .input(authSchemas.login)
    .mutation(async ({ input, ctx }) => {
      const user = await usersController.getByLoginDetails(input.email);
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Login details are not correct.",
        });
      }
      const passwordCorrect = await verifyPasswordHash(
        user.password,
        input.password,
      );
      if (!passwordCorrect) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Login details are not correct.",
        });
      }

      const token = await generateToken({
        userId: user.id,
        organizationId: null,
      });
      ctx.setCookie("Authorization", token);
      return {
        token,
        id: user.id,
        emailVerified: user.emailVerified,
        organizationId: user.organizationId,
      };
    }),
  register: publicProcedure
    .input(authSchemas.register)
    .mutation(async ({ input, ctx }) => {
      const hash = await hashPassword(input.password);
      const user = await usersController.create({
        ...input,
        typeId: 1,
        password: hash,
        emailVerified: false,
        organizationId: null,
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot create user.",
        });
      }

      await sendVerificationEmail(user.id, user.email);

      const token = await generateToken({
        userId: user.id,
        organizationId: null,
      });
      const response = {
        token,
        id: user.id,
        emailVerified: false,
      };
      ctx.setCookie("Authorization", token);
      return response;
    }),
  sendEmailConfirmation: protectedProcedure
    .input(authSchemas.confirmEmail)
    .mutation(async ({ ctx, input }) => {
      // TODO: rate limiting.
      await sendVerificationEmail(ctx.session.userId, input.email);
    }),
  confirmEmail: protectedProcedure
    .input(authSchemas.confirmEmail)
    .mutation(async ({ input }) => {
      const user = await usersController.getByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot find user.",
        });
      }
      const request = await authController.getByEmail(input.email, input.code);
      if (!request) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token is not correct.",
        });
      }
      await usersController.setEmailVerified(user.id);
      await authController.deleteConfirmationRequest(request.id);
      const token = await generateToken({
        userId: user.id,
        organizationId: null,
      });
      return {
        token,
        id: user.id,
        emailVerified: user.emailVerified,
        organizationId: user.organizationId,
      };
    }),
  logout: publicProcedure.input(authSchemas.logout).mutation(async () => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
  forgotPassword: publicProcedure
    .input(authSchemas.forgotPassword)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
  resetPassword: publicProcedure
    .input(authSchemas.resetPassword)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
});
