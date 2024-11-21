import {
  archiveRepairImage,
  createRepairImage,
  getAllRepairImages,
  getAllRepairImagesByRepairId,
  getRepairImageById,
  countRepairImages,
  updateRepairImage,
} from "@repo/db/repositories/repairImage.repository";
import {
  dataTableCountSchema,
  dataTableSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveRepairImageSchema,
  createRepairImageSchema,
  getAllRepairImagesByRepairIdSchema,
  getRepairImageByIdSchema,
  updateRepairImageSchema,
} from "@repo/validators/server/repairImages.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(dataTableSchema)
    .query(async ({ input }) => {
      const allRepairImages = getAllRepairImages(input);

      return allRepairImages;
    }),
  countAll: organizationProcedure
    .input(dataTableCountSchema)
    .query(({ input }) => {
      const count = countRepairImages(input);
      return count;
    }),
  getAllByRepairId: organizationProcedure
    .input(getAllRepairImagesByRepairIdSchema)
    .query(async ({ input }) => {
      const allRepairImages = getAllRepairImagesByRepairId(input.repairId);
      return allRepairImages;
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
  create: organizationProcedure
    .input(createRepairImageSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdRepairImage = await createRepairImage({
        ...input,
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
