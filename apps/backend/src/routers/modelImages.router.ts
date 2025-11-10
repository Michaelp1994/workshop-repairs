import {
  archiveModelImageService,
  countModelImagesService,
  createModelImageService,
  getAllModelImagesByModelIdService,
  getAllModelImagesService,
  getModelImageByIdService,
  updateModelImageService,
} from "@repo/services/services/modelImage.service";
import {
  archiveModelImageSchema,
  countModelImagesSchema,
  createModelImageSchema,
  getAllModelImagesSchema,
  getModelImageByIdSchema,
  requestUploadModelImageSchema,
  setFavouriteModelImageSchema,
  updateModelImageSchema,
} from "@repo/validators/server/modelImages.validators";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

import {
  createModelImageKeyFromFileName,
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
} from "../helpers/s3";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllModelImagesSchema)
    .query(async ({ input, ctx }) => {
      const allModelImages = getAllModelImagesService(input, ctx.session);

      return allModelImages;
    }),
  countAll: organizationProcedure
    .input(countModelImagesSchema)
    .query(({ input, ctx }) => {
      const count = countModelImagesService(input, ctx.session);
      return count;
    }),
  // getAllByModelId: organizationProcedure
  //   .input(getAllModelImagesByModelIdSchema)
  //   .query(async ({ input }) => {
  //     const model = await getModelById(input.modelId);

  //     if (!model) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "model not found",
  //       });
  //     }

  //     const allModelImages = await getAllModelImagesByModelId(input.modelId);

  //     return allModelImages.map((modelImage) => ({
  //       ...modelImage,
  //       url: getModelImageUrlFromKey(modelImage.url),
  //       favourite: modelImage.id === model.defaultImageId,
  //     }));
  //   }),
  getById: organizationProcedure
    .input(getModelImageByIdSchema)
    .query(async ({ input, ctx }) => {
      const modelImage = await getModelImageByIdService(input.id, ctx.session);

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

      const modelImages = await getAllModelImagesByModelIdService(
        input.modelId,
        ctx.session,
      );
      const isFirstImage = modelImages.length === 0;

      const createdModelImage = await createModelImageService(
        {
          ...input,
          url: input.fileName,
        },
        ctx.session,
      );

      if (isFirstImage) {
        const modelMetadata = createUpdateMetadata(ctx.session);

        await updateModel({
          id: input.modelId,
          defaultImageId: createdModelImage.id,
          ...mo,
        });
      }

      return createdModelImage;
    }),
  update: organizationProcedure
    .input(updateModelImageSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedModelImage = await updateModelImageService(
        values,
        id,
        ctx.session,
      );

      return updatedModelImage;
    }),
  setFavourite: organizationProcedure
    .input(setFavouriteModelImageSchema)
    .mutation(async ({ input, ctx }) => {
      const modelImage = await getModelImageByIdService(input.id, ctx.session);

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

      await updateModel({
        id: model.id,
        defaultImageId: modelImage.id,
      });

      return modelImage;
    }),
  archive: organizationProcedure
    .input(archiveModelImageSchema)
    .mutation(async ({ input, ctx }) => {
      const archivedModelImage = await archiveModelImageService(
        input.id,
        ctx.session,
      );

      return archivedModelImage;
    }),
});
