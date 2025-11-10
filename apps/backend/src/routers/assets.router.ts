import {
  archiveAssetService,
  countAssetsService,
  createAssetService,
  getAllAssetsService,
  getAssetService,
  getAssetsSelectService,
  updateAssetService,
} from "@repo/services/services/asset.service";
import {
  archiveAssetSchema,
  type AssetFilters,
  countAssetsSchema,
  createAssetSchema,
  getAllAssetsSchema,
  getAssestsSelectSchema,
  getAssetBySlugSchema,
  updateAssetSchema,
} from "@repo/validators/server/assets.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

function assetFilters(filters: AssetFilters) {
  if (!filters) {
    return {};
  }
  return {
    model: filters.model ? splitSlug(filters.model).localId : undefined,
    client: filters.client ? splitSlug(filters.client).localId : undefined,
    location: filters.location
      ? splitSlug(filters.location).localId
      : undefined,
    manufacturer: filters.manufacturer
      ? splitSlug(filters.manufacturer).localId
      : undefined,
    equipmentType: filters.equipmentType
      ? splitSlug(filters.equipmentType).localId
      : undefined,
  };
}

export default router({
  getAll: organizationProcedure
    .input(getAllAssetsSchema)
    .query(async ({ ctx, input: { filters, ...input } }) => {
      const newFilters = assetFilters(filters);

      const values = {
        ...input,
        filters: newFilters,
      };

      const allAssets = await getAllAssetsService(values, ctx.session);

      return allAssets;
    }),
  countAll: organizationProcedure
    .input(countAssetsSchema)
    .query(async ({ ctx, input: { filters, ...input } }) => {
      const newFilters = assetFilters(filters);
      const values = {
        ...input,
        filters: newFilters,
      };
      const count = await countAssetsService(values, ctx.session);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getAssestsSelectSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await getAssetsSelectService(input, ctx.session);
      return allAssets;
    }),
  getBySlug: organizationProcedure
    .input(getAssetBySlugSchema)
    .query(async ({ ctx, input }) => {
      const { localId } = splitSlug(input.slug);

      const asset = await getAssetService(localId, ctx.session);

      return asset;
    }),
  create: organizationProcedure
    .input(createAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const asset = await createAssetService(input, ctx.session);
      return asset;
    }),
  update: organizationProcedure
    .input(updateAssetSchema)
    .mutation(async ({ input: { slug, ...values }, ctx }) => {
      const { localId } = splitSlug(slug);

      const updatedAsset = await updateAssetService(
        values,
        localId,
        ctx.session,
      );

      return updatedAsset;
    }),
  archive: organizationProcedure
    .input(archiveAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const archivedAsset = await archiveAssetService(localId, ctx.session);

      return archivedAsset;
    }),
});
