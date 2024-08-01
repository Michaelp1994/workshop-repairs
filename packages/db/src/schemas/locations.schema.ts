import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { users } from "./users.schema";

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  address: varchar("address").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type Location = InferModel<typeof locations>;
export type LocationID = Location["id"];
export type CreateLocation = InferCreateModel<typeof locations>;
export type UpdateLocation = InferUpdateModel<typeof locations>;
export type ArchiveLocation = InferArchiveModel<typeof locations>;
