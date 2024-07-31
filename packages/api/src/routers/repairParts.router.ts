import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import repairPartsController from "@repo/db/controllers/repairParts.controller";
import repairPartSchemas from "@repo/validators/repairParts.validators";
import {
  deleteMetadata,
  createMetadata,
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
      const allRepairParts = repairPartsController.getAll(input, ctx.db);

      return allRepairParts;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = repairPartsController.getCount(input, ctx.db);
    return count;
  }),
  getById: protectedProcedure
    .input(repairPartSchemas.getById)
    .query(async ({ input, ctx }) => {
      const repairPart = await repairPartsController.getById(input.id, ctx.db);

      if (!repairPart) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairPart not found",
        });
      }

      return repairPart;
    }),
  getAllByRepairId: protectedProcedure
    .input(repairPartSchemas.getAllByRepairId)
    .query(async ({ input, ctx }) => {
      const allRepairParts = await repairPartsController.getAllByRepairId(
        input.id,
        ctx.db,
      );

      return allRepairParts;
    }),
  create: protectedProcedure
    .input(repairPartSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairPart = await repairPartsController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdRepairPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair Part",
        });
      }

      return createdRepairPart;
    }),
  update: protectedProcedure
    .input(repairPartSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairPart = await repairPartsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedRepairPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repairPart",
        });
      }

      return updatedRepairPart;
    }),
  delete: protectedProcedure
    .input(repairPartSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);
      const deletedRepairPart = await repairPartsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedRepairPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete repair Part",
        });
      }

      return deletedRepairPart;
    }),
});
