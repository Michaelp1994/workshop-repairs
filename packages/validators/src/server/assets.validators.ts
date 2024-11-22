import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import {
  assetId,
  assetStatusId,
  clientId,
  equipmentTypeId,
  locationId,
  manufacturerId,
  modelId,
  repairId,
} from "../isomorphic/ids.validators";

// Data Tables.

const assetFilters = z
  .object({
    modelId: modelId.optional(),
    clientId: clientId.optional(),
    locationId: locationId.optional(),
    manufacturerId: manufacturerId.optional(),
    equipmentTypeId: equipmentTypeId.optional(),
  })
  .optional();

export const getAllAssetsSchema = dataTableSchema.extend({
  filters: assetFilters,
});
export type GetAllAssetsInput = z.infer<typeof getAllAssetsSchema>;

export const getAssetsCountSchema = dataTableCountSchema.extend({
  filters: assetFilters,
});
export type GetAssetsCountInput = z.infer<typeof getAssetsCountSchema>;

export const getAssestsSelectSchema = getSelectSchema.extend({});
export type GetAssetsSelectSchema = z.infer<typeof getAssestsSelectSchema>;

export const getAssetByIdSchema = z.object({
  id: assetId,
});

export const getAssetByRepairIdSchema = z.object({
  id: repairId,
});

export const createAssetSchema = z.object({
  assetNumber: z.string(),
  serialNumber: z.string().min(3),
  statusId: assetStatusId,
  modelId,
  locationId,
  clientId,
});

export const updateAssetSchema = createAssetSchema
  .partial()
  .extend({ id: assetId });

export const archiveAssetSchema = z.object({
  id: assetId,
});
