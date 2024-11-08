import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizations } from "./organizations.schema";

export const manufacturers = pgTable(
  "manufacturers",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id),
    ...metadataColumns,
  },
  (t) => ({
    unique: unique().on(t.name, t.organizationId),
  }),
);

export type Manufacturer = InferModel<typeof manufacturers>;
export type ManufacturerID = Manufacturer["id"];
export type CreateManufacturer = InferCreateModel<typeof manufacturers>;
export type UpdateManufacturer = InferUpdateModel<typeof manufacturers>;
export type ArchiveManufacturer = InferArchiveModel<typeof manufacturers>;
