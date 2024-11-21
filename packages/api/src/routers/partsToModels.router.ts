import {
  archivePartToModel,
  createPartToModel,
  getAllPartsToModels,
  getPartsToModelsCount,
  getPartsToModelsSelect,
} from "@repo/db/repositories/partToModel.repository";
import {
  dataTableCountSchema,
  dataTableSchema,
} from "@repo/validators/dataTables.validators";
import {
  archivePartToModelSchema,
  createPartToModelSchema,
} from "@repo/validators/server/partsToModel.validators";
import { TRPCError } from "@trpc/server";

import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(dataTableSchema).query(({ input }) => {
    const allParts = getAllPartsToModels(input);
    return allParts;
  }),
  getCount: organizationProcedure
    .input(dataTableCountSchema)
    .query(async ({ input }) => {
      const count = await getPartsToModelsCount(input);

      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't get count",
        });
      }
      return count;
    }),
  getSelect: organizationProcedure
    .input(dataTableCountSchema)
    .query(({ input }) => {
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
