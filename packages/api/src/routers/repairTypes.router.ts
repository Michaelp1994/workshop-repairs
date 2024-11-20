import {
  archiveRepairType,
  createRepairType,
  getAllRepairTypes,
  getRepairTypeById,
  getRepairTypesCount,
  getRepairTypesSelect,
  updateRepairType,
} from "@repo/db/repositories/repairType.repository";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveRepairTypeSchema,
  createRepairTypeSchema,
  getRepairTypeByIdSchema,
  updateRepairTypeSchema,
} from "@repo/validators/repairTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairTypes = getAllRepairTypes(input);
    return allRepairTypes;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = getRepairTypesCount(input);
    return count;
  }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairTypes = await getRepairTypesSelect(input);
      return allRepairTypes;
    }),
  getById: organizationProcedure
    .input(getRepairTypeByIdSchema)
    .query(async ({ input }) => {
      const repairType = await getRepairTypeById(input.id);

      if (!repairType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairType not found",
        });
      }

      return repairType;
    }),
  create: organizationProcedure
    .input(createRepairTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdRepairType = await createRepairType({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdRepairType);

      return createdRepairType;
    }),
  update: organizationProcedure
    .input(updateRepairTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedRepairType = await updateRepairType({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairType);

      return updatedRepairType;
    }),
  archive: organizationProcedure
    .input(archiveRepairTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);

      const archivedRepairType = await archiveRepairType({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairType);

      return archivedRepairType;
    }),
});
