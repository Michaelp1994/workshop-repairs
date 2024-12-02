import { z } from "zod";

import { manufacturerId } from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const manufacturerFilters = z.object({}).optional();

export const getAllManufacturersSchema = dataTableSchema.extend({
  filters: manufacturerFilters,
});
export type GetAllManufacturersInput = z.infer<
  typeof getAllManufacturersSchema
>;

export const countManufacturersSchema = dataTableCountSchema.extend({
  filters: manufacturerFilters,
});
export type CountManufacturersInput = z.infer<typeof countManufacturersSchema>;

export const getManufacturersSelectSchema = getSelectSchema.extend({});

export type GetManufacturersSelectInput = z.infer<
  typeof getManufacturersSelectSchema
>;

export const createManufacturerSchema = z.object({
  name: z.string().min(3),
});

export const updateManufacturerSchema = z.object({
  id: manufacturerId,
  name: z.string().min(3),
});

export const getManufacturerByIdSchema = z.object({
  id: manufacturerId,
});

export const archiveManufacturerSchema = z.object({
  id: manufacturerId,
});
