import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { organizationTable } from "./organization.table";
import type { InferModel } from "../types";
import type { InferInsertModel } from "drizzle-orm";

export const roleTable = pgTable(
  "role",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    name: text("name").notNull(),
    description: text("description"),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [
    unique().on(t.organizationId, t.name),
    unique().on(t.localId, t.organizationId),
    ...auditConstraints(t),
  ],
);

export type Role = InferModel<typeof roleTable>;
export type RoleID = Role["id"];
export type RoleInput = InferInsertModel<typeof roleTable>;
