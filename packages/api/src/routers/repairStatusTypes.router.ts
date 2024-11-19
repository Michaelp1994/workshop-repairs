import * as repairStatusTypesController from "@repo/db/controllers/repairStatusTypes.controller";
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
    const allRepairStatusTypes = repairStatusTypesController.getAll(input);

    return allRepairStatusTypes;
  }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairStatusTypes =
        await repairStatusTypesController.getSelect(input);
      return allRepairStatusTypes;
    }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairStatusTypesController.getCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(repairStatusTypeSchemas.getById)
    .query(async ({ input }) => {
      const repairStatusType = await repairStatusTypesController.getById(
        input.id,
      );

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
      const createdRepairStatusType = await repairStatusTypesController.create({
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
      const updatedRepairStatusType = await repairStatusTypesController.update({
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
      const archivedRepairStatusType =
        await repairStatusTypesController.archive({ ...input, ...metadata });

      assertDatabaseResult(archivedRepairStatusType);

      return archivedRepairStatusType;
    }),
});
