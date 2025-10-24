import { getAssetById } from "@repo/db/repositories/asset.repository";
import {
  archiveModel,
  countModels,
  createModel,
  getAllModels,
  getModelById,
  getModelsSelect,
  updateModel,
} from "@repo/db/repositories/model.repository";
import {
  archiveModelSchema,
  countModelsSchema,
  createModelSchema,
  getAllModelsSchema,
  getModelByAssetIdSchema,
  getModelByIdSchema,
  getModelsSelectSchema,
  updateModelSchema,
} from "@repo/validators/server/models.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { getModelImageUrlFromKey } from "../helpers/s3";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllModelsSchema)
    .query(async ({ ctx, input }) => {
      const allModels = await getAllModels(input, ctx.session.organizationId);
      return allModels.map((model) => ({
        ...model,
        defaultImageUrl: model.defaultImageUrl
          ? getModelImageUrlFromKey(model.defaultImageUrl)
          : null,
      }));
    }),
  countAll: organizationProcedure
    .input(countModelsSchema)
    .query(({ ctx, input }) => {
      const count = countModels(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getModelsSelectSchema)
    .query(async ({ ctx, input }) => {
      const allModels = await getModelsSelect(
        input,
        ctx.session.organizationId,
      );
      return allModels;
    }),

  getByAssetId: organizationProcedure
    .input(getModelByAssetIdSchema)
    .query(async ({ input, ctx }) => {
      const asset = await getAssetById(
        input.assetId,
        ctx.session.organizationId,
      );

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "asset not found",
        });
      }

      const model = await getModelById(asset.modelId);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "model not found",
        });
      }

      return model;
    }),
  getById: organizationProcedure
    .input(getModelByIdSchema)
    .query(async ({ input }) => {
      const model = await getModelById(input.id);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find model",
        });
      }

      return model;
    }),
  create: organizationProcedure
    .input(createModelSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);

      const createdModel = await createModel({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdModel);

      return createdModel;
    }),
  update: organizationProcedure
    .input(updateModelSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);

      const updatedModel = await updateModel({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedModel);

      return updatedModel;
    }),
  archive: organizationProcedure
    .input(archiveModelSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);

      const archivedModel = await archiveModel({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedModel);

      return archivedModel;
    }),
});
