import { z } from "zod";

import { userTypeId } from "./ids.validators";

export const createUserTypeSchema = z.object({
  name: z.string().min(3),
});

export const updateUserTypeSchema = z.object({
  id: userTypeId,
  name: z.string().min(3),
});

export const getUserTypeByIdSchema = z.object({
  id: userTypeId,
});

export const archiveUserTypeSchema = z.object({
  id: userTypeId,
});
