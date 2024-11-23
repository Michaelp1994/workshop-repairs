import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import { userTypeId } from "../isomorphic/ids.validators";

const userTypeFilters = z.object({}).optional();

export const getAllUserTypesSchema = dataTableSchema.extend({
  filters: userTypeFilters,
});
export type GetAllUserTypesInput = z.infer<typeof getAllUserTypesSchema>;

export const countUserTypesSchema = dataTableCountSchema.extend({
  filters: userTypeFilters,
});
export type CountUserTypesInput = z.infer<typeof countUserTypesSchema>;

export const getUserTypeSelectSchema = getSelectSchema.extend({});
export type GetUserTypeSelectInput = z.infer<typeof getUserTypeSelectSchema>;

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
