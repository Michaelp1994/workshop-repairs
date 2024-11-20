import { z } from "zod";

import { manufacturerId } from "../isomorphic/ids.validators";

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
