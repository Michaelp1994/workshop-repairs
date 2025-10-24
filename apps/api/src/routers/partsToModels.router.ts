import {
  archivePartToModel,
  countAllModelsByPartId,
  countAllPartsByModelId,
  createPartToModel,
  getAllModelsByPartId,
  getAllPartsByModelId,
  getModelsByPartIdSelect,
  getPartsByModelIdSelect,
  getPartToModelById,
  updatePartToModel,
} from "@repo/db/repositories/partToModel.repository";
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

import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAllPartsByModelId: organizationProcedure
    .input(getAllPartsByModelIdSchema)
    .query(({ input }) => {
      const allParts = getAllPartsByModelId(input);
      return allParts;
    }),

  countAllPartsByModelId: organizationProcedure
    .input(countAllPartsByModelIdSchema)
    .query(async ({ input }) => {
      const count = await countAllPartsByModelId(input);

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
      const allModels = getAllModelsByPartId(input);
      return allModels;
    }),
  countAllModelsByPartId: organizationProcedure
    .input(countAllModelsByPartIdSchema)
    .query(async ({ input }) => {
      const count = await countAllModelsByPartId(input);
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
      const allModels = getModelsByPartIdSelect(input, input.partId);
      return allModels;
    }),
  getPartsByModelIdSelect: organizationProcedure
    .input(getPartsByModelIdSelectSchema)
    .query(({ input }) => {
      const allParts = getPartsByModelIdSelect(input, input.modelId);
      return allParts;
    }),
  getByIds: organizationProcedure
    .input(getPartToModelByIdSchema)
    .query(async ({ input }) => {
      const partModel = await getPartToModelById(input);

      assertDatabaseResult(partModel);

      return partModel;
    }),
  create: organizationProcedure
    .input(createPartToModelSchema)
    .mutation(async ({ input }) => {
      const createdPartModel = await createPartToModel(input);

      assertDatabaseResult(createdPartModel);

      return createdPartModel;
    }),
  update: organizationProcedure
    .input(updatePartToModelSchema)
    .mutation(async ({ input }) => {
      const updatedPartToModel = await updatePartToModel(input);

      assertDatabaseResult(updatedPartToModel);

      return updatedPartToModel;
    }),
  archive: organizationProcedure
    .input(archivePartToModelSchema)
    .mutation(async ({ input }) => {
      const archivedPartModel = await archivePartToModel(input);

      assertDatabaseResult(archivedPartModel);

      return archivedPartModel;
    }),
});
