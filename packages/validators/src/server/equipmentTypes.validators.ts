import { z } from "zod";

import { equipmentTypeId } from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const equipmentTypeFilters = z.object({}).optional();

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
