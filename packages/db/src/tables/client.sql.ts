import { relations } from "drizzle-orm";
import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import { assetTable } from "./asset.sql";
import { auditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.sql";
import { repairTable } from "./repair.sql";

export const clientTable = pgTable(
  "client",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...auditing,
  },
  (t) => [unique().on(t.name, t.organizationId)],
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
export type CreateClient = InferCreateModel<typeof clientTable>;
export type UpdateClient = InferUpdateModel<typeof clientTable>;
export type ArchiveClient = InferArchiveModel<typeof clientTable>;
