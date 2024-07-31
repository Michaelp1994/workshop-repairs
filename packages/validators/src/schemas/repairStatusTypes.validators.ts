import { z } from "zod";

import { repairStatusTypeId } from "./ids.validators";

const repairStatusTypeColumns = z.enum(["name", "createdAt", "updatedAt"]);

export type RepairStatusTypeColumns = z.infer<typeof repairStatusTypeColumns>;

const repairStatusTypeSchemas = {
  create: z.object({
    name: z.string().min(3),
    colour: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
  }),
  update: z.object({
    id: repairStatusTypeId,
    name: z.string().min(3),
  }),
  getById: z.object({
    id: repairStatusTypeId,
  }),
  delete: z.object({
    id: repairStatusTypeId,
  }),
};

export default repairStatusTypeSchemas;
