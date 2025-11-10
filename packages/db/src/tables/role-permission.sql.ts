import { integer, pgTable, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { permissionTable } from "./permission.sql";
import { roleTable } from "./role.sql";

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
