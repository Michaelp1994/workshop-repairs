import { z } from "zod";

import { locationId } from "../isomorphic/ids.validators";

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
