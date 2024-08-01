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

export const parts = pgTable("parts", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  partNumber: varchar("part_number").notNull(),
  info: varchar("info"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type Part = InferModel<typeof parts>;
export type PartID = Part["id"];
export type CreatePart = InferCreateModel<typeof parts>;
export type UpdatePart = InferUpdateModel<typeof parts>;
export type ArchivePart = InferArchiveModel<typeof parts>;
