import { z } from "zod";

import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "./dataTables.validators";
import {
  assetId,
  assetStatusId,
  clientId,
  locationId,
  modelId,
  repairId,
} from "./ids.validators";

// Data Tables.

export const getAllAssetsSchema = getAllSchema.extend({});
export const getAssetsCountSchema = getCountSchema.extend({});
export const getAssestsSelectSchema = getSelectSchema.extend({});

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
