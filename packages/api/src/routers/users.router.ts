import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import usersController from "@repo/db/controllers/users.controller";
import userSchemas from "@repo/validators/users.validators";
import {
  createMetadata,
  deleteMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";

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
  deleteUser: protectedProcedure
    .input(userSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);

      const deletedUser = await usersController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Can't delete user",
        });
      }

      return deletedUser;
    }),
});
