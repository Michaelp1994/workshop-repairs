import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { organizationTable } from "./organization.table";

export const partTable = pgTable(
  "part",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
    name: varchar().notNull(),
    partNumber: varchar().notNull(),
    description: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    info: varchar(),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.localId, t.organizationId), ...auditConstraints(t)],
);

export type Part = InferModel<typeof partTable>;
export type PartID = Part["id"];
export type PartInput = InferInsertModel<typeof partTable>;
