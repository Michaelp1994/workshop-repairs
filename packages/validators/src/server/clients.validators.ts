import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import { clientId } from "../isomorphic/ids.validators";

const clientFilters = z.object({}).optional();

export const getAllClientsSchema = dataTableSchema.extend({
  filters: clientFilters,
});
export type GetAllClientsInput = z.infer<typeof getAllClientsSchema>;

export const getClientsCountSchema = dataTableCountSchema.extend({
  filters: clientFilters,
});
export type GetClientsCountInput = z.infer<typeof getClientsCountSchema>;

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
