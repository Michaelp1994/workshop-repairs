import * as authController from "@repo/db/repositories/auth.repository";
import * as userRepository from "@repo/db/repositories/user.repository";
import * as authSchemas from "@repo/validators/auth.validators";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as userSchemas from "@repo/validators/users.validators";
import { TRPCError } from "@trpc/server";

import createSession from "../helpers/createSession";
import { archiveMetadata, updateMetadata } from "../helpers/includeMetadata";
import sendVerificationEmail from "../helpers/sendVerificationEmail";
import assertDatabaseResult from "../helpers/trpcAssert";
import { authedProcedure, organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ input, ctx }) => {
      const allUsers = userRepository.getAll(input, ctx.session.organizationId);

      return allUsers;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ input, ctx }) => {
      const count = userRepository.getCount(input, ctx.session.organizationId);
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
      const user = await userRepository.getByEmail(input.email);
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
      await userRepository.setEmailVerified(user.id);

      await authController.deleteConfirmationRequest(request.id);

      const session = await createSession(user);
      return session;
    }),

  getCurrentUser: authedProcedure
    .input(userSchemas.getCurrent)
    .query(async ({ ctx }) => {
      const user = await userRepository.getById(ctx.session.userId);
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
      const user = await userRepository.getById(input.id);

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
      const updatedUser = await userRepository.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedUser);

      return updatedUser;
    }),

  updateCurrent: authedProcedure
    .input(userSchemas.updateCurrent)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);

      const updatedUser = await userRepository.update({
        ...input,
        ...metadata,
        id: ctx.session.userId,
      });

      assertDatabaseResult(updatedUser);

      return updatedUser;
    }),
  archive: organizationProcedure
    .input(userSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedUser = await userRepository.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedUser);

      return archivedUser;
    }),
});
