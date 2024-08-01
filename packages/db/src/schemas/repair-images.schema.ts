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
import { repairs } from "./repairs.schema";
import { users } from "./users.schema";

export const repairImages = pgTable("repair_images", {
  id: serial("id").primaryKey(),
  caption: varchar("caption").notNull(),
  url: varchar("url").notNull(),
  repairId: integer("repair_id")
    .notNull()
    .references(() => repairs.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type RepairImage = InferModel<typeof repairImages>;
export type RepairImageID = RepairImage["id"];
export type CreateRepairImage = InferCreateModel<typeof repairImages>;
export type UpdateRepairImage = InferUpdateModel<typeof repairImages>;
export type ArchiveRepairImage = InferArchiveModel<typeof repairImages>;
