import RepairImageService from "@repo/services/services/repairImage.service";
import {
  archiveRepairImageSchema,
  countRepairImagesSchema,
  createRepairImageSchema,
  getAllRepairImagesByRepairIdSchema,
  getAllRepairImagesSchema,
  getRepairImageByIdSchema,
  requestUploadRepairImageSchema,
  updateRepairImageSchema,
} from "@repo/validators/server/repairImages.validators";
import { TRPCError } from "@trpc/server";

import { env } from "../env";
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
      .query(async ({ input }) => {
        const allRepairImages =
          await repairImageService.getAllRepairImagesByRepairId(input.repairId);
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

        if (!repairImage) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "repairImage not found",
          });
        }

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
        return await repairImageService.createRepairImage(input, ctx.session);
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
