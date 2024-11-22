import {
  archivePartToModel,
  countAllModelsByPartId,
  countAllPartsByModelId,
  createPartToModel,
  getAllModelsByPartId,
  getAllPartsByModelId,
  getPartsToModelsSelect,
  getPartToModelById,
  updatePartToModel,
} from "@repo/db/repositories/partToModel.repository";
import { getSelectSchema } from "@repo/validators/dataTables.validators";
import {
  archivePartToModelSchema,
  createPartToModelSchema,
  getAllModelsByPartIdCountSchema,
  getAllModelsByPartIdSchema,
  getAllPartsByModelIdCountSchema,
  getAllPartsByModelIdSchema,
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
    .input(getAllPartsByModelIdCountSchema)
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
    .input(getAllModelsByPartIdCountSchema)
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

  getSelect: organizationProcedure.input(getSelectSchema).query(({ input }) => {
    const allParts = getPartsToModelsSelect(input);
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
