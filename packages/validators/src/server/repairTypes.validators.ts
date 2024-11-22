import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { repairTypeId } from "../isomorphic/ids.validators";

const repairTypeFilters = z.object({}).optional();

export const getAllRepairTypesSchema = dataTableSchema.extend({
  filters: repairTypeFilters,
});
export type GetAllRepairTypesInput = z.infer<typeof getAllRepairTypesSchema>;

export const getRepairTypesCountSchema = dataTableCountSchema.extend({
  filters: repairTypeFilters,
});
export type GetRepairTypesCountInput = z.infer<
  typeof getRepairTypesCountSchema
>;

export const createRepairTypeSchema = z.object({
  name: z.string().min(3),
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
