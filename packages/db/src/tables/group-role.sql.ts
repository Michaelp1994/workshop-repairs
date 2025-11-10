import { integer, pgTable, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { groupTable } from "./group.sql";
import { roleTable } from "./role.sql";

export const groupRoleTable = pgTable(
  "group_role",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    groupId: integer()
      .notNull()
      .references(() => groupTable.id),
    roleId: integer()
      .notNull()
      .references(() => roleTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.groupId, t.roleId), ...auditConstraints(t)],
);
