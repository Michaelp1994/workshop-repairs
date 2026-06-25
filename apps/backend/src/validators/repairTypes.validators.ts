import { z } from "zod";

import { repairTypeId } from "./ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const repairTypeFilters = z.object({}).default({});

export const getAllRepairTypesSchema = dataTableSchema.extend({
  filters: repairTypeFilters,
});
export type GetAllRepairTypesInput = z.infer<typeof getAllRepairTypesSchema>;

export const countRepairTypesSchema = dataTableCountSchema.extend({
  filters: repairTypeFilters,
});
export type CountRepairTypesInput = z.infer<typeof countRepairTypesSchema>;

export const getRepairTypesSelectSchema = getSelectSchema.extend({
  filters: repairTypeFilters,
});

export type GetRepairTypesSelectInput = z.infer<
  typeof getRepairTypesSelectSchema
>;

export const createRepairTypeSchema = z.object({
  name: z.string().min(3),
  colour: z.string(),
});

export const updateRepairTypeSchema = z.object({
  id: repairTypeId,
  name: z.string().min(3),
});

export const getRepairTypeByIdSchema = z.object({
  id: repairTypeId,
});

export const archiveRepairTypeSchema = z.object({
  id: repairTypeId,
});
