import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, unique } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { laxAuditing, timestamps } from "./columns.helpers";
import { userRoleTable } from "./user-role.sql";

export const entitiesEnum = pgEnum("entities", [
  "assets",
  "clients",
  "repairs",
  "locations",
  "models",
  "manufacturers",
  "equipment-types",
  "parts",
  "users",
]);

export const actionsEnum = pgEnum("actions", [
  "create",
  "read",
  "update",
  "delete",
]);

export const userRolePermissionTable = pgTable(
  "user_role_permission",
  {
    id: serial().primaryKey(),
    roleId: integer()
      .notNull()
      .references(() => userRoleTable.id),
    entity: entitiesEnum().notNull(),
    action: actionsEnum().notNull(),
    ...timestamps,
    ...laxAuditing,
  },
  (t) => [unique().on(t.roleId, t.entity, t.action)],
);

export const userRolePermissionRelations = relations(
  userRolePermissionTable,
  ({ many }) => ({
    roles: many(userRoleTable),
  }),
);

export type UserRolePermission = InferModel<typeof userRolePermissionTable>;
export type UserRolePermissionID = UserRolePermission["id"];
export type CreateUserRolePermission = InferCreateModel<
  typeof userRolePermissionTable
>;
export type UpdateUserRolePermission = Omit<
  InferUpdateModel<typeof userRolePermissionTable>,
  "updatedById"
>;
export type ArchiveUserRolePermission = Omit<
  InferArchiveModel<typeof userRolePermissionTable>,
  "deletedById"
>;
