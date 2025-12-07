import { integer, pgTable, unique } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { permissionTable } from "./permission.table";
import { roleTable } from "./role.table";
import type { InferModel } from "../types";
import type { InferInsertModel } from "drizzle-orm";

export const rolePermissionTable = pgTable(
  "role_permission",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    roleId: integer()
      .notNull()
      .references(() => roleTable.id),
    permissionId: integer()
      .notNull()
      .references(() => permissionTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.roleId, t.permissionId), ...auditConstraints(t)],
);

export type RolePermission = InferModel<typeof rolePermissionTable>;
export type RolePermissionID = RolePermission["id"];
export type RolePermissionInput = InferInsertModel<typeof rolePermissionTable>;
