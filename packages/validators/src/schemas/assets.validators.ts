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

export const getAll = getAllSchema.extend({});
export const getCount = getCountSchema.extend({});
export const getSelect = getSelectSchema.extend({});

export const getById = z.object({
  id: assetId,
});

export const getByRepairId = z.object({
  id: repairId,
});

export const create = z.object({
  assetNumber: z.string(),
  serialNumber: z.string().min(3),
  statusId: assetStatusId,
  modelId,
  locationId,
  clientId,
});

export const update = create.partial().extend({ id: assetId });

export const archive = z.object({
  id: assetId,
});
