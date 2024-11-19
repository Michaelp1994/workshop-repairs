import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizationTable } from "./organization.sql";

export const locationTable = pgTable(
  "location",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    address: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...metadataColumns,
  },
  (t) => [unique().on(t.name, t.organizationId)],
);

export type Location = InferModel<typeof locationTable>;
export type LocationID = Location["id"];
export type CreateLocation = InferCreateModel<typeof locationTable>;
export type UpdateLocation = InferUpdateModel<typeof locationTable>;
export type ArchiveLocation = InferArchiveModel<typeof locationTable>;
