import {
  archiveRepairComment,
  createRepairComment,
  getAllRepairComments,
  getAllRepairCommentsByRepairId,
  getRepairCommentById,
  getRepairCommentsCount,
  updateRepairComment,
} from "@repo/db/repositories/repairComment.repository";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveRepairCommentSchema,
  createRepairCommentSchema,
  getAllRepairCommentsByRepairIdSchema,
  getRepairCommentByIdSchema,
  updateRepairCommentSchema,
} from "@repo/validators/repairComments.validators";
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
    const allRepairComments = getAllRepairComments(input);

    return allRepairComments;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = getRepairCommentsCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(getRepairCommentByIdSchema)
    .query(async ({ input }) => {
      const repairComment = await getRepairCommentById(input.id);

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
      const allRepairParts = getAllRepairCommentsByRepairId(input.repairId);

      return allRepairParts;
    }),
  create: organizationProcedure
    .input(createRepairCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairComment = await createRepairComment({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdRepairComment);

      return createdRepairComment;
    }),
  update: organizationProcedure
    .input(updateRepairCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairComment = await updateRepairComment({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairComment);

      return updatedRepairComment;
    }),
  archive: organizationProcedure
    .input(archiveRepairCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairComment = await archiveRepairComment({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairComment);

      return archivedRepairComment;
    }),
});
