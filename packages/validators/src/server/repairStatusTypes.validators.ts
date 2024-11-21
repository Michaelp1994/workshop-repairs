import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { repairStatusTypeId } from "../isomorphic/ids.validators";

const repairStatusTypeFilters = z.object({}).optional();

export const getAllRepairStatusTypesSchema = dataTableSchema.extend({
  filters: repairStatusTypeFilters,
});
export type GetAllRepairStatusTypesInput = z.infer<
  typeof getAllRepairStatusTypesSchema
>;

export const getRepairStatusTypesCountSchema = dataTableCountSchema.extend({
  filters: repairStatusTypeFilters,
});
export type GetRepairStatusTypesCountInput = z.infer<
  typeof getRepairStatusTypesCountSchema
>;

export const createRepairStatusTypeSchema = z.object({
  name: z.string().min(3),
  colour: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
});

export const updateRepairStatusTypeSchema = z.object({
  id: repairStatusTypeId,
  name: z.string().min(3),
});

export const getRepairStatusTypeByIdSchema = z.object({
  id: repairStatusTypeId,
});

export const archiveRepairStatusTypeSchema = z.object({
  id: repairStatusTypeId,
});
