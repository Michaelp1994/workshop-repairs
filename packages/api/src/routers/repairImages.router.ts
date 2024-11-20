import * as repairImageRepository from "@repo/db/repositories/repairImage.repository";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as repairImageSchemas from "@repo/validators/repairImages.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairImages = repairImageRepository.getAll(input);

    return allRepairImages;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairImageRepository.getCount(input);
    return count;
  }),
  getAllByRepairId: organizationProcedure
    .input(repairImageSchemas.getAllByRepairId)
    .query(async ({ input }) => {
      const allRepairImages = repairImageRepository.getAllByRepairId(
        input.repairId,
      );
      return allRepairImages;
    }),
  getById: organizationProcedure
    .input(repairImageSchemas.getById)
    .query(async ({ input }) => {
      const repairImage = await repairImageRepository.getById(input.id);

      if (!repairImage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairImage not found",
        });
      }

      return repairImage;
    }),
  create: organizationProcedure
    .input(repairImageSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairImage = await repairImageRepository.create({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdRepairImage);

      return createdRepairImage;
    }),
  update: organizationProcedure
    .input(repairImageSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairImage = await repairImageRepository.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairImage);

      return updatedRepairImage;
    }),
  archive: organizationProcedure
    .input(repairImageSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairImage = await repairImageRepository.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairImage);

      return archivedRepairImage;
    }),
});
