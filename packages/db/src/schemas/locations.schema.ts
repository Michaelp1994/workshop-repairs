import {
  varchar,
  serial,
  pgTable,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import {
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
  type InferDeleteModel,
} from "../types";

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
export type DeleteLocation = InferDeleteModel<typeof locations>;
