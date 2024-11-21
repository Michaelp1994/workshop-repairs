import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { locationId } from "../isomorphic/ids.validators";

const locationFilters = z.object({}).optional();

export const getAllLocationsSchema = dataTableSchema.extend({
  filters: locationFilters,
});
export type GetAllLocationsInput = z.infer<typeof getAllLocationsSchema>;

export const getLocationsCountSchema = dataTableCountSchema.extend({
  filters: locationFilters,
});
export type GetLocationsCountInput = z.infer<typeof getLocationsCountSchema>;

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
