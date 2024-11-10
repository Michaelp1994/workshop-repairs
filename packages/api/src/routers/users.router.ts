import { generateToken } from "@repo/auth/tokens";
import * as authController from "@repo/db/controllers/auth.controller";
import * as usersController from "@repo/db/controllers/users.controller";
import * as authSchemas from "@repo/validators/auth.validators";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as userSchemas from "@repo/validators/users.validators";
import { TRPCError } from "@trpc/server";

import { archiveMetadata, updateMetadata } from "../helpers/includeMetadata";
import sendVerificationEmail from "../helpers/sendVerificationEmail";
import { authedProcedure, organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ input, ctx }) => {
      const allUsers = usersController.getAll(
        input,
        ctx.session.organizationId,
      );

      return allUsers;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ input, ctx }) => {
      const count = usersController.getCount(input, ctx.session.organizationId);
      return count;
    }),
  resetPassword: authedProcedure
    .input(authSchemas.resetPassword)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
  sendEmailConfirmation: authedProcedure
    .input(authSchemas.confirmEmail)
    .mutation(async ({ ctx, input }) => {
      await sendVerificationEmail(ctx.session.userId, input.email);
    }),
  confirmEmail: authedProcedure
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
      const session: authSchemas.Session = {
        token,
        userId: user.id,
        emailVerified: user.emailVerified,
        organizationId: user.organizationId,
      };
      return session;
    }),

  getCurrentUser: organizationProcedure
    .input(userSchemas.getCurrent)
    .query(async ({ ctx }) => {
      const user = await usersController.getById(ctx.session.userId);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),

  getById: organizationProcedure
    .input(userSchemas.getById)
    .query(async ({ input }) => {
      const user = await usersController.getById(input.id);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),
  create: organizationProcedure.input(userSchemas.create).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  update: organizationProcedure
    .input(userSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedUser = await usersController.update({
        ...input,
        ...metadata,
      });

      if (!updatedUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can't update user",
        });
      }

      return updatedUser;
    }),

  updateCurrent: organizationProcedure
    .input(userSchemas.updateCurrent)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);

      const updatedUser = await usersController.update({
        ...input,
        ...metadata,
        id: ctx.session.userId,
      });

      if (!updatedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Can't update user",
        });
      }

      return updatedUser;
    }),
  archive: organizationProcedure
    .input(userSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedUser = await usersController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't archive user",
        });
      }

      return archivedUser;
    }),
});
