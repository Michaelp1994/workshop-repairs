import { z } from "zod";
import { partId } from "./ids.validators";

const partColumns = z.enum(["name", "partNumber", "createdAt", "updatedAt"]);

export type PartColumns = z.infer<typeof partColumns>;

const partFilters = z.enum(["model_id"]);

export type PartFilters = z.infer<typeof partFilters>;

const partSchemas = {
  create: z.object({
    name: z.string().min(3),
    partNumber: z.string().min(3),
  }),
  update: z.object({
    id: partId,
    name: z.string().min(3),
    partNumber: z.string().min(3),
  }),

  getById: z.object({
    id: partId,
  }),
  delete: z.object({
    id: partId,
  }),
};

export default partSchemas;
