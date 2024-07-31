import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import userTypesController from "@repo/db/controllers/userTypes.controller";
import userTypeSchemas from "@repo/validators/userTypes.validators";
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
      const allUserTypes = userTypesController.getAll(input, ctx.db);
      return allUserTypes;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = userTypesController.getCount(input, ctx.db);
    return count;
  }),
  getById: protectedProcedure
    .input(userTypeSchemas.getById)
    .query(async ({ input, ctx }) => {
      const userType = await userTypesController.getById(input.id, ctx.db);

      if (!userType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "userType not found",
        });
      }

      return userType;
    }),
  create: protectedProcedure
    .input(userTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdUserType = await userTypesController.create(
        {
          ...input,
          ...metadata,
        },
        ctx.db,
      );
      if (!createdUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create user Type",
        });
      }

      return createdUserType;
    }),
  update: protectedProcedure
    .input(userTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedUserType = await userTypesController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update user Type",
        });
      }

      return updatedUserType;
    }),
  delete: protectedProcedure
    .input(userTypeSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);
      const deletedUserType = await userTypesController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete user Type",
        });
      }

      return deletedUserType;
    }),
});
