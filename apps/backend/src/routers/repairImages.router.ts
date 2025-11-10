import {
  archiveRepairImageService,
  countRepairImagesService,
  createRepairImageService,
  getAllRepairImagesByRepairIdService,
  getAllRepairImagesService,
  getRepairImageByIdService,
  updateRepairImageService,
} from "@repo/services/services/repairImage.service";
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
import { randomUUID } from "crypto";

import { env } from "../env";
import {
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
} from "../helpers/s3";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllRepairImagesSchema)
    .query(async ({ input }) => {
      const allRepairImages = getAllRepairImagesService(input);

      return allRepairImages;
    }),
  countAll: organizationProcedure
    .input(countRepairImagesSchema)
    .query(({ input }) => {
      const count = countRepairImagesService(input);
      return count;
    }),
  getAllByRepairId: organizationProcedure
    .input(getAllRepairImagesByRepairIdSchema)
    .query(async ({ input }) => {
      const allRepairImages = await getAllRepairImagesByRepairIdService(
        input.repairId,
      );
      return allRepairImages.map((repairImage) => ({
        ...repairImage,
        url: `${env.imageUrl}/repairImages/${repairImage.url}`,
      }));
    }),
  getById: organizationProcedure
    .input(getRepairImageByIdSchema)
    .query(async ({ input }) => {
      const repairImage = await getRepairImageByIdService(input.id);

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
      const uuid = randomUUID();
      const fileExt = getFileExtension(input.fileType);
      const fileName = `${uuid}.${fileExt}`;
      const presignedUrl = await createPresignedUrl({
        Key: `repairImages/${fileName}`,
      });
      return { url: presignedUrl, fileName };
    }),
  create: organizationProcedure
    .input(createRepairImageSchema)
    .mutation(async ({ input, ctx }) => {
      const fileExists = await fileExistsInS3(`repairImages/${input.fileName}`);
      if (!fileExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File does not exist.",
        });
      }
      const createdRepairImage = await createRepairImageService(
        {
          ...input,
          url: input.fileName,
        },
        ctx.session,
      );

      return createdRepairImage;
    }),
  update: organizationProcedure
    .input(updateRepairImageSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedRepairImage = await updateRepairImageService(
        values,
        id,
        ctx.session,
      );

      return updatedRepairImage;
    }),
  archive: organizationProcedure
    .input(archiveRepairImageSchema)
    .mutation(async ({ input, ctx }) => {
      const archivedRepairImage = await archiveRepairImageService(
        input.id,
        ctx.session,
      );

      return archivedRepairImage;
    }),
});
