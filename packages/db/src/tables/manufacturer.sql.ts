import { relations } from "drizzle-orm";
import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { auditing, timestamps } from "./columns.helpers";
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
    ...auditing,
  },
  (t) => [unique().on(t.name, t.organizationId)],
);

export const manufacturerRelations = relations(
  manufacturerTable,
  ({ one, many }) => ({
    organization: one(organizationTable, {
      fields: [manufacturerTable.organizationId],
      references: [organizationTable.id],
    }),
    models: many(manufacturerTable),
  }),
);

export type Manufacturer = InferModel<typeof manufacturerTable>;
export type ManufacturerID = Manufacturer["id"];
export type CreateManufacturer = InferCreateModel<typeof manufacturerTable>;
export type UpdateManufacturer = InferUpdateModel<typeof manufacturerTable>;
export type ArchiveManufacturer = InferArchiveModel<typeof manufacturerTable>;
