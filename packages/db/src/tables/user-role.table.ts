import { integer, pgTable, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { roleTable } from "./role.table";
import { userTable } from "./user.table";

export const userRoleTable = pgTable(
  "user_role",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .notNull()
      .references(() => userTable.id),
    roleId: integer()
      .notNull()
      .references(() => roleTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.userId, t.roleId), ...auditConstraints(t)],
);
