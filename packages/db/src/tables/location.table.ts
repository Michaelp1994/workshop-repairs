import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { assetTable } from "./asset.table";
import { organizationTable } from "./organization.table";

export const locationTable = pgTable(
  "location",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
    name: varchar().notNull(),
    address: varchar().notNull(),
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

export const locationRelations = relations(locationTable, ({ one, many }) => ({
  organization: one(organizationTable, {
    fields: [locationTable.organizationId],
    references: [organizationTable.id],
  }),
  assets: many(assetTable),
}));

export type Location = InferModel<typeof locationTable>;
export type LocationID = Location["id"];
export type LocationInput = InferInsertModel<typeof locationTable>;
