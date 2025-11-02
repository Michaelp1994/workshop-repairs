import {
  archiveRepair,
  countRepairs,
  createRepair,
  getAllRepairs,
  getRepairByLocalId,
  getRepairsSelect,
  updateRepair,
} from "@repo/db/repositories/repair.repository";
import {
  archiveRepairSchema,
  countRepairsSchema,
  createRepairSchema,
  getAllRepairsSchema,
  getRepairBySlugSchema,
  getRepairsSelectSchema,
  updateRepairSchema,
} from "@repo/validators/server/repairs.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { splitSlug } from "../helpers/splitUrlSlug";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllRepairsSchema)
    .query(async ({ ctx, input }) => {
      const allRepairs = await getAllRepairs(input, ctx.session.organizationId);
      return allRepairs;
    }),

  countAll: organizationProcedure
    .input(countRepairsSchema)
    .query(async ({ ctx, input }) => {
      const count = await countRepairs(input, ctx.session.organizationId);
      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't count repairs",
        });
      }
      return count;
    }),

  getSelect: organizationProcedure
    .input(getRepairsSelectSchema)
    .query(async ({ input }) => {
      const allRepairs = await getRepairsSelect(input);
      return allRepairs;
    }),

  getBySlug: organizationProcedure
    .input(getRepairBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);
      const repair = await getRepairByLocalId(
        localId,
        ctx.session.organizationId,
      );

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
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createUpdateMetadata(ctx.session);
      const updatedRepair = await updateRepair(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(updatedRepair);

      return updatedRepair;
    }),

  archive: organizationProcedure
    .input(archiveRepairSchema)
    .mutation(async ({ input, ctx }) => {
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createArchiveMetadata(ctx.session);
      const archivedRepair = await archiveRepair(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(archivedRepair);

      return archivedRepair;
    }),
});
