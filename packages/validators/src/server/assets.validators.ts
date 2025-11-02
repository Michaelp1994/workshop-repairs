import { z } from "zod";

import {
  assetStatusId,
  clientId,
  equipmentTypeId,
  locationId,
  manufacturerId,
  modelId,
  repairId,
} from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

// Data Tables.

const assetFilters = z
  .object({
    modelId: modelId.optional(),
    client: z.string().optional(),
    locationId: locationId.optional(),
    manufacturerId: manufacturerId.optional(),
    equipmentTypeId: equipmentTypeId.optional(),
  })
  .optional();

export const getAllAssetsSchema = dataTableSchema.extend({
  filters: assetFilters,
});
export type GetAllAssetsInput = z.infer<typeof getAllAssetsSchema>;

export const countAssetsSchema = dataTableCountSchema.extend({
  filters: assetFilters,
});
export type CountAssetsInput = z.infer<typeof countAssetsSchema>;

export const getAssestsSelectSchema = getSelectSchema.extend({});
export type GetAssetsSelectSchema = z.infer<typeof getAssestsSelectSchema>;

export const getAssetBySlugSchema = z.object({
  slug: z.string(),
});

export const getAssetByRepairIdSchema = z.object({
  id: repairId,
});

export const createAssetSchema = z.object({
  assetNumber: z.string(),
  softwareVersion: z.string(),
  serialNumber: z.string().min(3),
  statusId: assetStatusId,
  modelId,
  locationId,
  clientId,
});

export const updateAssetSchema = createAssetSchema
  .partial()
  .extend({ slug: z.string() });

export const archiveAssetSchema = z.object({
  slug: z.string(),
});
