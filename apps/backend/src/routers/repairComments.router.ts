import {
  archiveRepairCommentService,
  countRepairCommentsService,
  createRepairCommentService,
  getAllRepairCommentsByRepairIdService,
  getAllRepairCommentsService,
  getRepairCommentByIdService,
  updateRepairCommentService,
} from "@repo/services/services/repairComment.service";
import {
  archiveRepairCommentSchema,
  countRepairCommentsSchema,
  createRepairCommentSchema,
  getAllRepairCommentsByRepairIdSchema,
  getAllRepairCommentsSchema,
  getRepairCommentByIdSchema,
  updateRepairCommentSchema,
} from "@repo/validators/server/repairComments.validators";
import { TRPCError } from "@trpc/server";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllRepairCommentsSchema)
    .query(async ({ input }) => {
      const allRepairComments = getAllRepairCommentsService(input);

      return allRepairComments;
    }),
  countAll: organizationProcedure
    .input(countRepairCommentsSchema)
    .query(({ input }) => {
      const count = countRepairCommentsService(input);
      return count;
    }),
  getById: organizationProcedure
    .input(getRepairCommentByIdSchema)
    .query(async ({ input }) => {
      const repairComment = await getRepairCommentByIdService(input.id);

      if (!repairComment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairComment not found",
        });
      }

      return repairComment;
    }),
  getAllByRepairId: organizationProcedure
    .input(getAllRepairCommentsByRepairIdSchema)
    .query(async ({ input }) => {
      const allRepairParts = getAllRepairCommentsByRepairIdService(
        input.repairId,
      );

      return allRepairParts;
    }),
  create: organizationProcedure
    .input(createRepairCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const createdRepairComment = await createRepairCommentService(
        input,
        ctx.session,
      );

      return createdRepairComment;
    }),
  update: organizationProcedure
    .input(updateRepairCommentSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedRepairComment = await updateRepairCommentService(
        values,
        id,
        ctx.session,
      );

      return updatedRepairComment;
    }),
  archive: organizationProcedure
    .input(archiveRepairCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const archivedRepairComment = await archiveRepairCommentService(
        input.id,
        ctx.session,
      );

      return archivedRepairComment;
    }),
});
