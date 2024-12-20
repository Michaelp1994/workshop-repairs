import { z } from "zod";

import { locationId } from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const locationFilters = z.object({}).optional();

export const getAllLocationsSchema = dataTableSchema.extend({
  filters: locationFilters,
});
export type GetAllLocationsInput = z.infer<typeof getAllLocationsSchema>;

export const countLocationsSchema = dataTableCountSchema.extend({
  filters: locationFilters,
});
export type CountLocationsInput = z.infer<typeof countLocationsSchema>;

export const getLocationsSelectSchema = getSelectSchema.extend({});

export type GetLocationsSelectInput = z.infer<typeof getLocationsSelectSchema>;

export const createLocationSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
});

export const updateLocationSchema = z.object({
  id: locationId,
  name: z.string().min(3),
  address: z.string().min(3),
});

export const getLocationByIdSchema = z.object({
  id: locationId,
});

export const archiveLocationSchema = z.object({
  id: locationId,
});
