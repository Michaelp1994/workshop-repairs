import * as usersController from "@repo/db/controllers/users.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as userSchemas from "@repo/validators/users.validators";
import { TRPCError } from "@trpc/server";

import { archiveMetadata, updateMetadata } from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

export default router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ input, ctx }) => {
      const allUsers = usersController.getAll(
        input,
        ctx.session.organizationId,
      );

      return allUsers;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ input, ctx }) => {
    const count = usersController.getCount(input, ctx.session.organizationId);
    return count;
  }),
  getCurrentUser: protectedProcedure
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

  getById: protectedProcedure
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
  create: protectedProcedure.input(userSchemas.create).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  update: protectedProcedure
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

  updateCurrent: protectedProcedure
    .input(userSchemas.updateCurrent)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);

      const updatedUser = await usersController.update({
        ...input,
        ...metadata,
        id: ctx.session.user.id,
      });

      if (!updatedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Can't update user",
        });
      }

      return updatedUser;
    }),
  archive: protectedProcedure
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
