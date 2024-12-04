import { z } from "zod";

import { userId, userRoleId } from "../isomorphic/ids.validators";
import { dataTableCountSchema, dataTableSchema } from "./dataTables.validators";

const userFilters = z.object({}).optional();

export const getAllUsersSchema = dataTableSchema.extend({
  filters: userFilters,
});
export type GetAllUsersInput = z.infer<typeof getAllUsersSchema>;

export const countUsersSchema = dataTableCountSchema.extend({
  filters: userFilters,
});
export type CountUsersInput = z.infer<typeof countUsersSchema>;

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
  roleId: userRoleId,
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  id: userId,
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  roleId: userRoleId,
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
