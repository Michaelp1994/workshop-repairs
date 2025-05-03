import { relations } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { assetTable } from "./asset.sql";
import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.sql";

export const locationTable = pgTable(
  "location",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    address: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.name, t.organizationId), ...auditConstraints(t)],
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
export type CreateLocation = InferCreateModel<typeof locationTable>;
export type UpdateLocation = InferUpdateModel<typeof locationTable>;
export type ArchiveLocation = InferArchiveModel<typeof locationTable>;
