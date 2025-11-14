import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.table";

export const groupTable = pgTable(
  "group",
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
  (t) => [unique().on(t.name, t.organizationId), ...auditConstraints(t)],
);
