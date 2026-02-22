import PartService from "@repo/services/services/part.service";
import {
  archivePartSchema,
  countPartsSchema,
  createPartSchema,
  getAllPartsSchema,
  getPartBySlugSchema,
  getPartsSelectSchema,
  updatePartSchema,
} from "@repo/validators/server/parts.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function partRouter(partService: PartService) {
  return router({
    getAll: organizationProcedure
      .input(getAllPartsSchema)
      .query(async ({ ctx, input }) => {
        const allParts = await partService.getAllParts(input, ctx.session);

        return allParts;
      }),
    countAll: organizationProcedure
      .input(countPartsSchema)
      .query(async ({ ctx, input }) => {
        const count = await partService.countParts(input, ctx.session);

        return count;
      }),
    getSelect: organizationProcedure
      .input(getPartsSelectSchema)
      .query(async ({ input, ctx }) => {
        const allParts = await partService.getPartsSelect(input, ctx.session);

        return allParts;
      }),
    getBySlug: organizationProcedure
      .input(getPartBySlugSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.slug);
        const part = await partService.getPart(localId, ctx.session);

        return part;
      }),
    create: organizationProcedure
      .input(createPartSchema)
      .mutation(async ({ input, ctx }) => {
        const createdPart = await partService.createPart(input, ctx.session);

        return createdPart;
      }),
    update: organizationProcedure
      .input(updatePartSchema)
      .mutation(async ({ input: { slug, ...values }, ctx }) => {
        const { localId } = splitSlug(slug);

        const updatedPart = await partService.updatePart(
          values,
          localId,
          ctx.session,
        );

        return updatedPart;
      }),
    archive: organizationProcedure
      .input(archivePartSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.slug);

        const archivedPart = await partService.archivePart(
          localId,
          ctx.session,
        );

        return archivedPart;
      }),
  });
}
