import { z } from "zod";

import { clientId } from "./ids.validators";

const clientColumns = z.enum(["name", "createdAt", "updatedAt"]);

export type ClientColumns = z.infer<typeof clientColumns>;

const clientSchemas = {
  create: z.object({
    name: z.string().min(2),
  }),
  update: z.object({
    id: clientId,
    name: z.string().min(2),
  }),
  getById: z.object({
    id: clientId,
  }),
  archive: z.object({
    id: clientId,
  }),
};

export default clientSchemas;
