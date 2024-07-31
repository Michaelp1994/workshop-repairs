import { z } from "zod";

import { manufacturerId } from "./ids.validators";

const manufacturerColumns = z.enum(["name", "createdAt", "updatedAt"]);

export type ManufacturerColumns = z.infer<typeof manufacturerColumns>;

const manufacturerSchemas = {
  create: z.object({
    name: z.string().min(3),
  }),
  update: z.object({
    id: manufacturerId,
    name: z.string().min(3),
  }),

  getById: z.object({
    id: manufacturerId,
  }),
  delete: z.object({
    id: manufacturerId,
  }),
};

export default manufacturerSchemas;
