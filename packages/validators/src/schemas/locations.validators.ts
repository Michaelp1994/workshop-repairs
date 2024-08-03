import { z } from "zod";

import { locationId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
});

export const update = z.object({
  id: locationId,
  name: z.string().min(3),
  address: z.string().min(3),
});

export const getById = z.object({
  id: locationId,
});

export const archive = z.object({
  id: locationId,
});
