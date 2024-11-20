import {
  archivePart,
  createPart,
  getAllParts,
  getPartById,
  getPartsCount,
  getPartsSelect,
  updatePart,
} from "@repo/db/repositories/part.repository";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archivePartSchema,
  createPartSchema,
  getPartByIdSchema,
  updatePartSchema,
} from "@repo/validators/parts.validators";
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
      const allParts = getAllParts(input, ctx.session.organizationId);

      return allParts;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await getPartsCount(input, ctx.session.organizationId);

      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allParts = await getPartsSelect(input);

      return allParts;
    }),
  getById: organizationProcedure
    .input(getPartByIdSchema)
    .query(async ({ input }) => {
      const part = await getPartById(input.id);

      if (!part) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "part not found",
        });
      }

      return part;
    }),
  create: organizationProcedure
    .input(createPartSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdPart = await createPart({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdPart);

      return createdPart;
    }),
  update: organizationProcedure
    .input(updatePartSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedPart = await updatePart({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedPart);

      return updatedPart;
    }),
  archive: organizationProcedure
    .input(archivePartSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedPart = await archivePart({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedPart);

      return archivedPart;
    }),
});
