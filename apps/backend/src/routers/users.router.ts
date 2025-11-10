import {
  archiveUserService,
  confirmEmailService,
  countUsersService,
  getAllUsersService,
  getUserByIdService,
  sendEmailConfirmationService,
  updateUserService,
} from "@repo/services/services/user.service";
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

import { authedProcedure, organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllUsersSchema)
    .query(async ({ input, ctx }) => {
      const allUsers = getAllUsersService(input, ctx.session);

      return allUsers;
    }),
  countAll: organizationProcedure
    .input(countUsersSchema)
    .query(({ input, ctx }) => {
      const count = countUsersService(input, ctx.session);
      return count;
    }),
  resetPassword: authedProcedure.input(resetPasswordSchema).mutation(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
  sendEmailConfirmation: authedProcedure
    .input(confirmEmailSchema)
    .mutation(async ({ ctx, input }) => {
      return await sendEmailConfirmationService(input, ctx.session);
    }),
  confirmEmail: authedProcedure
    .input(confirmEmailSchema)
    .mutation(async ({ input }) => {
      return await confirmEmailService(input);
    }),

  getCurrentUser: authedProcedure
    .input(getCurrentUserSchema)
    .query(async ({ ctx }) => {
      const user = await getUserByIdService(ctx.session.userId);
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
      const user = await getUserByIdService(input.id);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),
  create: organizationProcedure.input(createUserSchema).mutation(() => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  update: organizationProcedure
    .input(updateUserSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedUser = await updateUserService(values, id, ctx.session);

      return updatedUser;
    }),

  updateCurrent: authedProcedure
    .input(updateCurrentUserSchema)
    .mutation(async ({ input, ctx }) => {
      const updatedUser = await updateUserService(
        input,
        ctx.session.userId,
        ctx.session,
      );

      return updatedUser;
    }),
  archive: organizationProcedure
    .input(archiveUserSchema)
    .mutation(async ({ input, ctx }) => {
      const archivedUser = await archiveUserService(input.id, ctx.session);

      return archivedUser;
    }),
});
