import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import type { InferModel } from "../services/types";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { organizationTable } from "./organization.table";

export const clientTable = pgTable(
  "client",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
    name: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [
    unique().on(t.name, t.organizationId),
    unique().on(t.localId, t.organizationId),
    ...auditConstraints(t),
  ],
);

export type Client = InferModel<typeof clientTable>;
export type ClientID = Client["id"];
export type ClientInput = InferInsertModel<typeof clientTable>;
