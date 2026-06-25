import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import AssetService from "../services/asset.service";
import { router } from "../trpc";
import {
  archiveAssetSchema,
  type AssetFilters,
  countAssetsSchema,
  createAssetSchema,
  getAllAssetsSchema,
  getAssestsSelectSchema,
  getAssetByIdSchema,
  updateAssetSchema,
} from "../validators/assets.validators";

function assetFilters(filters: AssetFilters) {
  return {
    modelId: filters.modelId ? splitSlug(filters.modelId).localId : undefined,
    clientId: filters.clientId
      ? splitSlug(filters.clientId).localId
      : undefined,
    locationId: filters.locationId
      ? splitSlug(filters.locationId).localId
      : undefined,
    manufacturerId: filters.manufacturerId
      ? splitSlug(filters.manufacturerId).localId
      : undefined,
    equipmentTypeId: filters.equipmentTypeId
      ? splitSlug(filters.equipmentTypeId).localId
      : undefined,
  };
}
export default function assetRouter(assetService: AssetService) {
  return router({
    getAll: organizationProcedure
      .input(getAllAssetsSchema)
      .query(async ({ ctx, input: { filters, ...input } }) => {
        const newFilters = assetFilters(filters);

        const values = {
          ...input,
          filters: newFilters,
        };

        const allAssets = await assetService.getAllAssets(values, ctx.session);

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
        const count = await assetService.countAssets(values, ctx.session);
        return count;
      }),
    getSelect: organizationProcedure
      .input(getAssestsSelectSchema)
      .query(async ({ ctx, input: { filters, ...input } }) => {
        const newFilters = assetFilters(filters);
        const values = {
          ...input,
          filters: newFilters,
        };
        const allAssets = await assetService.getAssetsSelect(
          values,
          ctx.session,
        );
        return allAssets;
      }),
    getById: organizationProcedure
      .input(getAssetByIdSchema)
      .query(async ({ ctx, input }) => {
        const { localId } = splitSlug(input.id);

        const asset = await assetService.getAsset(localId, ctx.session);

        return asset;
      }),
    create: organizationProcedure
      .input(createAssetSchema)
      .mutation(async ({ input, ctx }) => {
        const { modelId, clientId, locationId, ...rest } = input;
        const asset = await assetService.createAsset(
          {
            ...rest,
            modelLocalId: splitSlug(modelId).localId,
            clientLocalId: splitSlug(clientId).localId,
            locationLocalId: splitSlug(locationId).localId,
          },
          ctx.session,
        );
        return asset;
      }),
    update: organizationProcedure
      .input(updateAssetSchema)
      .mutation(
        async ({
          input: { id, modelId, clientId, locationId, ...values },
          ctx,
        }) => {
          const { localId } = splitSlug(id);

          const updatedAsset = await assetService.updateAsset(
            {
              ...values,
              modelLocalId: modelId ? splitSlug(modelId).localId : undefined,
              clientLocalId: clientId ? splitSlug(clientId).localId : undefined,
              locationLocalId: locationId
                ? splitSlug(locationId).localId
                : undefined,
            },
            localId,
            ctx.session,
          );

          return updatedAsset;
        },
      ),
    archive: organizationProcedure
      .input(archiveAssetSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);

        const archivedAsset = await assetService.archiveAsset(
          localId,
          ctx.session,
        );

        return archivedAsset;
      }),
  });
}
