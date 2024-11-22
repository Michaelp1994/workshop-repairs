import {
  archiveRepairType,
  countRepairTypes,
  createRepairType,
  getAllRepairTypes,
  getRepairTypeById,
  getRepairTypesSelect,
  updateRepairType,
} from "@repo/db/repositories/repairType.repository";
import {
  archiveRepairTypeSchema,
  createRepairTypeSchema,
  getAllRepairTypesSchema,
  getRepairTypeByIdSchema,
  getRepairTypesCountSchema,
  getRepairTypesSelectSchema,
  updateRepairTypeSchema,
} from "@repo/validators/server/repairTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllRepairTypesSchema)
    .query(async ({ input }) => {
      const allRepairTypes = getAllRepairTypes(input);
      return allRepairTypes;
    }),
  countAll: organizationProcedure
    .input(getRepairTypesCountSchema)
    .query(({ input }) => {
      const count = countRepairTypes(input);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getRepairTypesSelectSchema)
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
