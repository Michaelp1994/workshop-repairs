import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { partId, repairId, repairPartId } from "../isomorphic/ids.validators";

const repairPartFilters = z.object({}).optional();

export const getAllRepairPartsSchema = dataTableSchema.extend({
  filters: repairPartFilters,
});
export type GetAllRepairPartsInput = z.infer<typeof getAllRepairPartsSchema>;

export const getRepairPartsCountSchema = dataTableCountSchema.extend({
  filters: repairPartFilters,
});
export type GetRepairPartsCountInput = z.infer<
  typeof getRepairPartsCountSchema
>;

export const getAllRepairPartsByRepairIdSchema = z.object({
  id: repairId,
});

export const getRepairPartByIdSchema = z.object({
  id: repairPartId,
});

export const createRepairPartSchema = z.object({
  quantity: z.number(),
  installed: z.boolean(),
  repairId,
  partId,
});

export const updateRepairPartSchema = z.object({
  id: repairPartId,
  quantity: z.number(),
  installed: z.boolean(),
  partId,
});

export const archiveRepairPartSchema = z.object({
  id: repairPartId,
});
