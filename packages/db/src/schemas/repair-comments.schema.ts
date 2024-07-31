import { serial, pgTable, integer, timestamp, text } from "drizzle-orm/pg-core";
import { repairs } from "./repairs.schema";
import { users } from "./users.schema";
import {
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
  type InferDeleteModel,
} from "../types";

export const repairComments = pgTable("repair_comments", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
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

export type RepairComment = InferModel<typeof repairComments>;
export type RepairCommentID = RepairComment["id"];
export type CreateRepairComment = InferCreateModel<typeof repairComments>;
export type UpdateRepairComment = InferUpdateModel<typeof repairComments>;
export type DeleteRepairComment = InferDeleteModel<typeof repairComments>;
