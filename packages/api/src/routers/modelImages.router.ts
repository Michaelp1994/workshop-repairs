import * as modelImagesController from "@repo/db/controllers/modelImages.controller";
import * as modelsController from "@repo/db/controllers/models.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as modelImageSchemas from "@repo/validators/modelImages.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
// import { uploadImageS3 } from "../helpers/s3";
import { protectedProcedure, router } from "../trpc";

export default router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allModelImages = modelImagesController.getAll(input, ctx.db);

      return allModelImages;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = modelImagesController.getCount(input, ctx.db);
    return count;
  }),
  getAllByModelId: protectedProcedure
    .input(modelImageSchemas.getAllByModelId)
    .query(async ({ ctx, input }) => {
      const model = await modelsController.getById(input.modelId);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "model not found",
        });
      }

      const allModelImages = await modelImagesController.getAllByModelId(
        input.modelId,
        ctx.db,
      );

      return allModelImages.map((modelImage) => ({
        ...modelImage,
        favourite: modelImage.id === model.defaultImageId,
      }));
    }),
  getById: protectedProcedure
    .input(modelImageSchemas.getById)
    .query(async ({ input, ctx }) => {
      const modelImage = await modelImagesController.getById(input.id, ctx.db);

      if (!modelImage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "modelImage not found",
        });
      }

      return modelImage;
    }),
  uploadImage: protectedProcedure
    .input(modelImageSchemas.uploadImage)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
  create: protectedProcedure
    .input(modelImageSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const modelImages = await modelImagesController.getAllByModelId(
        input.modelId,
        ctx.db,
      );
      const isFirstImage = modelImages.length === 0;

      const imageMetadata = createMetadata(ctx.session);
      const createdModelImage = await modelImagesController.create(
        { ...input, ...imageMetadata },
        ctx.db,
      );

      if (!createdModelImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create model Image",
        });
      }

      if (isFirstImage) {
        const modelMetadata = updateMetadata(ctx.session);

        await modelsController.update({
          id: input.modelId,
          defaultImageId: createdModelImage.id,
          ...modelMetadata,
        });
      }

      return createdModelImage;
    }),
  update: protectedProcedure
    .input(modelImageSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedModelImage = await modelImagesController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedModelImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update model Image",
        });
      }

      return updatedModelImage;
    }),
  setFavourite: protectedProcedure
    .input(modelImageSchemas.setFavourite)
    .mutation(async ({ input, ctx }) => {
      const modelImage = await modelImagesController.getById(input.id, ctx.db);

      if (!modelImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "model Image not found",
        });
      }

      const model = await modelsController.getById(modelImage.modelId, ctx.db);

      if (!model) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "model not found",
        });
      }
      const metadata = updateMetadata(ctx.session);
      await modelsController.update(
        {
          id: model.id,
          defaultImageId: modelImage.id,
          ...metadata,
        },
        ctx.db,
      );

      return modelImage;
    }),
  archive: protectedProcedure
    .input(modelImageSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedModelImage = await modelImagesController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedModelImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "modelImage not found",
        });
      }

      return archivedModelImage;
    }),
});
