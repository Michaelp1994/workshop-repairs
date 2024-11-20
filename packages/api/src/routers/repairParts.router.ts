import {
  archiveRepairPart,
  createRepairPart,
  getAllRepairParts,
  getAllRepairPartsByRepairId,
  getRepairPartById,
  getRepairPartsCount,
  updateRepairPart,
} from "@repo/db/repositories/repairPart.repository";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveRepairPartSchema,
  createRepairPartSchema,
  getAllRepairPartsByRepairIdSchema,
  getRepairPartByIdSchema,
  updateRepairPartSchema,
} from "@repo/validators/repairParts.validators";
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
    const allRepairParts = getAllRepairParts(input);

    return allRepairParts;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = getRepairPartsCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(getRepairPartByIdSchema)
    .query(async ({ input }) => {
      const repairPart = await getRepairPartById(input.id);

      if (!repairPart) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairPart not found",
        });
      }

      return repairPart;
    }),
  getAllByRepairId: organizationProcedure
    .input(getAllRepairPartsByRepairIdSchema)
    .query(async ({ input }) => {
      const allRepairParts = await getAllRepairPartsByRepairId(input.id);

      return allRepairParts;
    }),
  create: organizationProcedure
    .input(createRepairPartSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairPart = await createRepairPart({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdRepairPart);

      return createdRepairPart;
    }),
  update: organizationProcedure
    .input(updateRepairPartSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairPart = await updateRepairPart({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedRepairPart);

      return updatedRepairPart;
    }),
  archive: organizationProcedure
    .input(archiveRepairPartSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairPart = await archiveRepairPart({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairPart);

      return archivedRepairPart;
    }),
});
