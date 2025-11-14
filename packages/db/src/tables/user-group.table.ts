import { integer, pgTable, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { groupTable } from "./group.table";
import { userTable } from "./user.table";

export const userGroupTable = pgTable(
  "user_group",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .notNull()
      .references(() => userTable.id),
    groupId: integer()
      .notNull()
      .references(() => groupTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.userId, t.groupId), ...auditConstraints(t)],
);
