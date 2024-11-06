import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizations } from "./organization.schema";

export const locations = pgTable(
  "locations",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    address: varchar("address").notNull(),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id),
    ...metadataColumns,
  },
  (t) => ({
    nameUnq: unique().on(t.name, t.organizationId),
  }),
);

export type Location = InferModel<typeof locations>;
export type LocationID = Location["id"];
export type CreateLocation = InferCreateModel<typeof locations>;
export type UpdateLocation = InferUpdateModel<typeof locations>;
export type ArchiveLocation = InferArchiveModel<typeof locations>;
