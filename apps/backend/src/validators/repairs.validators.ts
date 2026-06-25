import { z } from "zod";

import {
  assetId,
  clientId,
  repairStatusTypeId,
  repairTypeId,
} from "./ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const repairFilters = z
  .object({
    clientId: clientId.optional(),
    assetId: assetId.optional(),
  })
  .default({});

export type RepairFilters = z.infer<typeof repairFilters>;

export const getAllRepairsSchema = dataTableSchema.extend({
  filters: repairFilters,
});
export type GetAllRepairsInput = z.infer<typeof getAllRepairsSchema>;

export const countRepairsSchema = dataTableCountSchema.extend({
  filters: repairFilters,
});
export type CountRepairsInput = z.infer<typeof countRepairsSchema>;

export const getRepairsSelectSchema = getSelectSchema.extend({
  filters: repairFilters,
});
export type GetRepairsSelectInput = z.infer<typeof getRepairsSelectSchema>;

export const getAllRepairsByAssetIdSchema = z.object({
  assetId,
});

export const getRepairByIdSchema = z.object({
  id: z.string(),
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
  .extend({ id: z.string() });

export const archiveRepairSchema = z.object({
  id: z.string(),
});
