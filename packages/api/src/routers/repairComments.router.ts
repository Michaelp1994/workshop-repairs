import * as repairCommentRepository from "@repo/db/repositories/repairComment.repository";
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
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairComments = repairCommentRepository.getAll(input);

    return allRepairComments;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairCommentRepository.getCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(repairCommentSchemas.getById)
    .query(async ({ input }) => {
      const repairComment = await repairCommentRepository.getById(input.id);

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
      const allRepairParts = repairCommentRepository.getAllByRepairId(
        input.repairId,
      );

      return allRepairParts;
    }),
  create: organizationProcedure
    .input(repairCommentSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairComment = await repairCommentRepository.create({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdRepairComment);

      return createdRepairComment;
    }),
  update: organizationProcedure
    .input(repairCommentSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairComment = await repairCommentRepository.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairComment);

      return updatedRepairComment;
    }),
  archive: organizationProcedure
    .input(repairCommentSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairComment = await repairCommentRepository.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairComment);

      return archivedRepairComment;
    }),
});
