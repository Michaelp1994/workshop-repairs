import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import type { InferModel } from "../types";

import { assetTable } from "./asset.table";
import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { organizationTable } from "./organization.table";
import { repairTable } from "./repair.table";

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

export const clientRelations = relations(clientTable, ({ one, many }) => ({
  assets: many(assetTable),
  repairs: many(repairTable),
  organization: one(organizationTable, {
    fields: [clientTable.organizationId],
    references: [organizationTable.id],
  }),
}));

export type Client = InferModel<typeof clientTable>;

export type ClientID = Client["id"];

export type ClientInput = InferInsertModel<typeof clientTable>;
