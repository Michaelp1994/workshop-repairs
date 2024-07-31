import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import repairCommentsController from "@repo/db/controllers/repairComments.controller";
import repairCommentSchemas from "@repo/validators/repairComments.validators";
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
      const allRepairComments = repairCommentsController.getAll(input, ctx.db);

      return allRepairComments;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = repairCommentsController.getCount(input, ctx.db);
    return count;
  }),
  getById: protectedProcedure
    .input(repairCommentSchemas.getById)
    .query(async ({ input, ctx }) => {
      const repairComment = await repairCommentsController.getById(
        input.id,
        ctx.db,
      );

      if (!repairComment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairComment not found",
        });
      }

      return repairComment;
    }),
  getAllByRepairId: protectedProcedure
    .input(repairCommentSchemas.getAllByRepairId)
    .query(async ({ input, ctx }) => {
      const allRepairParts = repairCommentsController.getAllByRepairId(
        input.repairId,
        ctx.db,
      );

      return allRepairParts;
    }),
  create: protectedProcedure
    .input(repairCommentSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairComment = await repairCommentsController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdRepairComment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair Comment",
        });
      }

      return createdRepairComment;
    }),
  update: protectedProcedure
    .input(repairCommentSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairComment = await repairCommentsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedRepairComment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update Repair Comment",
        });
      }

      return updatedRepairComment;
    }),
  delete: protectedProcedure
    .input(repairCommentSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);
      const deletedRepairComment = await repairCommentsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedRepairComment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete Repair Comment",
        });
      }

      return deletedRepairComment;
    }),
});
