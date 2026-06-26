import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../services/types";
import { organizationTable } from "./organization.table";

export const manufacturerTable = pgTable(
  "manufacturer",
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

export type Manufacturer = InferModel<typeof manufacturerTable>;
export type ManufacturerID = Manufacturer["id"];
export type ManufacturerInput = InferInsertModel<typeof manufacturerTable>;
