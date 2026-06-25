import { z } from "zod";

import { manufacturerId } from "./ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const manufacturerFilters = z.object({}).default({});

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

export const getManufacturersSelectSchema = getSelectSchema.extend({
  filters: manufacturerFilters,
});

export type GetManufacturersSelectInput = z.infer<
  typeof getManufacturersSelectSchema
>;

export const createManufacturerSchema = z.object({
  name: z.string().min(3),
});

export const updateManufacturerSchema = createManufacturerSchema
  .partial()
  .extend({
    id: manufacturerId,
  });

export const getManufacturerByIdSchema = z.object({
  id: manufacturerId,
});

export const archiveManufacturerSchema = z.object({
  id: manufacturerId,
});
