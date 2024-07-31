import { z } from "zod";
import { userId, userTypeId } from "./ids.validators";

const userColumns = z.enum([
  "firstName",
  "lastName",
  "email",
  "type_name",
  "createdAt",
  "updatedAt",
]);

export type UserColumns = z.infer<typeof userColumns>;

const userSchemas = {
  register: z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  create: z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    typeId: userTypeId,
    password: z.string().min(8),
  }),
  update: z.object({
    id: userId,
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    typeId: userTypeId,
    password: z.string().min(8),
  }),
  updateCurrent: z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
  }),
  getCurrent: z.object({}),
  getById: z.object({
    id: userId,
  }),
  delete: z.object({
    id: userId,
  }),
};

export default userSchemas;
