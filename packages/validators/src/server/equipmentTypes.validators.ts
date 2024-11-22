import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import { equipmentTypeId } from "../isomorphic/ids.validators";

const equipmentTypeFilters = z.object({}).optional();

export const getAllEquipmentTypesSchema = dataTableSchema.extend({
  filters: equipmentTypeFilters,
});
export type GetAllEquipmentTypesInput = z.infer<
  typeof getAllEquipmentTypesSchema
>;

export const getEquipmentTypesCountSchema = dataTableCountSchema.extend({
  filters: equipmentTypeFilters,
});
export type GetEquipmentTypesCountInput = z.infer<
  typeof getEquipmentTypesCountSchema
>;

export const getEquipmentTypesSelectSchema = getSelectSchema.extend({});

export type GetEquipmentTypesSelectInput = z.infer<
  typeof getEquipmentTypesSelectSchema
>;

export const createEquipmentTypeSchema = z.object({
  name: z.string().min(3),
});

export const updateEquipmentTypeSchema = z.object({
  id: equipmentTypeId,
  name: z.string().min(3),
});

export const getEquipmentTypeByIdSchema = z.object({
  id: equipmentTypeId,
});

export const archiveEquipmentTypeSchema = z.object({
  id: equipmentTypeId,
});
