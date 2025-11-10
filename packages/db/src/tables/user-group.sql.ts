import { integer, pgTable, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { groupTable } from "./group.sql";
import { userTable } from "./user.sql";

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
