import {
  archivePartToModel,
  createPartToModel,
  getAllModelsByPartId,
  getAllModelsByPartIdCount,
  getAllPartsByModelId,
  getAllPartsByModelIdCount,
  getPartsToModelsSelect,
} from "@repo/db/repositories/partToModel.repository";
import { getSelectSchema } from "@repo/validators/dataTables.validators";
import {
  archivePartToModelSchema,
  createPartToModelSchema,
  getAllModelsByPartIdCountSchema,
  getAllModelsByPartIdSchema,
  getAllPartsByModelIdCountSchema,
  getAllPartsByModelIdSchema,
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

  getCountPartsByModelId: organizationProcedure
    .input(getAllPartsByModelIdCountSchema)
    .query(async ({ input }) => {
      const count = await getAllPartsByModelIdCount(input);

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
  getCountModelsByPartId: organizationProcedure
    .input(getAllModelsByPartIdCountSchema)
    .query(async ({ input }) => {
      const count = await getAllModelsByPartIdCount(input);
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
  create: organizationProcedure
    .input(createPartToModelSchema)
    .mutation(async ({ input }) => {
      const createdPartModel = await createPartToModel(input);

      assertDatabaseResult(createdPartModel);

      return createdPartModel;
    }),
  archive: organizationProcedure
    .input(archivePartToModelSchema)
    .mutation(async ({ input }) => {
      const archivedPartModel = await archivePartToModel(input);

      assertDatabaseResult(archivedPartModel);

      return archivedPartModel;
    }),
});
