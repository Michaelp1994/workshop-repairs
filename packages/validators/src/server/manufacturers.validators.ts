import { z } from "zod";

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
    slug: z.string(),
  });

export const getManufacturerBySlugSchema = z.object({
  slug: z.string(),
});

export const archiveManufacturerSchema = z.object({
  slug: z.string(),
});
