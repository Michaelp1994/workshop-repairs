import {
  archiveAsset,
  countAssets,
  createAsset,
  getAllAssets,
  getAssetByLocalId,
  getAssetByRepairId,
  getAssetsSelect,
  updateAsset,
} from "@repo/db/repositories/asset.repository";
import {
  archiveAssetSchema,
  countAssetsSchema,
  createAssetSchema,
  getAllAssetsSchema,
  getAssestsSelectSchema,
  getAssetByRepairIdSchema,
  getAssetBySlugSchema,
  updateAssetSchema,
} from "@repo/validators/server/assets.validators";
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
    .input(getAllAssetsSchema)
    .query(async ({ ctx, input }) => {
      const clientFilter =
        input.filters?.client && splitSlug(input.filters.client);
      const allAssets = await getAllAssets(input, ctx.session.organizationId);
      return allAssets;
    }),
  countAll: organizationProcedure
    .input(countAssetsSchema)
    .query(async ({ ctx, input }) => {
      const count = await countAssets(input, ctx.session.organizationId);
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
  getBySlug: organizationProcedure
    .input(getAssetBySlugSchema)
    .query(async ({ ctx, input }) => {
      const { localId } = splitSlug(input.slug);

      const asset = await getAssetByLocalId(
        localId,
        ctx.session.organizationId,
      );

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find client",
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
