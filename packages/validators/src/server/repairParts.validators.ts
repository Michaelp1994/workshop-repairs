import { z } from "zod";

import { partId, repairId, repairPartId } from "../isomorphic/ids.validators";
import { dataTableCountSchema, dataTableSchema } from "./dataTables.validators";

const repairPartFilters = z
  .object({
    repairId: repairId.optional(),
  })
  .optional();

export const getAllRepairPartsSchema = dataTableSchema.extend({
  filters: repairPartFilters,
});
export type GetAllRepairPartsInput = z.infer<typeof getAllRepairPartsSchema>;

export const countRepairPartsSchema = dataTableCountSchema.extend({
  filters: repairPartFilters,
});

export type CountRepairPartsInput = z.infer<typeof countRepairPartsSchema>;

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
