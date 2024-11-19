import * as repairImagesController from "@repo/db/controllers/repairImages.controller";
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
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairImages = repairImagesController.getAll(input);

    return allRepairImages;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairImagesController.getCount(input);
    return count;
  }),
  getAllByRepairId: organizationProcedure
    .input(repairImageSchemas.getAllByRepairId)
    .query(async ({ input }) => {
      const allRepairImages = repairImagesController.getAllByRepairId(
        input.repairId,
      );
      return allRepairImages;
    }),
  getById: organizationProcedure
    .input(repairImageSchemas.getById)
    .query(async ({ input }) => {
      const repairImage = await repairImagesController.getById(input.id);

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
      const createdRepairImage = await repairImagesController.create({
        ...input,
        ...metadata,
      });

      if (!createdRepairImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair image",
        });
      }

      return createdRepairImage;
    }),
  update: organizationProcedure
    .input(repairImageSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairImage = await repairImagesController.update({
        ...input,
        ...metadata,
      });

      if (!updatedRepairImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repair image",
        });
      }

      return updatedRepairImage;
    }),
  archive: organizationProcedure
    .input(repairImageSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairImage = await repairImagesController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedRepairImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair image",
        });
      }

      return archivedRepairImage;
    }),
});
