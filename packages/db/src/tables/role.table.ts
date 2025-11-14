import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.table";

export const roleTable = pgTable(
  "role",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    name: text("name").notNull(),
    description: text("description"),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.organizationId, t.name), ...auditConstraints(t)],
);
