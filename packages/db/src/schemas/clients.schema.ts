import {
  varchar,
  serial,
  pgTable,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import type {
  InferCreateModel,
  InferDeleteModel,
  InferModel,
  InferUpdateModel,
} from "../types";

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type Client = InferModel<typeof clients>;
export type ClientID = Client["id"];
export type CreateClient = InferCreateModel<typeof clients>;
export type UpdateClient = InferUpdateModel<typeof clients>;
export type DeleteClient = InferDeleteModel<typeof clients>;
