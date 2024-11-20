import { z } from "zod";

import { userId, userTypeId } from "./ids.validators";

export const registerUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const createUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  typeId: userTypeId,
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  id: userId,
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  typeId: userTypeId,
  password: z.string().min(8),
});

export const updateCurrentUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
});

export const getCurrentUserSchema = z.object({});

export const getUserByIdSchema = z.object({
  id: userId,
});

export const archiveUserSchema = z.object({
  id: userId,
});
