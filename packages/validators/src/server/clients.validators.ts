import { z } from "zod";

import { clientId } from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const clientFilters = z.object({}).optional();

export const getAllClientsSchema = dataTableSchema.extend({
  filters: clientFilters,
});
export type GetAllClientsInput = z.infer<typeof getAllClientsSchema>;

export const countClientsSchema = dataTableCountSchema.extend({
  filters: clientFilters,
});
export type CountClientsInput = z.infer<typeof countClientsSchema>;

export const getClientsSelectSchema = getSelectSchema.extend({});

export type GetClientSelectInput = z.infer<typeof getClientsSelectSchema>;

export const createClientSchema = z.object({
  name: z.string().min(2),
});

export const updateClientSchema = z.object({
  id: clientId,
  name: z.string().min(2),
});

export const getClientByIdSchema = z.object({
  id: clientId,
});

export const archiveClientSchema = z.object({
  id: clientId,
});
