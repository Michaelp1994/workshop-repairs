import type { InferInsertModel } from "drizzle-orm";

import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import type { InferModel } from "../services/types";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { organizationTable } from "./organization.table";

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
