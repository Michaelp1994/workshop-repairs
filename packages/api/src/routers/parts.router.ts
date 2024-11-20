import * as partRepository from "@repo/db/repositories/part.repository";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as partSchemas from "@repo/validators/parts.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allParts = partRepository.getAll(input, ctx.session.organizationId);

      return allParts;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await partRepository.getCount(
        input,
        ctx.session.organizationId,
      );

      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allParts = await partRepository.getSelect(input);

      return allParts;
    }),
  getById: organizationProcedure
    .input(partSchemas.getById)
    .query(async ({ input }) => {
      const part = await partRepository.getById(input.id);

      if (!part) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "part not found",
        });
      }

      return part;
    }),
  create: organizationProcedure
    .input(partSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdPart = await partRepository.create({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdPart);

      return createdPart;
    }),
  update: organizationProcedure
    .input(partSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedPart = await partRepository.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedPart);

      return updatedPart;
    }),
  archive: organizationProcedure
    .input(partSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedPart = await partRepository.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedPart);

      return archivedPart;
    }),
});
