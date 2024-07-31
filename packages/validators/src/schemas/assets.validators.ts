import { z } from "zod";
import {
  assetId,
  assetStatusId,
  locationId,
  modelId,
  repairId,
} from "./ids.validators";

export const getAssetByIdSchema = z.object({
  id: assetId,
});

export const getAssetByRepairIdSchema = z.object({
  id: repairId,
});

export const createAssetSchema = z.object({
  assetNumber: z.string().min(3),
  serialNumber: z.string().min(3),
  modelId,
  locationId,
});

export const deleteAssetSchema = z.object({
  id: assetId,
});

export const updateAssetSchema = z.object({
  id: assetId,
  assetNumber: z.string().min(3),
  serialNumber: z.string().min(3),
  statusId: assetStatusId,
  modelId,
  locationId,
});
