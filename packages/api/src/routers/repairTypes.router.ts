import * as repairTypesController from "@repo/db/controllers/repairTypes.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as repairTypeSchemas from "@repo/validators/repairTypes.validators";
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
    const allRepairTypes = repairTypesController.getAll(input);
    return allRepairTypes;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairTypesController.getCount(input);
    return count;
  }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairTypes = await repairTypesController.getSelect(input);
      return allRepairTypes;
    }),
  getById: organizationProcedure
    .input(repairTypeSchemas.getById)
    .query(async ({ input }) => {
      const repairType = await repairTypesController.getById(input.id);

      if (!repairType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairType not found",
        });
      }

      return repairType;
    }),
  create: organizationProcedure
    .input(repairTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairType = await repairTypesController.create({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdRepairType);

      return createdRepairType;
    }),
  update: organizationProcedure
    .input(repairTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairType = await repairTypesController.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairType);

      return updatedRepairType;
    }),
  archive: organizationProcedure
    .input(repairTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedRepairType = await repairTypesController.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairType);

      return archivedRepairType;
    }),
});
