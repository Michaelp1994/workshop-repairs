import { z } from "zod";

import {
  assetId,
  assetStatusId,
  clientId,
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
  clientId,
});

export const update = z.object({
  id: assetId,
  assetNumber: z.string().min(3),
  serialNumber: z.string().min(3),
  statusId: assetStatusId,
  modelId,
  locationId,
  clientId,
});

export const archive = z.object({
  id: assetId,
});
