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
import assertDatabaseResult from "../helpers/trpcAssert";
// import { uploadImageS3 } from "../helpers/s3";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allModelImages = modelImagesController.getAll(input);

    return allModelImages;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = modelImagesController.getCount(input);
    return count;
  }),
  getAllByModelId: organizationProcedure
    .input(modelImageSchemas.getAllByModelId)
    .query(async ({ input }) => {
      const model = await modelsController.getById(input.modelId);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "model not found",
        });
      }

      const allModelImages = await modelImagesController.getAllByModelId(
        input.modelId,
      );

      return allModelImages.map((modelImage) => ({
        ...modelImage,
        favourite: modelImage.id === model.defaultImageId,
      }));
    }),
  getById: organizationProcedure
    .input(modelImageSchemas.getById)
    .query(async ({ input }) => {
      const modelImage = await modelImagesController.getById(input.id);

      if (!modelImage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "modelImage not found",
        });
      }

      return modelImage;
    }),
  uploadImage: organizationProcedure
    .input(modelImageSchemas.uploadImage)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
  create: organizationProcedure
    .input(modelImageSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const modelImages = await modelImagesController.getAllByModelId(
        input.modelId,
      );
      const isFirstImage = modelImages.length === 0;

      const imageMetadata = createMetadata(ctx.session);
      const createdModelImage = await modelImagesController.create({
        ...input,
        ...imageMetadata,
      });

      assertDatabaseResult(createdModelImage);

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
  update: organizationProcedure
    .input(modelImageSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedModelImage = await modelImagesController.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedModelImage);

      return updatedModelImage;
    }),
  setFavourite: organizationProcedure
    .input(modelImageSchemas.setFavourite)
    .mutation(async ({ input, ctx }) => {
      const modelImage = await modelImagesController.getById(input.id);

      if (!modelImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "model Image not found",
        });
      }

      const model = await modelsController.getById(modelImage.modelId);

      if (!model) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "model not found",
        });
      }
      const metadata = updateMetadata(ctx.session);
      await modelsController.update({
        id: model.id,
        defaultImageId: modelImage.id,
        ...metadata,
      });

      return modelImage;
    }),
  archive: organizationProcedure
    .input(modelImageSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedModelImage = await modelImagesController.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedModelImage);

      return archivedModelImage;
    }),
});
