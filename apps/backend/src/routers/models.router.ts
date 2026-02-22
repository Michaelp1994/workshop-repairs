import ModelService from "@repo/services/services/model.service";
import {
  archiveModelSchema,
  countModelsSchema,
  createModelSchema,
  getAllModelsSchema,
  getModelBySlugSchema,
  getModelsSelectSchema,
  updateModelSchema,
} from "@repo/validators/server/models.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function modelRouter(modelService: ModelService) {
  return router({
    getAll: organizationProcedure
      .input(getAllModelsSchema)
      .query(async ({ ctx, input }) => {
        const allModels = await modelService.getAllModels(input, ctx.session);
        return allModels;
      }),
    countAll: organizationProcedure
      .input(countModelsSchema)
      .query(async ({ ctx, input }) => {
        const count = await modelService.countModels(input, ctx.session);
        return count;
      }),
    getSelect: organizationProcedure
      .input(getModelsSelectSchema)
      .query(async ({ ctx, input }) => {
        const allModels = await modelService.getModelsSelect(
          input,
          ctx.session,
        );
        return allModels;
      }),
    getBySlug: organizationProcedure
      .input(getModelBySlugSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.slug);

        const model = await modelService.getModel(localId, ctx.session);

        return model;
      }),
    create: organizationProcedure
      .input(createModelSchema)
      .mutation(async ({ input, ctx }) => {
        const createdModel = await modelService.createModel(input, ctx.session);

        return createdModel;
      }),
    update: organizationProcedure
      .input(updateModelSchema)
      .mutation(async ({ input: { slug, ...values }, ctx }) => {
        const { localId } = splitSlug(slug);

        const updatedModel = await modelService.updateModel(
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

        const archivedModel = await modelService.archiveModel(
          localId,
          ctx.session,
        );

        return archivedModel;
      }),
  });
}
