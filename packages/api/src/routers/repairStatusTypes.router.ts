import {
  archiveRepairStatus,
  countRepairStatusTypes,
  createRepairStatus,
  getAllRepairStatusTypes,
  getRepairStatusById,
  getRepairStatusTypesSelect,
  updateRepairStatus,
} from "@repo/db/repositories/repairStatusType.repository";
import {
  archiveRepairStatusTypeSchema,
  countRepairStatusTypesSchema,
  createRepairStatusTypeSchema,
  getAllRepairStatusTypesSchema,
  getRepairStatusSelectSchema,
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
    .input(getAllRepairStatusTypesSchema)
    .query(async ({ input }) => {
      const allRepairStatusTypes = getAllRepairStatusTypes(input);

      return allRepairStatusTypes;
    }),
  countAll: organizationProcedure
    .input(countRepairStatusTypesSchema)
    .query(({ input }) => {
      const count = countRepairStatusTypes(input);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getRepairStatusSelectSchema)
    .query(async ({ input }) => {
      const allRepairStatusTypes = await getRepairStatusTypesSelect(input);
      return allRepairStatusTypes;
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
