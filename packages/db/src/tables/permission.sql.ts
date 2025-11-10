import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";

export const permissionTable = pgTable(
  "permission",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    resource: text("resource").notNull(),
    action: text("action").notNull(),
    description: text("description"),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.resource, t.action), ...auditConstraints(t)],
);
