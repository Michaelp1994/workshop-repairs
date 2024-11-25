import {
  archiveRepairImage,
  countRepairImages,
  createRepairImage,
  getAllRepairImages,
  getAllRepairImagesByRepairId,
  getRepairImageById,
  updateRepairImage,
} from "@repo/db/repositories/repairImage.repository";
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
import { Resource } from "sst";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import {
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
} from "../helpers/s3";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllRepairImagesSchema)
    .query(async ({ input }) => {
      const allRepairImages = getAllRepairImages(input);

      return allRepairImages;
    }),
  countAll: organizationProcedure
    .input(countRepairImagesSchema)
    .query(({ input }) => {
      const count = countRepairImages(input);
      return count;
    }),
  getAllByRepairId: organizationProcedure
    .input(getAllRepairImagesByRepairIdSchema)
    .query(async ({ input }) => {
      const allRepairImages = await getAllRepairImagesByRepairId(
        input.repairId,
      );
      return allRepairImages.map((repairImage) => ({
        ...repairImage,
        url: `${Resource.MyRouter.url}/repairImages/${repairImage.url}`,
      }));
    }),
  getById: organizationProcedure
    .input(getRepairImageByIdSchema)
    .query(async ({ input }) => {
      const repairImage = await getRepairImageById(input.id);

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
      const metadata = createInsertMetadata(ctx.session);
      const fileExists = await fileExistsInS3(`repairImages/${input.fileName}`);
      if (!fileExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File does not exist.",
        });
      }
      const createdRepairImage = await createRepairImage({
        ...input,
        url: input.fileName,
        ...metadata,
      });
      assertDatabaseResult(createdRepairImage);
      return createdRepairImage;
    }),
  update: organizationProcedure
    .input(updateRepairImageSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedRepairImage = await updateRepairImage({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairImage);

      return updatedRepairImage;
    }),
  archive: organizationProcedure
    .input(archiveRepairImageSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedRepairImage = await archiveRepairImage({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairImage);

      return archivedRepairImage;
    }),
});
