import { z } from "zod";

import {
  assetId,
  clientId,
  repairId,
  repairStatusTypeId,
  repairTypeId,
} from "./ids.validators";

export const getAllRepairsByAssetIdSchema = z.object({
  assetId,
});

export const getRepairByIdSchema = z.object({
  id: repairId,
});

export const createRepairSchema = z.object({
  fault: z.string().min(3),
  clientReference: z.string().min(3),
  typeId: repairTypeId,
  statusId: repairStatusTypeId,
  clientId,
  assetId,
});

export const updateRepairSchema = createRepairSchema
  .partial()
  .extend({ id: repairId });

export const updateRepairStatusSchema = z.object({
  id: repairId,
  statusId: repairStatusTypeId,
});

export const archiveRepairSchema = z.object({
  id: repairId,
});
