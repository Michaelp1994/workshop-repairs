import { z } from "zod";

import {
  assetId,
  assetStatusId,
  locationId,
  modelId,
  repairId,
} from "./ids.validators";

export const getById = z.object({
  id: assetId,
});

export const getByRepairId = z.object({
  id: repairId,
});

export const create = z.object({
  assetNumber: z.string().min(3),
  serialNumber: z.string().min(3),
  modelId,
  locationId,
});

export const update = z.object({
  id: assetId,
  assetNumber: z.string().min(3),
  serialNumber: z.string().min(3),
  statusId: assetStatusId,
  modelId,
  locationId,
});

export const archive = z.object({
  id: assetId,
});
