import {
  archiveAsset,
  createAsset,
  getAllAssets,
  getAssetById,
  getAssetByRepairId,
  getAssetsCount,
  getAssetsSelect,
  updateAsset,
} from "@repo/db/repositories/asset.repository";
import {
  archiveAssetSchema,
  createAssetSchema,
  getAllAssetsSchema,
  getAssestsSelectSchema,
  getAssetByIdSchema,
  getAssetByRepairIdSchema,
  getAssetsCountSchema,
  updateAssetSchema,
} from "@repo/validators/server/assets.validators";
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
    .input(getAllAssetsSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await getAllAssets(input, ctx.session.organizationId);
      return allAssets;
    }),
  getCount: organizationProcedure
    .input(getAssetsCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await getAssetsCount(input, ctx.session.organizationId);
      assertDatabaseResult(count);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getAssestsSelectSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await getAssetsSelect(
        input,
        ctx.session.organizationId,
      );
      return allAssets;
    }),
  getById: organizationProcedure
    .input(getAssetByIdSchema)
    .query(async ({ input, ctx }) => {
      const asset = await getAssetById(input.id, ctx.session.organizationId);

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "asset not found",
        });
      }

      return asset;
    }),
  getByRepairId: organizationProcedure
    .input(getAssetByRepairIdSchema)
    .query(async ({ input, ctx }) => {
      const asset = await getAssetByRepairId(
        input.id,
        ctx.session.organizationId,
      );

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find asset for repair",
        });
      }

      return asset;
    }),
  create: organizationProcedure
    .input(createAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdAsset = await createAsset({
        ...input,
        ...metadata,
        organizationId: ctx.session.organizationId,
        statusId: 1,
      });

      assertDatabaseResult(createdAsset);
      return createdAsset;
    }),
  update: organizationProcedure
    .input(updateAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedAsset = await updateAsset(
        { ...input, ...metadata },
        ctx.session.organizationId,
      );
      assertDatabaseResult(updatedAsset);

      return updatedAsset;
    }),
  archive: organizationProcedure
    .input(archiveAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);

      const archivedAsset = await archiveAsset(
        { ...input, ...metadata },
        ctx.session.organizationId,
      );
      assertDatabaseResult(archivedAsset);

      return archivedAsset;
    }),
});
