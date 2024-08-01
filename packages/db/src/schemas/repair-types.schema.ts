import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { users } from "./users.schema";

export const repairTypes = pgTable("repair_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type RepairType = InferModel<typeof repairTypes>;
export type RepairTypeID = RepairType["id"];
export type CreateRepairType = InferCreateModel<typeof repairTypes>;
export type UpdateRepairType = InferUpdateModel<typeof repairTypes>;
export type ArchiveRepairType = InferArchiveModel<typeof repairTypes>;
