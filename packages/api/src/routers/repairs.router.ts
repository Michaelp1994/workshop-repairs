import {
  archiveRepair,
  createRepair,
  getAllRepairs,
  getRepairsById,
  getRepairsCount,
  getRepairsSelect,
  updateRepair,
} from "@repo/db/repositories/repair.repository";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as repairSchemas from "@repo/validators/repairs.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { sanitizeUpdateInput } from "../helpers/sanitizeUpdateInput";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allRepairs = await getAllRepairs(input, ctx.session.organizationId);
      return allRepairs;
    }),

  getCount: organizationProcedure
    .input(getCountSchema)
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
    .input(repairSchemas.getById)
    .query(async ({ input }) => {
      const repair = await getRepairsById(input.id);

      if (!repair) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return repair;
    }),

  create: organizationProcedure
    .input(repairSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);

      const repair = await createRepair({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(repair);

      return repair;
    }),

  update: organizationProcedure
    .input(repairSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const sanitizedInput = sanitizeUpdateInput(input);
      const updatedRepair = await updateRepair({
        ...sanitizedInput,
        ...metadata,
      });

      assertDatabaseResult(updatedRepair);

      return updatedRepair;
    }),

  archive: organizationProcedure
    .input(repairSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepair = await archiveRepair({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepair);

      return archivedRepair;
    }),
});
