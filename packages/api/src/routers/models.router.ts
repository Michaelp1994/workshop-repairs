import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import modelsController from "@repo/db/controllers/models.controller";
import assetsController from "@repo/db/controllers/assets.controller";
import modelSchemas from "@repo/validators/models.validators";
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
      const allModels = modelsController.getAll(input, ctx.db);

      return allModels;
    }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allModels = await modelsController.getSelect(input, ctx.db);
      return allModels;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = modelsController.getCount(input, ctx.db);
    return count;
  }),
  getByAssetId: protectedProcedure
    .input(modelSchemas.getByAssetId)
    .query(async ({ input, ctx }) => {
      const asset = await assetsController.getById(input.assetId, ctx.db);

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "asset not found",
        });
      }

      const model = await modelsController.getById(asset.modelId, ctx.db);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "model not found",
        });
      }

      return model;
    }),
  getById: protectedProcedure
    .input(modelSchemas.getById)
    .query(async ({ input, ctx }) => {
      const model = await modelsController.getById(input.id, ctx.db);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find model",
        });
      }

      return model;
    }),
  create: protectedProcedure
    .input(modelSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);

      const createdModel = await modelsController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create model",
        });
      }

      return createdModel;
    }),
  update: protectedProcedure
    .input(modelSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);

      const updatedModel = await modelsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update model",
        });
      }

      return updatedModel;
    }),
  delete: protectedProcedure
    .input(modelSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);

      const deletedModel = await modelsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete model",
        });
      }

      return deletedModel;
    }),
});
