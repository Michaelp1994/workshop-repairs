import { z } from "zod";

import { userRoleId } from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const userRoleFilters = z.object({}).optional();

export const getAllUserRolesSchema = dataTableSchema.extend({
  filters: userRoleFilters,
});
export type GetAllUserRolesInput = z.infer<typeof getAllUserRolesSchema>;

export const countUserRolesSchema = dataTableCountSchema.extend({
  filters: userRoleFilters,
});
export type CountUserRolesInput = z.infer<typeof countUserRolesSchema>;

export const getUserRoleSelectSchema = getSelectSchema.extend({});
export type GetUserRoleSelectInput = z.infer<typeof getUserRoleSelectSchema>;

export const createUserRoleSchema = z.object({
  name: z.string().min(3),
});

export const updateUserRoleSchema = z.object({
  id: userRoleId,
  name: z.string().min(3),
});

export const getUserRoleByIdSchema = z.object({
  id: userRoleId,
});

export const archiveUserRoleSchema = z.object({
  id: userRoleId,
});
