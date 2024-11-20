import * as repairTypeRepository from "@repo/db/repositories/repairType.repository";
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
    const allRepairTypes = repairTypeRepository.getAll(input);
    return allRepairTypes;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairTypeRepository.getCount(input);
    return count;
  }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairTypes = await repairTypeRepository.getSelect(input);
      return allRepairTypes;
    }),
  getById: organizationProcedure
    .input(repairTypeSchemas.getById)
    .query(async ({ input }) => {
      const repairType = await repairTypeRepository.getById(input.id);

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
      const createdRepairType = await repairTypeRepository.create({
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
      const updatedRepairType = await repairTypeRepository.update({
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

      const archivedRepairType = await repairTypeRepository.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairType);

      return archivedRepairType;
    }),
});
