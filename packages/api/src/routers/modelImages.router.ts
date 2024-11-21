import {
  getModelById,
  updateModel,
} from "@repo/db/repositories/model.repository";
import {
  archiveModelImage,
  createModelImage,
  getAllModelImages,
  getAllModelImagesByModelId,
  getModelImageById,
  getModelImagesCount,
  updateModelImage,
} from "@repo/db/repositories/modelImage.repository";
import {
  dataTableCountSchema,
  dataTableSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveModelImageSchema,
  createModelImageSchema,
  getAllModelImagesByModelIdSchema,
  getModelImageByIdSchema,
  setFavouriteModelImageSchema,
  updateModelImageSchema,
  uploadModelImageSchema,
} from "@repo/validators/server/modelImages.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";

// import { uploadImageS3 } from "../helpers/s3";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(dataTableSchema)
    .query(async ({ input }) => {
      const allModelImages = getAllModelImages(input);

      return allModelImages;
    }),
  countAll: organizationProcedure
    .input(dataTableCountSchema)
    .query(({ input }) => {
      const count = getModelImagesCount(input);
      return count;
    }),
  getAllByModelId: organizationProcedure
    .input(getAllModelImagesByModelIdSchema)
    .query(async ({ input }) => {
      const model = await getModelById(input.modelId);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "model not found",
        });
      }

      const allModelImages = await getAllModelImagesByModelId(input.modelId);

      return allModelImages.map((modelImage) => ({
        ...modelImage,
        favourite: modelImage.id === model.defaultImageId,
      }));
    }),
  getById: organizationProcedure
    .input(getModelImageByIdSchema)
    .query(async ({ input }) => {
      const modelImage = await getModelImageById(input.id);

      if (!modelImage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "modelImage not found",
        });
      }

      return modelImage;
    }),
  uploadImage: organizationProcedure
    .input(uploadModelImageSchema)
    .mutation(async () => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),
  create: organizationProcedure
    .input(createModelImageSchema)
    .mutation(async ({ input, ctx }) => {
      const modelImages = await getAllModelImagesByModelId(input.modelId);
      const isFirstImage = modelImages.length === 0;

      const imageMetadata = createInsertMetadata(ctx.session);
      const createdModelImage = await createModelImage({
        ...input,
        ...imageMetadata,
      });

      assertDatabaseResult(createdModelImage);

      if (isFirstImage) {
        const modelMetadata = createUpdateMetadata(ctx.session);

        await updateModel({
          id: input.modelId,
          defaultImageId: createdModelImage.id,
          ...modelMetadata,
        });
      }

      return createdModelImage;
    }),
  update: organizationProcedure
    .input(updateModelImageSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedModelImage = await updateModelImage({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedModelImage);

      return updatedModelImage;
    }),
  setFavourite: organizationProcedure
    .input(setFavouriteModelImageSchema)
    .mutation(async ({ input, ctx }) => {
      const modelImage = await getModelImageById(input.id);

      if (!modelImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "model Image not found",
        });
      }

      const model = await getModelById(modelImage.modelId);

      if (!model) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "model not found",
        });
      }
      const metadata = createUpdateMetadata(ctx.session);
      await updateModel({
        id: model.id,
        defaultImageId: modelImage.id,
        ...metadata,
      });

      return modelImage;
    }),
  archive: organizationProcedure
    .input(archiveModelImageSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);

      const archivedModelImage = await archiveModelImage({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedModelImage);

      return archivedModelImage;
    }),
});
