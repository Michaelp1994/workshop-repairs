import {
  archiveRepairPart,
  countRepairParts,
  createRepairPart,
  getAllRepairParts,
  getRepairPartById,
  updateRepairPart,
} from "@repo/db/repositories/repairPart.repository";
import {
  archiveRepairPartSchema,
  countRepairPartsSchema,
  createRepairPartSchema,
  getAllRepairPartsSchema,
  getRepairPartByIdSchema,
  updateRepairPartSchema,
} from "@repo/validators/server/repairParts.validators";
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
    .input(getAllRepairPartsSchema)
    .query(async ({ input }) => {
      const allRepairParts = getAllRepairParts(input);

      return allRepairParts;
    }),
  countAll: organizationProcedure
    .input(countRepairPartsSchema)
    .query(({ input }) => {
      const count = countRepairParts(input);
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
  create: organizationProcedure
    .input(createRepairPartSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
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
      const metadata = createUpdateMetadata(ctx.session);
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
      const metadata = createArchiveMetadata(ctx.session);
      const archivedRepairPart = await archiveRepairPart({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedRepairPart);

      return archivedRepairPart;
    }),
});
