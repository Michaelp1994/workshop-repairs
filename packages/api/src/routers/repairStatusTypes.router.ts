import {
  archiveRepairStatus,
  createRepairStatus,
  getAllRepairStatusTypes,
  getRepairStatusById,
  getRepairStatusTypesCount,
  getRepairStatusTypesSelect,
  updateRepairStatus,
} from "@repo/db/repositories/repairStatusType.repository";
import {
  dataTableSchema,
  dataTableCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveRepairStatusTypeSchema,
  createRepairStatusTypeSchema,
  getRepairStatusTypeByIdSchema,
  updateRepairStatusTypeSchema,
} from "@repo/validators/server/repairStatusTypes.validators";
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
    .input(dataTableSchema)
    .query(async ({ input }) => {
      const allRepairStatusTypes = getAllRepairStatusTypes(input);

      return allRepairStatusTypes;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairStatusTypes = await getRepairStatusTypesSelect(input);
      return allRepairStatusTypes;
    }),
  getCount: organizationProcedure
    .input(dataTableCountSchema)
    .query(({ input }) => {
      const count = getRepairStatusTypesCount(input);
      return count;
    }),
  getById: organizationProcedure
    .input(getRepairStatusTypeByIdSchema)
    .query(async ({ input }) => {
      const repairStatusType = await getRepairStatusById(input.id);

      if (!repairStatusType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairStatusType not found",
        });
      }

      return repairStatusType;
    }),
  create: organizationProcedure
    .input(createRepairStatusTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdRepairStatusType = await createRepairStatus({
        ...input,
        ...metadata,
      });
      assertDatabaseResult(createdRepairStatusType);

      return createdRepairStatusType;
    }),
  update: organizationProcedure
    .input(updateRepairStatusTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedRepairStatusType = await updateRepairStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairStatusType);

      return updatedRepairStatusType;
    }),
  archive: organizationProcedure
    .input(archiveRepairStatusTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedRepairStatusType = await archiveRepairStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairStatusType);

      return archivedRepairStatusType;
    }),
});
