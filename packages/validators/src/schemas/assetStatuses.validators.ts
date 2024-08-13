import { z } from "zod";

import { assetStatusId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
});

export const update = z.object({
  id: assetStatusId,
  name: z.string().min(3),
});

export const getById = z.object({
  id: assetStatusId,
});

export const archive = z.object({
  id: assetStatusId,
});
