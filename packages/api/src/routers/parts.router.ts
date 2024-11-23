import {
  archivePart,
  countParts,
  createPart,
  getAllParts,
  getPartById,
  getPartsSelect,
  updatePart,
} from "@repo/db/repositories/part.repository";
import {
  archivePartSchema,
  createPartSchema,
  getAllPartsSchema,
  getPartByIdSchema,
  countPartsSchema,
  getPartsSelectSchema,
  updatePartSchema,
} from "@repo/validators/server/parts.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllPartsSchema)
    .query(async ({ ctx, input }) => {
      const allParts = getAllParts(input, ctx.session.organizationId);

      return allParts;
    }),
  countAll: organizationProcedure
    .input(countPartsSchema)
    .query(async ({ ctx, input }) => {
      const count = await countParts(input, ctx.session.organizationId);

      return count;
    }),
  getSelect: organizationProcedure
    .input(getPartsSelectSchema)
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
      const metadata = createInsertMetadata(ctx.session);
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
      const metadata = createUpdateMetadata(ctx.session);
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
      const metadata = createArchiveMetadata(ctx.session);

      const archivedPart = await archivePart({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedPart);

      return archivedPart;
    }),
});
