import { relations } from "drizzle-orm";
import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { laxAuditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.sql";
import { userTable } from "./user.sql";

export const userRoleTable = pgTable(
  "user_role",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...laxAuditing,
  },
  (t) => [unique().on(t.name, t.organizationId)],
);

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
