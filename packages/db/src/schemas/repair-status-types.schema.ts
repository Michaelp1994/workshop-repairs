import {
  pgTable,
  varchar,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import {
  type InferCreateModel,
  type InferDeleteModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const repairStatusTypes = pgTable("repair_status_types", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  colour: varchar("colour").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type RepairStatusType = InferModel<typeof repairStatusTypes>;
export type RepairStatusTypeID = RepairStatusType["id"];
export type CreateRepairStatusType = InferCreateModel<typeof repairStatusTypes>;
export type UpdateRepairStatusType = InferUpdateModel<typeof repairStatusTypes>;
export type DeleteRepairStatusType = InferDeleteModel<typeof repairStatusTypes>;
