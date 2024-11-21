import {
  archiveRepair,
  createRepair,
  getAllRepairs,
  getRepairById,
  getRepairsCount,
  getRepairsSelect,
  updateRepair,
} from "@repo/db/repositories/repair.repository";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveRepairSchema,
  createRepairSchema,
  getRepairByIdSchema,
  updateRepairSchema,
} from "@repo/validators/server/repairs.validators";
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
    .query(async ({ ctx, input }) => {
      const allRepairs = await getAllRepairs(input, ctx.session.organizationId);
      return allRepairs;
    }),

  getCount: organizationProcedure
    .input(dataTableCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await getRepairsCount(input, ctx.session.organizationId);
      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't count repairs",
        });
      }
      return count;
    }),

  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairs = await getRepairsSelect(input);
      return allRepairs;
    }),

  getById: organizationProcedure
    .input(getRepairByIdSchema)
    .query(async ({ input }) => {
      const repair = await getRepairById(input.id);

      if (!repair) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return repair;
    }),

  create: organizationProcedure
    .input(createRepairSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);

      const repair = await createRepair({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(repair);

      return repair;
    }),

  update: organizationProcedure
    .input(updateRepairSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedRepair = await updateRepair({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepair);

      return updatedRepair;
    }),

  archive: organizationProcedure
    .input(archiveRepairSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedRepair = await archiveRepair({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepair);

      return archivedRepair;
    }),
});
