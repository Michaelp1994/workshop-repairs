import ModelService from "../services/model.service";
import {
  archiveModelSchema,
  countModelsSchema,
  createModelSchema,
  getAllModelsSchema,
  getModelByIdSchema,
  getModelsSelectSchema,
  type ModelFilters,
  updateModelSchema,
} from "../validators/models.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

function modelFilters(filters: ModelFilters) {
  return {
    manufacturerLocalId: filters.manufacturerId
      ? splitSlug(filters.manufacturerId).localId
      : undefined,
    equipmentTypeLocalId: filters.equipmentTypeId
      ? splitSlug(filters.equipmentTypeId).localId
      : undefined,
  };
}

export default function modelRouter(modelService: ModelService) {
  return router({
    getAll: organizationProcedure
      .input(getAllModelsSchema)
      .query(async ({ ctx, input: { filters, ...rest } }) => {
        const allModels = await modelService.getAllModels(
          { ...rest, filters: modelFilters(filters) },
          ctx.session,
        );
        return allModels;
      }),
    countAll: organizationProcedure
      .input(countModelsSchema)
      .query(async ({ ctx, input: { filters, ...rest } }) => {
        const count = await modelService.countModels(
          { ...rest, filters: modelFilters(filters) },
          ctx.session,
        );
        return count;
      }),
    getSelect: organizationProcedure
      .input(getModelsSelectSchema)
      .query(async ({ ctx, input: { filters, ...rest } }) => {
        const allModels = await modelService.getModelsSelect(
          { ...rest, filters: modelFilters(filters) },
          ctx.session,
        );
        return allModels;
      }),
    getById: organizationProcedure
      .input(getModelByIdSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);

        const model = await modelService.getModel(localId, ctx.session);

        return model;
      }),
    create: organizationProcedure
      .input(createModelSchema)
      .mutation(async ({ input, ctx }) => {
        const { manufacturerId, equipmentTypeId, ...rest } = input;
        const createdModel = await modelService.createModel(
          {
            ...rest,
            manufacturerLocalId: splitSlug(manufacturerId).localId,
            equipmentTypeLocalId: splitSlug(equipmentTypeId).localId,
          },
          ctx.session,
        );

        return createdModel;
      }),
    update: organizationProcedure
      .input(updateModelSchema)
      .mutation(
        async ({
          input: { id, manufacturerId, equipmentTypeId, ...values },
          ctx,
        }) => {
          const { localId } = splitSlug(id);

          const updatedModel = await modelService.updateModel(
            {
              ...values,
              manufacturerLocalId: manufacturerId
                ? splitSlug(manufacturerId).localId
                : undefined,
              equipmentTypeLocalId: equipmentTypeId
                ? splitSlug(equipmentTypeId).localId
                : undefined,
            },
            localId,
            ctx.session,
          );

          return updatedModel;
        },
      ),
    archive: organizationProcedure
      .input(archiveModelSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);

        const archivedModel = await modelService.archiveModel(
          localId,
          ctx.session,
        );

        return archivedModel;
      }),
  });
}
