import ModelImageService from "@repo/services/services/modelImage.service";
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

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function modelImageRouter(modelImageService: ModelImageService) {
  return router({
    getAll: organizationProcedure
      .input(getAllModelImagesSchema)
      .query(async ({ input, ctx }) => {
        const allModelImages = await modelImageService.getAllModelImages(
          input,
          ctx.session,
        );

        return allModelImages;
      }),
    countAll: organizationProcedure
      .input(countModelImagesSchema)
      .query(async ({ input, ctx }) => {
        const count = await modelImageService.countModelImages(
          input,
          ctx.session,
        );
        return count;
      }),
    // getAllByModelId: organizationProcedure
    //   .input(getAllModelImagesByModelIdSchema)
    //   .query(async ({ input }) => {
    //     const model = await modelImageService.getModelById(input.modelId);

    //     if (!model) {
    //       throw new TRPCError({
    //         code: "NOT_FOUND",
    //         message: "model not found",
    //       });
    //     }

    //     const allModelImages = await modelImageService.getAllModelImagesByModelId(input.modelId);

    //     return allModelImages.map((modelImage) => ({
    //       ...modelImage,
    //       url: getModelImageUrlFromKey(modelImage.url),
    //       favourite: modelImage.id === model.defaultImageId,
    //     }));
    //   }),
    getById: organizationProcedure
      .input(getModelImageByIdSchema)
      .query(async ({ input, ctx }) => {
        const modelImage = await modelImageService.getModelImageById(
          input.id,
          ctx.session,
        );

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
      .mutation(async ({ input, ctx }) => {
        return await modelImageService.requestUploadModelImage(
          input,
          ctx.session,
        );
      }),
    create: organizationProcedure
      .input(createModelImageSchema)
      .mutation(async ({ input, ctx }) => {
        return await modelImageService.createModelImage(input, ctx.session);
      }),
    update: organizationProcedure
      .input(updateModelImageSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedModelImage = await modelImageService.updateModelImage(
          values,
          id,
          ctx.session,
        );

        return updatedModelImage;
      }),
    setFavourite: organizationProcedure
      .input(setFavouriteModelImageSchema)
      .mutation(async ({ input, ctx }) => {
        const modelImage = await modelImageService.setFavouriteModelImage(
          input,
          ctx.session,
        );
        return modelImage;
      }),
    archive: organizationProcedure
      .input(archiveModelImageSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedModelImage = await modelImageService.archiveModelImage(
          input.id,
          ctx.session,
        );

        return archivedModelImage;
      }),
  });
}
