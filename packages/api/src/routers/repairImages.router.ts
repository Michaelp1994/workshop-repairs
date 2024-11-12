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
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allRepairImages = repairImagesController.getAll(input, ctx.db);

      return allRepairImages;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = repairImagesController.getCount(input, ctx.db);
      return count;
    }),
  getAllByRepairId: organizationProcedure
    .input(repairImageSchemas.getAllByRepairId)
    .query(async ({ ctx, input }) => {
      const allRepairImages = repairImagesController.getAllByRepairId(
        input.repairId,
        ctx.db,
      );
      return allRepairImages;
    }),
  getById: organizationProcedure
    .input(repairImageSchemas.getById)
    .query(async ({ input, ctx }) => {
      const repairImage = await repairImagesController.getById(
        input.id,
        ctx.db,
      );

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
      const createdRepairImage = await repairImagesController.create(
        { ...input, ...metadata },
        ctx.db,
      );

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
      const updatedRepairImage = await repairImagesController.update(
        { ...input, ...metadata },
        ctx.db,
      );

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
      const archivedRepairImage = await repairImagesController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedRepairImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair image",
        });
      }

      return archivedRepairImage;
    }),
});
