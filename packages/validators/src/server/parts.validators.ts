import { z } from "zod";

import { partId } from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const partFilters = z.object({}).optional();

export const getAllPartsSchema = dataTableSchema.extend({
  filters: partFilters,
});
export type GetAllPartsInput = z.infer<typeof getAllPartsSchema>;

export const countPartsSchema = dataTableCountSchema.extend({
  filters: partFilters,
});
export type CountPartsInput = z.infer<typeof countPartsSchema>;

export const getPartsSelectSchema = getSelectSchema.extend({});
export type GetPartsSelectInput = z.infer<typeof getPartsSelectSchema>;

export const createPartSchema = z.object({
  name: z.string().min(3),
  partNumber: z.string().min(3),
  description: z.string(),
});

export const updatePartSchema = z.object({
  id: partId,
  name: z.string().min(3),
  partNumber: z.string().min(3),
  description: z.string(),
});

export const getPartByIdSchema = z.object({
  id: partId,
});

export const archivePartSchema = z.object({
  id: partId,
});
