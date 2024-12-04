import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { laxAuditing, timestamps } from "./columns.helpers";
import { userTable } from "./user.sql";

export const userRoleTable = pgTable("user_role", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
  ...timestamps,
  ...laxAuditing,
});

export const userRoleRelations = relations(userRoleTable, ({ many }) => ({
  users: many(userTable),
}));

export type UserRole = InferModel<typeof userRoleTable>;
export type UserRoleID = UserRole["id"];
export type CreateUserRole = InferCreateModel<typeof userRoleTable>;
export type UpdateUserRole = Omit<
  InferUpdateModel<typeof userRoleTable>,
  "updatedById"
>;
export type ArchiveUserRole = Omit<
  InferArchiveModel<typeof userRoleTable>,
  "deletedById"
>;
