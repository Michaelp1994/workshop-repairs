import { z } from "zod";

import { clientId } from "../isomorphic/ids.validators";

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
