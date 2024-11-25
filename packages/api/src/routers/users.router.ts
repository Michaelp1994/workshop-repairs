import {
  deleteEmailConfirmationRequestById,
  getEmailVerificationRequest,
} from "@repo/db/repositories/auth.repository";
import {
  archiveUser,
  countUsers,
  getAllUsers,
  getUserByEmail,
  getUserById,
  setUserEmailVerified,
  updateUser,
} from "@repo/db/repositories/user.repository";
import {
  confirmEmailSchema,
  resetPasswordSchema,
} from "@repo/validators/server/auth.validators";
import {
  archiveUserSchema,
  countUsersSchema,
  createUserSchema,
  getAllUsersSchema,
  getCurrentUserSchema,
  getUserByIdSchema,
  updateCurrentUserSchema,
  updateUserSchema,
} from "@repo/validators/server/users.validators";
import { TRPCError } from "@trpc/server";

import createSession from "../helpers/createSession";
import {
  createArchiveMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import sendVerificationEmail from "../helpers/sendVerificationEmail";
import assertDatabaseResult from "../helpers/trpcAssert";
import { authedProcedure, organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllUsersSchema)
    .query(async ({ input, ctx }) => {
      const allUsers = getAllUsers(input, ctx.session.organizationId);

      return allUsers;
    }),
  countAll: organizationProcedure
    .input(countUsersSchema)
    .query(({ input, ctx }) => {
      const count = countUsers(input, ctx.session.organizationId);
      return count;
    }),
  resetPassword: authedProcedure
    .input(resetPasswordSchema)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
  sendEmailConfirmation: authedProcedure
    .input(confirmEmailSchema)
    .mutation(async ({ ctx, input }) => {
      await sendVerificationEmail(ctx.session.userId, input.email);
    }),
  confirmEmail: authedProcedure
    .input(confirmEmailSchema)
    .mutation(async ({ input }) => {
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot find user.",
        });
      }
      const request = await getEmailVerificationRequest(
        input.email,
        input.code,
      );
      if (!request) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token is not correct.",
        });
      }
      await setUserEmailVerified(user.id);

      await deleteEmailConfirmationRequestById(request.id);

      const session = await createSession(user);
      return session;
    }),

  getCurrentUser: authedProcedure
    .input(getCurrentUserSchema)
    .query(async ({ ctx }) => {
      const user = await getUserById(ctx.session.userId);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),

  getById: organizationProcedure
    .input(getUserByIdSchema)
    .query(async ({ input }) => {
      const user = await getUserById(input.id);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),
  create: organizationProcedure.input(createUserSchema).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  update: organizationProcedure
    .input(updateUserSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedUser = await updateUser({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedUser);

      return updatedUser;
    }),

  updateCurrent: authedProcedure
    .input(updateCurrentUserSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);

      const updatedUser = await updateUser({
        ...input,
        ...metadata,
        id: ctx.session.userId,
      });

      assertDatabaseResult(updatedUser);

      return updatedUser;
    }),
  archive: organizationProcedure
    .input(archiveUserSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);

      const archivedUser = await archiveUser({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedUser);

      return archivedUser;
    }),
});
