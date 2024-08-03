import { z } from "zod";

import { userTypeId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
});

export const update = z.object({
  id: userTypeId,
  name: z.string().min(3),
});

export const getById = z.object({
  id: userTypeId,
});

export const archive = z.object({
  id: userTypeId,
});
