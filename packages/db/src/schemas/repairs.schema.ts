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
import { assets } from "./assets.schema";
import { clients } from "./clients.schema";
import { repairStatusTypes } from "./repair-status-types.schema";
import { repairTypes } from "./repair-types.schema";
import { users } from "./users.schema";

export const repairs = pgTable("repairs", {
  id: serial("id").primaryKey(),
  fault: varchar("fault").notNull(),
  summary: varchar("summary"),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id),
  clientReference: varchar("client_reference").notNull(),
  typeId: integer("type_id")
    .notNull()
    .references(() => repairTypes.id),
  statusId: integer("status_id")
    .notNull()
    .references(() => repairStatusTypes.id),
  assetId: integer("asset_id")
    .notNull()
    .references(() => assets.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type Repair = InferModel<typeof repairs>;
export type RepairID = Repair["id"];
export type CreateRepair = InferCreateModel<typeof repairs>;
export type UpdateRepair = InferUpdateModel<typeof repairs>;
export type DeleteRepair = InferDeleteModel<typeof repairs>;
