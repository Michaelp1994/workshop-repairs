import { z } from "zod";

import { partId } from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const partFilters = z.object({}).default({});

export const getAllPartsSchema = dataTableSchema.extend({
  filters: partFilters,
});
export type GetAllPartsInput = z.infer<typeof getAllPartsSchema>;

export const countPartsSchema = dataTableCountSchema.extend({
  filters: partFilters,
});
export type CountPartsInput = z.infer<typeof countPartsSchema>;

export const getPartsSelectSchema = getSelectSchema.extend({
  filters: partFilters,
});
export type GetPartsSelectInput = z.infer<typeof getPartsSelectSchema>;

export const createPartSchema = z.object({
  name: z.string().min(3),
  partNumber: z.string().min(3),
  description: z.string(),
});

export const updatePartSchema = createPartSchema.partial().extend({
  id: partId,
});

export const getPartByIdSchema = z.object({
  id: partId,
});

export const archivePartSchema = z.object({
  id: partId,
});
