import {
  archivePartService,
  countPartsService,
  createPartService,
  getAllPartsService,
  getPartService,
  getPartsSelectService,
  updatePartService,
} from "@repo/services/services/part.service";
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

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllPartsSchema)
    .query(async ({ ctx, input }) => {
      const allParts = getAllPartsService(input, ctx.session);

      return allParts;
    }),
  countAll: organizationProcedure
    .input(countPartsSchema)
    .query(async ({ ctx, input }) => {
      const count = await countPartsService(input, ctx.session);

      return count;
    }),
  getSelect: organizationProcedure
    .input(getPartsSelectSchema)
    .query(async ({ input, ctx }) => {
      const allParts = await getPartsSelectService(input, ctx.session);

      return allParts;
    }),
  getBySlug: organizationProcedure
    .input(getPartBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);
      const part = await getPartService(localId, ctx.session);

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
      const createdPart = await createPartService(input, ctx.session);

      return createdPart;
    }),
  update: organizationProcedure
    .input(updatePartSchema)
    .mutation(async ({ input: { slug, ...values }, ctx }) => {
      const { localId } = splitSlug(slug);

      const updatedPart = await updatePartService(values, localId, ctx.session);

      return updatedPart;
    }),
  archive: organizationProcedure
    .input(archivePartSchema)
    .mutation(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const archivedPart = await archivePartService(localId, ctx.session);

      return archivedPart;
    }),
});
