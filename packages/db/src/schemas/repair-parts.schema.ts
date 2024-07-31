import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

import {
  type InferCreateModel,
  type InferDeleteModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { parts } from "./parts.schema";
import { repairs } from "./repairs.schema";
import { users } from "./users.schema";

export const repairParts = pgTable("repair_parts", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull(),
  installed: boolean("installed").notNull().default(false),
  repairId: integer("repair_id")
    .notNull()
    .references(() => repairs.id),
  partId: integer("part_id")
    .notNull()
    .references(() => parts.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type RepairPart = InferModel<typeof repairParts>;
export type RepairPartID = RepairPart["id"];
export type CreateRepairPart = InferCreateModel<typeof repairParts>;
export type UpdateRepairPart = InferUpdateModel<typeof repairParts>;
export type DeleteRepairPart = InferDeleteModel<typeof repairParts>;
