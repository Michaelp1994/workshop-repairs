import * as repairPartRepository from "@repo/db/repositories/repairPart.repository";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as repairPartSchemas from "@repo/validators/repairParts.validators";
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
    const allRepairParts = repairPartRepository.getAll(input);

    return allRepairParts;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairPartRepository.getCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(repairPartSchemas.getById)
    .query(async ({ input }) => {
      const repairPart = await repairPartRepository.getById(input.id);

      if (!repairPart) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairPart not found",
        });
      }

      return repairPart;
    }),
  getAllByRepairId: organizationProcedure
    .input(repairPartSchemas.getAllByRepairId)
    .query(async ({ input }) => {
      const allRepairParts = await repairPartRepository.getAllByRepairId(
        input.id,
      );

      return allRepairParts;
    }),
  create: organizationProcedure
    .input(repairPartSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairPart = await repairPartRepository.create({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdRepairPart);

      return createdRepairPart;
    }),
  update: organizationProcedure
    .input(repairPartSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairPart = await repairPartRepository.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairPart);

      return updatedRepairPart;
    }),
  archive: organizationProcedure
    .input(repairPartSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairPart = await repairPartRepository.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairPart);

      return archivedRepairPart;
    }),
});
