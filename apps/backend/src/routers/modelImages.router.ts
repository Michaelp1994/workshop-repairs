import ModelService from "@repo/services/services/model.service";
import ModelImageService from "@repo/services/services/modelImage.service";
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

import { getModelImageUrlFromKey } from "../../../../packages/services/src/helpers/s3";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function modelImageRouter(
  modelImageService: ModelImageService,
  modelService: ModelService,
) {
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
    getAllByModelId: organizationProcedure
      .input(getAllModelImagesByModelIdSchema)
      .query(async ({ input, ctx }) => {
        const model = await modelService.getModel(input.modelId, ctx.session);

        const allModelImages =
          await modelImageService.getAllModelImagesByModelId(
            input.modelId,
            ctx.session,
          );

        return allModelImages.map((modelImage) => ({
          ...modelImage,
          url: getModelImageUrlFromKey(modelImage.url),
          favourite: modelImage.id === model.defaultImageId,
        }));
      }),
    getById: organizationProcedure
      .input(getModelImageByIdSchema)
      .query(async ({ input, ctx }) => {
        const modelImage = await modelImageService.getModelImageById(
          input.id,
          ctx.session,
        );

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
