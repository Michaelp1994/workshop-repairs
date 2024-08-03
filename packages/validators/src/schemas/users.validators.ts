import { z } from "zod";

import { userId, userTypeId } from "./ids.validators";

export const register = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const create = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  typeId: userTypeId,
  password: z.string().min(8),
});

export const update = z.object({
  id: userId,
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  typeId: userTypeId,
  password: z.string().min(8),
});

export const updateCurrent = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
});

export const getCurrent = z.object({});

export const getById = z.object({
  id: userId,
});

export const archive = z.object({
  id: userId,
});
