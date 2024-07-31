import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import repairImagesController from "@repo/db/controllers/repairImages.controller";
import repairImageSchemas from "@repo/validators/repairImages.validators";
import {
  createMetadata,
  deleteMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";

export default router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allRepairImages = repairImagesController.getAll(input, ctx.db);

      return allRepairImages;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = repairImagesController.getCount(input, ctx.db);
    return count;
  }),
  getAllByRepairId: protectedProcedure
    .input(repairImageSchemas.getAllByRepairId)
    .query(async ({ ctx, input }) => {
      const allRepairImages = repairImagesController.getAllByRepairId(
        input.repairId,
        ctx.db,
      );
      return allRepairImages;
    }),
  getById: protectedProcedure
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
  create: protectedProcedure
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
  update: protectedProcedure
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
  delete: protectedProcedure
    .input(repairImageSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);
      const deletedRepairImage = await repairImagesController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedRepairImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete repair image",
        });
      }

      return deletedRepairImage;
    }),
});
