import * as repairCommentsController from "@repo/db/controllers/repairComments.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as repairCommentSchemas from "@repo/validators/repairComments.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairComments = repairCommentsController.getAll(input);

    return allRepairComments;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairCommentsController.getCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(repairCommentSchemas.getById)
    .query(async ({ input }) => {
      const repairComment = await repairCommentsController.getById(input.id);

      if (!repairComment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairComment not found",
        });
      }

      return repairComment;
    }),
  getAllByRepairId: organizationProcedure
    .input(repairCommentSchemas.getAllByRepairId)
    .query(async ({ input }) => {
      const allRepairParts = repairCommentsController.getAllByRepairId(
        input.repairId,
      );

      return allRepairParts;
    }),
  create: organizationProcedure
    .input(repairCommentSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairComment = await repairCommentsController.create({
        ...input,
        ...metadata,
      });

      if (!createdRepairComment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair Comment",
        });
      }

      return createdRepairComment;
    }),
  update: organizationProcedure
    .input(repairCommentSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairComment = await repairCommentsController.update({
        ...input,
        ...metadata,
      });

      if (!updatedRepairComment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update Repair Comment",
        });
      }

      return updatedRepairComment;
    }),
  archive: organizationProcedure
    .input(repairCommentSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairComment = await repairCommentsController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedRepairComment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive Repair Comment",
        });
      }

      return archivedRepairComment;
    }),
});
