import RepairImageService from "../services/repairImage.service";
import {
  archiveRepairImageSchema,
  countRepairImagesSchema,
  createRepairImageSchema,
  getAllRepairImagesByRepairIdSchema,
  getAllRepairImagesSchema,
  getRepairImageByIdSchema,
  requestUploadRepairImageSchema,
  updateRepairImageSchema,
} from "../validators/repairImages.validators";

import { env } from "../env";
import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function repairImageRouter(
  repairImageService: RepairImageService,
) {
  return router({
    getAll: organizationProcedure
      .input(getAllRepairImagesSchema)
      .query(async ({ input }) => {
        const allRepairImages =
          await repairImageService.getAllRepairImages(input);

        return allRepairImages;
      }),
    countAll: organizationProcedure
      .input(countRepairImagesSchema)
      .query(async ({ input }) => {
        const count = await repairImageService.countRepairImages(input);
        return count;
      }),
    getAllByRepairId: organizationProcedure
      .input(getAllRepairImagesByRepairIdSchema)
      .query(async ({ input, ctx }) => {
        const repairLocalId = splitSlug(input.repairId).localId;
        const allRepairImages =
          await repairImageService.getAllRepairImagesByRepairId(
            repairLocalId,
            ctx.session,
          );
        return allRepairImages.map((repairImage) => ({
          ...repairImage,
          url: `${env.imageUrl}/repairImages/${repairImage.url}`,
        }));
      }),
    getById: organizationProcedure
      .input(getRepairImageByIdSchema)
      .query(async ({ input }) => {
        const repairImage = await repairImageService.getRepairImageById(
          input.id,
        );

        return repairImage;
      }),
    requestUpload: organizationProcedure
      .input(requestUploadRepairImageSchema)
      .mutation(async ({ input }) => {
        return await repairImageService.requestUploadRepairImage(input);
      }),
    create: organizationProcedure
      .input(createRepairImageSchema)
      .mutation(async ({ input, ctx }) => {
        const repairLocalId = splitSlug(input.repairId).localId;
        return await repairImageService.createRepairImage(
          { caption: input.caption, fileName: input.fileName, repairLocalId },
          ctx.session,
        );
      }),
    update: organizationProcedure
      .input(updateRepairImageSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedRepairImage = await repairImageService.updateRepairImage(
          values,
          id,
          ctx.session,
        );

        return updatedRepairImage;
      }),
    archive: organizationProcedure
      .input(archiveRepairImageSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedRepairImage = await repairImageService.archiveRepairImage(
          input.id,
          ctx.session,
        );

        return archivedRepairImage;
      }),
  });
}
