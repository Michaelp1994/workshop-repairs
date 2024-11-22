import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizationTable } from "./organization.sql";

export const manufacturerTable = pgTable(
  "manufacturer",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...metadataColumns,
  },
  (t) => [unique().on(t.name, t.organizationId)],
);

export type Manufacturer = InferModel<typeof manufacturerTable>;
export type ManufacturerID = Manufacturer["id"];
export type CreateManufacturer = InferCreateModel<typeof manufacturerTable>;
export type UpdateManufacturer = InferUpdateModel<typeof manufacturerTable>;
export type ArchiveManufacturer = InferArchiveModel<typeof manufacturerTable>;
