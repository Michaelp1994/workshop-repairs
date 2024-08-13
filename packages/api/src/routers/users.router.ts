import * as usersController from "@repo/db/controllers/users.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as userSchemas from "@repo/validators/users.validators";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export default router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allUsers = usersController.getAll(input, ctx.db);

      return allUsers;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = usersController.getCount(input, ctx.db);
    return count;
  }),
  getCurrentUser: protectedProcedure
    .input(userSchemas.getCurrent)
    .query(async ({ ctx }) => {
      const user = await usersController.getById(ctx.session.user.id, ctx.db);

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
    .query(async ({ input, ctx }) => {
      const user = await usersController.getById(input.id, ctx.db);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),
  register: publicProcedure
    .input(userSchemas.register)
    .mutation(async ({ input, ctx }) => {
      const password = await hash(input.password, 10);
      const user = await usersController.create(
        { ...input, password, typeId: 1 },
        ctx.db,
      );

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  create: protectedProcedure
    .input(userSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const password = await hash(input.password, 10);
      const metadata = createMetadata(ctx.session);

      const newUser = await usersController.create(
        {
          ...input,
          ...metadata,
          password,
        },
        ctx.db,
      );

      if (!newUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can't create user",
        });
      }

      return newUser;
    }),
  update: protectedProcedure
    .input(userSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedUser = await usersController.update(
        { ...input, ...metadata },
        ctx.db,
      );

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

      const updatedUser = await usersController.update(
        {
          ...input,
          ...metadata,
          id: ctx.session.user.id,
        },
        ctx.db,
      );

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

      const archivedUser = await usersController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't archive user",
        });
      }

      return archivedUser;
    }),
});
