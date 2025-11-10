import {
  archiveModelService,
  countModelsService,
  createModelService,
  getAllModelsService,
  getModelService,
  getModelsSelectService,
  updateModelService,
} from "@repo/services/services/model.service";
import {
  archiveModelSchema,
  countModelsSchema,
  createModelSchema,
  getAllModelsSchema,
  getModelBySlugSchema,
  getModelsSelectSchema,
  updateModelSchema,
} from "@repo/validators/server/models.validators";
import { TRPCError } from "@trpc/server";

import { getModelImageUrlFromKey } from "../helpers/s3";
import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllModelsSchema)
    .query(async ({ ctx, input }) => {
      const allModels = await getAllModelsService(input, ctx.session);
      return allModels.map((model) => ({
        ...model,
        defaultImageUrl: model.defaultImageUrl
          ? getModelImageUrlFromKey(model.defaultImageUrl)
          : null,
      }));
    }),
  countAll: organizationProcedure
    .input(countModelsSchema)
    .query(({ ctx, input }) => {
      const count = countModelsService(input, ctx.session);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getModelsSelectSchema)
    .query(async ({ ctx, input }) => {
      const allModels = await getModelsSelectService(input, ctx.session);
      return allModels;
    }),
  getBySlug: organizationProcedure
    .input(getModelBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const model = await getModelService(localId, ctx.session);

      if (!model) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find model",
        });
      }

      return model;
    }),
  create: organizationProcedure
    .input(createModelSchema)
    .mutation(async ({ input, ctx }) => {
      const createdModel = await createModelService(input, ctx.session);

      return createdModel;
    }),
  update: organizationProcedure
    .input(updateModelSchema)
    .mutation(async ({ input: { slug, ...values }, ctx }) => {
      const { localId } = splitSlug(slug);

      const updatedModel = await updateModelService(
        values,
        localId,
        ctx.session,
      );

      return updatedModel;
    }),
  archive: organizationProcedure
    .input(archiveModelSchema)
    .mutation(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const archivedModel = await archiveModelService(localId, ctx.session);

      return archivedModel;
    }),
});
