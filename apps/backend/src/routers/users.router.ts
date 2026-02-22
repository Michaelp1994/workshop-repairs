import UserService from "@repo/services/services/user.service";
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

export default function Router(userService: UserService) {
  return router({
    getAll: organizationProcedure
      .input(getAllUsersSchema)
      .query(async ({ input, ctx }) => {
        const allUsers = await userService.getAllUsers(input, ctx.session);

        return allUsers;
      }),
    countAll: organizationProcedure
      .input(countUsersSchema)
      .query(async ({ input, ctx }) => {
        const count = await userService.countUsers(input, ctx.session);
        return count;
      }),
    resetPassword: authedProcedure.input(resetPasswordSchema).mutation(() => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
    confirmEmail: authedProcedure
      .input(confirmEmailSchema)
      .mutation(async ({ input, ctx }) => {
        return await userService.confirmEmail(input, ctx.session);
      }),

    getCurrentUser: authedProcedure
      .input(getCurrentUserSchema)
      .query(async ({ ctx }) => {
        const user = await userService.getUserById(ctx.session.userId);

        return user;
      }),

    getById: organizationProcedure
      .input(getUserByIdSchema)
      .query(async ({ input }) => {
        const user = await userService.getUserById(input.id);

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
        const updatedUser = await userService.updateUser(
          values,
          id,
          ctx.session,
        );

        return updatedUser;
      }),

    updateCurrent: authedProcedure
      .input(updateCurrentUserSchema)
      .mutation(async ({ input, ctx }) => {
        const updatedUser = await userService.updateUser(
          input,
          ctx.session.userId,
          ctx.session,
        );

        return updatedUser;
      }),
    archive: organizationProcedure
      .input(archiveUserSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedUser = await userService.archiveUser(
          input.id,
          ctx.session,
        );

        return archivedUser;
      }),
  });
}
