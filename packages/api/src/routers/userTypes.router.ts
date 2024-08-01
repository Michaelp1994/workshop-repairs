import userTypesController from "@repo/db/controllers/userTypes.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import userTypeSchemas from "@repo/validators/userTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

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
  archive: protectedProcedure
    .input(userTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedUserType = await userTypesController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive user Type",
        });
      }

      return archivedUserType;
    }),
});
