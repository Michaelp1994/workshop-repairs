import { z } from "zod";

import {
  assetId,
  clientId,
  repairId,
  repairStatusTypeId,
  repairTypeId,
} from "./ids.validators";

export const getAllByAssetId = z.object({
  assetId,
});

export const getById = z.object({
  id: repairId,
});

export const create = z.object({
  fault: z.string().min(3),
  clientReference: z.string().min(3),
  typeId: repairTypeId,
  statusId: repairStatusTypeId,
  clientId,
  assetId,
});

export const update = create.partial().extend({ id: repairId });

export const updateStatus = z.object({
  id: repairId,
  statusId: repairStatusTypeId,
});

export const archive = z.object({
  id: repairId,
});
