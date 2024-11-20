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
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as repairStatusTypeSchemas from "@repo/validators/repairStatusTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairStatusTypes = getAllRepairStatusTypes(input);

    return allRepairStatusTypes;
  }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairStatusTypes = await getRepairStatusTypesSelect(input);
      return allRepairStatusTypes;
    }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = getRepairStatusTypesCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(repairStatusTypeSchemas.getById)
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
    .input(repairStatusTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairStatusType = await createRepairStatus({
        ...input,
        ...metadata,
      });
      assertDatabaseResult(createdRepairStatusType);

      return createdRepairStatusType;
    }),
  update: organizationProcedure
    .input(repairStatusTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairStatusType = await updateRepairStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairStatusType);

      return updatedRepairStatusType;
    }),
  archive: organizationProcedure
    .input(repairStatusTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairStatusType = await archiveRepairStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairStatusType);

      return archivedRepairStatusType;
    }),
});
