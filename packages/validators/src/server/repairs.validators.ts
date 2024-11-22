import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import {
  assetId,
  clientId,
  repairId,
  repairStatusTypeId,
  repairTypeId,
} from "../isomorphic/ids.validators";

const repairFilters = z
  .object({
    clientId: clientId.optional(),
    assetId: assetId.optional(),
  })
  .optional();

export const getAllRepairsSchema = dataTableSchema.extend({
  filters: repairFilters,
});
export type GetAllRepairsInput = z.infer<typeof getAllRepairsSchema>;

export const getRepairsCountSchema = dataTableCountSchema.extend({
  filters: repairFilters,
});
export type GetRepairsCountInput = z.infer<typeof getRepairsCountSchema>;

export const getRepairsSelectSchema = getSelectSchema.extend({});
export type GetRepairsSelectInput = z.infer<typeof getRepairsSelectSchema>;

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
