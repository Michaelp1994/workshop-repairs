import PartToModelService from "../services/partToModel.service";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";
import {
  archivePartToModelSchema,
  countAllModelsByPartIdSchema,
  countAllPartsByModelIdSchema,
  createPartToModelSchema,
  getAllModelsByPartIdSchema,
  getAllPartsByModelIdSchema,
  getModelsByPartIdSelectSchema,
  getPartsByModelIdSelectSchema,
  getPartToModelByIdSchema,
  updatePartToModelSchema,
} from "../validators/partsToModel.validators";

export default function partToModelRouter(
  partToModelService: PartToModelService,
) {
  return router({
    getAllPartsByModelId: organizationProcedure
      .input(getAllPartsByModelIdSchema)
      .query(async ({ input, ctx }) => {
        const modelLocalId = splitSlug(input.filters.modelId).localId;
        const allParts = await partToModelService.getAllPartsByModelId(
          { ...input, filters: { modelLocalId } },
          ctx.session,
        );
        return allParts;
      }),

    countAllPartsByModelId: organizationProcedure
      .input(countAllPartsByModelIdSchema)
      .query(async ({ input, ctx }) => {
        const modelLocalId = splitSlug(input.filters.modelId).localId;
        const count = await partToModelService.countAllPartsByModelId(
          { ...input, filters: { modelLocalId } },
          ctx.session,
        );
        return count;
      }),

    getAllModelsByPartId: organizationProcedure
      .input(getAllModelsByPartIdSchema)
      .query(async ({ input, ctx }) => {
        const partLocalId = splitSlug(input.filters.partId).localId;
        const allModels = await partToModelService.getAllModelsByPartId(
          { ...input, filters: { partLocalId } },
          ctx.session,
        );
        return allModels;
      }),

    countAllModelsByPartId: organizationProcedure
      .input(countAllModelsByPartIdSchema)
      .query(async ({ input, ctx }) => {
        const partLocalId = splitSlug(input.filters.partId).localId;
        const count = await partToModelService.countAllModelsByPartId(
          { ...input, filters: { partLocalId } },
          ctx.session,
        );
        return count;
      }),

    getModelsByPartIdSelect: organizationProcedure
      .input(getModelsByPartIdSelectSchema)
      .query(async ({ input, ctx }) => {
        const partLocalId = splitSlug(input.partId).localId;
        const allModels = await partToModelService.getModelsByPartIdSelect(
          input,
          partLocalId,
          ctx.session,
        );
        return allModels;
      }),

    getPartsByModelIdSelect: organizationProcedure
      .input(getPartsByModelIdSelectSchema)
      .query(async ({ input, ctx }) => {
        const modelLocalId = splitSlug(input.modelId).localId;
        const allParts = await partToModelService.getPartsByModelIdSelect(
          input,
          modelLocalId,
          ctx.session,
        );
        return allParts;
      }),

    getByIds: organizationProcedure
      .input(getPartToModelByIdSchema)
      .query(async ({ input, ctx }) => {
        const partLocalId = splitSlug(input.partId).localId;
        const modelLocalId = splitSlug(input.modelId).localId;
        const partModel = await partToModelService.getPartToModelById(
          partLocalId,
          modelLocalId,
          ctx.session,
        );
        return partModel;
      }),

    create: organizationProcedure
      .input(createPartToModelSchema)
      .mutation(async ({ input, ctx }) => {
        const partLocalId = splitSlug(input.partId).localId;
        const modelLocalId = splitSlug(input.modelId).localId;
        const createdPartModel = await partToModelService.createPartToModel(
          { quantity: input.quantity, partLocalId, modelLocalId },
          ctx.session,
        );
        return createdPartModel;
      }),

    update: organizationProcedure
      .input(updatePartToModelSchema)
      .mutation(async ({ input, ctx }) => {
        const partLocalId = splitSlug(input.partId).localId;
        const modelLocalId = splitSlug(input.modelId).localId;
        const updatedPartToModel = await partToModelService.updatePartToModel(
          { quantity: input.quantity },
          partLocalId,
          modelLocalId,
          ctx.session,
        );
        return updatedPartToModel;
      }),

    archive: organizationProcedure
      .input(archivePartToModelSchema)
      .mutation(async ({ input, ctx }) => {
        const partLocalId = splitSlug(input.partId).localId;
        const modelLocalId = splitSlug(input.modelId).localId;
        const archivedPartModel = await partToModelService.archivePartToModel(
          { partLocalId, modelLocalId },
          ctx.session,
        );
        return archivedPartModel;
      }),
  });
}
