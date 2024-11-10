import * as assetsController from "@repo/db/controllers/assets.controller";
import * as modelsController from "@repo/db/controllers/models.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as modelSchemas from "@repo/validators/models.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allModels = modelsController.getAll(
        input,
        ctx.session.organizationId,
      );
      return allModels;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allModels = await modelsController.getSelect(
        input,
        ctx.session.organizationId,
      );
      return allModels;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = modelsController.getCount(
        input,
        ctx.session.organizationId,
      );
      return count;
    }),
  getByAssetId: organizationProcedure
    .input(modelSchemas.getByAssetId)
    .query(async ({ input, ctx }) => {
      const asset = await assetsController.getById(
        input.assetId,
        ctx.session.organizationId,
      );

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "asset not found",
        });
      }

      const model = await modelsController.getById(asset.modelId);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "model not found",
        });
      }

      return model;
    }),
  getById: organizationProcedure
    .input(modelSchemas.getById)
    .query(async ({ input }) => {
      const model = await modelsController.getById(input.id);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find model",
        });
      }

      return model;
    }),
  create: organizationProcedure
    .input(modelSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);

      const createdModel = await modelsController.create({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      if (!createdModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create model",
        });
      }

      return createdModel;
    }),
  update: organizationProcedure
    .input(modelSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);

      const updatedModel = await modelsController.update({
        ...input,
        ...metadata,
      });

      if (!updatedModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update model",
        });
      }

      return updatedModel;
    }),
  archive: organizationProcedure
    .input(modelSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedModel = await modelsController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive model",
        });
      }

      return archivedModel;
    }),
});
