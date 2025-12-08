import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { organizationTable } from "./organization.table";
import type { InferModel } from "../types";
import type { InferInsertModel } from "drizzle-orm";

export const groupTable = pgTable(
  "group",
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
    unique().on(t.name, t.organizationId),
    unique().on(t.localId, t.organizationId),
    ...auditConstraints(t),
  ],
);

export type Group = InferModel<typeof groupTable>;
export type GroupID = Group["id"];
export type GroupInput = InferInsertModel<typeof groupTable>;
