import {
  getModelById,
  updateModel,
} from "@repo/db/repositories/model.repository";
import {
  archiveModelImage,
  countModelImages,
  createModelImage,
  getAllModelImages,
  getAllModelImagesByModelId,
  getModelImageById,
  updateModelImage,
} from "@repo/db/repositories/modelImage.repository";
import {
  archiveModelImageSchema,
  countModelImagesSchema,
  createModelImageSchema,
  getAllModelImagesByModelIdSchema,
  getAllModelImagesSchema,
  getModelImageByIdSchema,
  requestUploadModelImageSchema,
  setFavouriteModelImageSchema,
  updateModelImageSchema,
} from "@repo/validators/server/modelImages.validators";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import {
  createModelImageKeyFromFileName,
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
  getModelImageUrlFromKey,
} from "../helpers/s3";
import assertDatabaseResult from "../helpers/trpcAssert";

// import { uploadImageS3 } from "../helpers/s3";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllModelImagesSchema)
    .query(async ({ input }) => {
      const allModelImages = getAllModelImages(input);

      return allModelImages;
    }),
  countAll: organizationProcedure
    .input(countModelImagesSchema)
    .query(({ input }) => {
      const count = countModelImages(input);
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
        url: getModelImageUrlFromKey(modelImage.url),
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
  requestUpload: organizationProcedure
    .input(requestUploadModelImageSchema)
    .mutation(async ({ input }) => {
      const uuid = randomUUID();
      const fileExt = getFileExtension(input.fileType);
      const fileName = `${uuid}.${fileExt}`;
      const presignedUrl = await createPresignedUrl({
        Key: createModelImageKeyFromFileName(fileName),
      });
      return { url: presignedUrl, fileName };
    }),
  create: organizationProcedure
    .input(createModelImageSchema)
    .mutation(async ({ input, ctx }) => {
      const fileExists = await fileExistsInS3(
        createModelImageKeyFromFileName(input.fileName),
      );
      if (!fileExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File does not exist.",
        });
      }

      const modelImages = await getAllModelImagesByModelId(input.modelId);
      const isFirstImage = modelImages.length === 0;

      const metadata = createInsertMetadata(ctx.session);
      const createdModelImage = await createModelImage({
        ...input,
        url: input.fileName,
        ...metadata,
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
