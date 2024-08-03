import { z } from "zod";

import { clientId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(2),
});

export const update = z.object({
  id: clientId,
  name: z.string().min(2),
});

export const getById = z.object({
  id: clientId,
});

export const archive = z.object({
  id: clientId,
});
