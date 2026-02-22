import PartToModelService from "@repo/services/services/partToModel.service";
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
} from "@repo/validators/server/partsToModel.validators";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function partToModelRouter(
  partToModelService: PartToModelService,
) {
  return router({
    getAllPartsByModelId: organizationProcedure
      .input(getAllPartsByModelIdSchema)
      .query(async ({ input }) => {
        const allParts = await partToModelService.getAllPartsByModelId(input);
        return allParts;
      }),

    countAllPartsByModelId: organizationProcedure
      .input(countAllPartsByModelIdSchema)
      .query(async ({ input }) => {
        const count = await partToModelService.countAllPartsByModelId(input);

        return count;
      }),
    getAllModelsByPartId: organizationProcedure
      .input(getAllModelsByPartIdSchema)
      .query(async ({ input }) => {
        const allModels = await partToModelService.getAllModelsByPartId(input);
        return allModels;
      }),
    countAllModelsByPartId: organizationProcedure
      .input(countAllModelsByPartIdSchema)
      .query(async ({ input }) => {
        const count = await partToModelService.countAllModelsByPartId(input);
        return count;
      }),

    getModelsByPartIdSelect: organizationProcedure
      .input(getModelsByPartIdSelectSchema)
      .query(async ({ input }) => {
        const allModels = await partToModelService.getModelsByPartIdSelect(
          input,
          input.partId,
        );
        return allModels;
      }),
    getPartsByModelIdSelect: organizationProcedure
      .input(getPartsByModelIdSelectSchema)
      .query(async ({ input }) => {
        const allParts = await partToModelService.getPartsByModelIdSelect(
          input,
          input.modelId,
        );
        return allParts;
      }),
    getByIds: organizationProcedure
      .input(getPartToModelByIdSchema)
      .query(async ({ input }) => {
        const partModel = await partToModelService.getPartToModelById(
          input.partId,
          input.modelId,
        );

        return partModel;
      }),
    create: organizationProcedure
      .input(createPartToModelSchema)
      .mutation(async ({ input, ctx }) => {
        const createdPartModel = await partToModelService.createPartToModel(
          input,
          ctx.session,
        );

        return createdPartModel;
      }),
    update: organizationProcedure
      .input(updatePartToModelSchema)
      .mutation(async ({ input }) => {
        const updatedPartToModel =
          await partToModelService.updatePartToModel(input);

        return updatedPartToModel;
      }),
    archive: organizationProcedure
      .input(archivePartToModelSchema)
      .mutation(async ({ input }) => {
        const archivedPartModel =
          await partToModelService.archivePartToModel(input);

        return archivedPartModel;
      }),
  });
}
