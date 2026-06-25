import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const equipmentTypeFilters = z.object({}).default({});

export const getAllEquipmentTypesSchema = dataTableSchema.extend({
  filters: equipmentTypeFilters,
});
export type GetAllEquipmentTypesInput = z.infer<
  typeof getAllEquipmentTypesSchema
>;

export const countEquipmentTypesSchema = dataTableCountSchema.extend({
  filters: equipmentTypeFilters,
});
export type CountEquipmentTypesInput = z.infer<
  typeof countEquipmentTypesSchema
>;

export const getEquipmentTypesSelectSchema = getSelectSchema.extend({
  filters: equipmentTypeFilters,
});

export type GetEquipmentTypesSelectInput = z.infer<
  typeof getEquipmentTypesSelectSchema
>;

export const createEquipmentTypeSchema = z.object({
  name: z.string().min(3),
});

export const updateEquipmentTypeSchema = createEquipmentTypeSchema
  .partial()
  .extend({
    id: z.string(),
  });

export const getEquipmentTypeByIdSchema = z.object({
  id: z.string(),
});

export const archiveEquipmentTypeSchema = z.object({
  id: z.string(),
});
