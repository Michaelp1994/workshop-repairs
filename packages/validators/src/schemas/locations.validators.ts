import { z } from "zod";

import { locationId } from "./ids.validators";

const locationColumns = z.enum(["name", "address", "createdAt", "updatedAt"]);

export type LocationColumns = z.infer<typeof locationColumns>;

const locationSchemas = {
  create: z.object({
    name: z.string().min(3),
    address: z.string().min(3),
  }),
  update: z.object({
    id: locationId,
    name: z.string().min(3),
    address: z.string().min(3),
  }),

  getById: z.object({
    id: locationId,
  }),
  delete: z.object({
    id: locationId,
  }),
};

export default locationSchemas;
