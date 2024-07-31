import { z } from "zod";
import { userTypeId } from "./ids.validators";

const userTypeColumns = z.enum(["name", "createdAt", "updatedAt"]);

export type UserTypeColumns = z.infer<typeof userTypeColumns>;

const userTypeSchemas = {
  create: z.object({
    name: z.string().min(3),
  }),
  update: z.object({
    id: userTypeId,
    name: z.string().min(3),
  }),
  getById: z.object({
    id: userTypeId,
  }),
  delete: z.object({
    id: userTypeId,
  }),
};

export default userTypeSchemas;
