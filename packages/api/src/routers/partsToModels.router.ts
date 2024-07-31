import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import partsToModelsController from "@repo/db/controllers/partsToModels.controller";
import partsToModelSchemas from "@repo/validators/partsToModel.validators";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";

export default router({
  getAll: protectedProcedure.input(getAllSchema).query(({ ctx, input }) => {
    const allParts = partsToModelsController.getAll(input, ctx.db);

    return allParts;
  }),
  getCount: protectedProcedure
    .input(getCountSchema)
    .query(async ({ input, ctx }) => {
      const count = await partsToModelsController.getCount(input, ctx.db);

      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't get count",
        });
      }
      return count;
    }),
  create: protectedProcedure
    .input(partsToModelSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const createdPartModel = await partsToModelsController.create(
        input,
        ctx.db,
      );

      if (!createdPartModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create part model connection",
        });
      }

      return createdPartModel;
    }),
  delete: protectedProcedure
    .input(partsToModelSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const deletedPartModel = await partsToModelsController.delete(
        input,
        ctx.db,
      );

      if (!deletedPartModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete part model connection",
        });
      }

      return deletedPartModel;
    }),
});
