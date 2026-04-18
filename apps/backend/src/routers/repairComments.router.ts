import RepairCommentService from "@repo/services/services/repairComment.service";
import {
  archiveRepairCommentSchema,
  countRepairCommentsSchema,
  createRepairCommentSchema,
  getAllRepairCommentsByRepairIdSchema,
  getAllRepairCommentsSchema,
  getRepairCommentByIdSchema,
  updateRepairCommentSchema,
} from "@repo/validators/server/repairComments.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function repairCommentRouter(
  repairCommentService: RepairCommentService,
) {
  return router({
    getAll: organizationProcedure
      .input(getAllRepairCommentsSchema)
      .query(async ({ input }) => {
        const allRepairComments =
          await repairCommentService.getAllRepairComments(input);

        return allRepairComments;
      }),
    countAll: organizationProcedure
      .input(countRepairCommentsSchema)
      .query(async ({ input }) => {
        const count = await repairCommentService.countRepairComments(input);
        return count;
      }),
    getById: organizationProcedure
      .input(getRepairCommentByIdSchema)
      .query(async ({ input }) => {
        const repairComment = await repairCommentService.getRepairCommentById(
          input.id,
        );

        return repairComment;
      }),
    getAllByRepairId: organizationProcedure
      .input(getAllRepairCommentsByRepairIdSchema)
      .query(async ({ input, ctx }) => {
        const repairLocalId = splitSlug(input.repairId).localId;
        const allRepairComments =
          await repairCommentService.getAllRepairCommentsByRepairId(
            repairLocalId,
            ctx.session,
          );

        return allRepairComments;
      }),
    create: organizationProcedure
      .input(createRepairCommentSchema)
      .mutation(async ({ input, ctx }) => {
        const repairLocalId = splitSlug(input.repairId).localId;
        const createdRepairComment =
          await repairCommentService.createRepairComment(
            { comment: input.comment, repairLocalId },
            ctx.session,
          );

        return createdRepairComment;
      }),
    update: organizationProcedure
      .input(updateRepairCommentSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedRepairComment =
          await repairCommentService.updateRepairComment(
            values,
            id,
            ctx.session,
          );

        return updatedRepairComment;
      }),
    archive: organizationProcedure
      .input(archiveRepairCommentSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedRepairComment =
          await repairCommentService.archiveRepairComment(
            input.id,
            ctx.session,
          );

        return archivedRepairComment;
      }),
  });
}
