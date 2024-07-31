import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferCreateModel,
  type InferDeleteModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { users } from "./users.schema";

export const manufacturers = pgTable("manufacturers", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type Manufacturer = InferModel<typeof manufacturers>;
export type ManufacturerID = Manufacturer["id"];
export type CreateManufacturer = InferCreateModel<typeof manufacturers>;
export type UpdateManufacturer = InferUpdateModel<typeof manufacturers>;
export type DeleteManufacturer = InferDeleteModel<typeof manufacturers>;
