import { z } from "zod";

import {
  dataTableSchema,
  dataTableCountSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import {
  assetId,
  assetStatusId,
  clientId,
  locationId,
  modelId,
  repairId,
} from "../isomorphic/ids.validators";

// Data Tables.

export const getAllAssetsSchema = dataTableSchema.extend({});
export const getAssetsCountSchema = dataTableCountSchema.extend({});
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
