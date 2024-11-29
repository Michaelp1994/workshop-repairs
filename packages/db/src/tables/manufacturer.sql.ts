import { relations } from "drizzle-orm";
import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { modelTable } from "./model.sql";
import { organizationTable } from "./organization.sql";

export const manufacturerTable = pgTable(
  "manufacturer",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.name, t.organizationId), ...auditConstraints(t)],
);

export const manufacturerRelations = relations(
  manufacturerTable,
  ({ one, many }) => ({
    organization: one(organizationTable, {
      fields: [manufacturerTable.organizationId],
      references: [organizationTable.id],
    }),
    models: many(modelTable),
  }),
);

export type Manufacturer = InferModel<typeof manufacturerTable>;
export type ManufacturerID = Manufacturer["id"];
export type CreateManufacturer = InferCreateModel<typeof manufacturerTable>;
export type UpdateManufacturer = InferUpdateModel<typeof manufacturerTable>;
export type ArchiveManufacturer = InferArchiveModel<typeof manufacturerTable>;
