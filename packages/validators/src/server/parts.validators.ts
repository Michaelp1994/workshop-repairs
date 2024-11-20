import { z } from "zod";

import { partId } from "../isomorphic/ids.validators";

export const createPartSchema = z.object({
  name: z.string().min(3),
  partNumber: z.string().min(3),
});

export const updatePartSchema = z.object({
  id: partId,
  name: z.string().min(3),
  partNumber: z.string().min(3),
});

export const getPartByIdSchema = z.object({
  id: partId,
});

export const archivePartSchema = z.object({
  id: partId,
});
