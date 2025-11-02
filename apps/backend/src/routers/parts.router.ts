import {
  archivePart,
  countParts,
  createPart,
  getAllParts,
  getPartByLocalId,
  getPartsSelect,
  updatePart,
} from "@repo/db/repositories/part.repository";
import {
  archivePartSchema,
  countPartsSchema,
  createPartSchema,
  getAllPartsSchema,
  getPartBySlugSchema,
  getPartsSelectSchema,
  updatePartSchema,
} from "@repo/validators/server/parts.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { splitSlug } from "../helpers/splitUrlSlug";
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
  getBySlug: organizationProcedure
    .input(getPartBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);
      const part = await getPartByLocalId(localId, ctx.session.organizationId);

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
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createUpdateMetadata(ctx.session);
      const updatedPart = await updatePart(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(updatedPart);

      return updatedPart;
    }),
  archive: organizationProcedure
    .input(archivePartSchema)
    .mutation(async ({ input, ctx }) => {
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createArchiveMetadata(ctx.session);

      const archivedPart = await archivePart(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(archivedPart);

      return archivedPart;
    }),
});
