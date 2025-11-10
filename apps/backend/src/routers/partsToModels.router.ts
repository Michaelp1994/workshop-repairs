import {
  archivePartToModelService,
  countAllModelsByPartIdService,
  countAllPartsByModelIdService,
  createPartToModelService,
  getAllModelsByPartIdService,
  getAllPartsByModelIdService,
  getModelsByPartIdSelectService,
  getPartsByModelIdSelectService,
  getPartToModelByIdService,
  updatePartToModelService,
} from "@repo/services/services/partToModel.service";
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
import { TRPCError } from "@trpc/server";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAllPartsByModelId: organizationProcedure
    .input(getAllPartsByModelIdSchema)
    .query(({ input }) => {
      const allParts = getAllPartsByModelIdService(input);
      return allParts;
    }),

  countAllPartsByModelId: organizationProcedure
    .input(countAllPartsByModelIdSchema)
    .query(async ({ input }) => {
      const count = await countAllPartsByModelIdService(input);

      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't get count",
        });
      }
      return count;
    }),
  getAllModelsByPartId: organizationProcedure
    .input(getAllModelsByPartIdSchema)
    .query(({ input }) => {
      const allModels = getAllModelsByPartIdService(input);
      return allModels;
    }),
  countAllModelsByPartId: organizationProcedure
    .input(countAllModelsByPartIdSchema)
    .query(async ({ input }) => {
      const count = await countAllModelsByPartIdService(input);
      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't get count",
        });
      }
      return count;
    }),

  getModelsByPartIdSelect: organizationProcedure
    .input(getModelsByPartIdSelectSchema)
    .query(({ input }) => {
      const allModels = getModelsByPartIdSelectService(input, input.partId);
      return allModels;
    }),
  getPartsByModelIdSelect: organizationProcedure
    .input(getPartsByModelIdSelectSchema)
    .query(({ input }) => {
      const allParts = getPartsByModelIdSelectService(input, input.modelId);
      return allParts;
    }),
  getByIds: organizationProcedure
    .input(getPartToModelByIdSchema)
    .query(async ({ input }) => {
      const partModel = await getPartToModelByIdService(
        input.partId,
        input.modelId,
      );

      return partModel;
    }),
  create: organizationProcedure
    .input(createPartToModelSchema)
    .mutation(async ({ input }) => {
      const createdPartModel = await createPartToModelService(input);

      return createdPartModel;
    }),
  update: organizationProcedure
    .input(updatePartToModelSchema)
    .mutation(async ({ input }) => {
      const updatedPartToModel = await updatePartToModelService(input);

      return updatedPartToModel;
    }),
  archive: organizationProcedure
    .input(archivePartToModelSchema)
    .mutation(async ({ input }) => {
      const archivedPartModel = await archivePartToModelService(input);

      return archivedPartModel;
    }),
});
