import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { manufacturerId } from "../isomorphic/ids.validators";

const manufacturerFilters = z.object({}).optional();

export const getAllManufacturersSchema = dataTableSchema.extend({
  filters: manufacturerFilters,
});
export type GetAllManufacturersInput = z.infer<
  typeof getAllManufacturersSchema
>;

export const getManufacturersCountSchema = dataTableCountSchema.extend({
  filters: manufacturerFilters,
});
export type GetManufacturersCountInput = z.infer<
  typeof getManufacturersCountSchema
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
