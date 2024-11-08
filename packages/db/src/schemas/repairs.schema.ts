import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { assets } from "./assets.schema";
import { clients } from "./clients.schema";
import metadataColumns from "./metadata-columns";
import { organizations } from "./organizations.schema";
import { repairStatusTypes } from "./repair-status-types.schema";
import { repairTypes } from "./repair-types.schema";

export const repairs = pgTable("repairs", {
  id: serial("id").primaryKey(),
  fault: varchar("fault").notNull(),
  summary: varchar("summary"),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizations.id),
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
  ...metadataColumns,
});

export type Repair = InferModel<typeof repairs>;
export type RepairID = Repair["id"];
export type CreateRepair = InferCreateModel<typeof repairs>;
export type UpdateRepair = InferUpdateModel<typeof repairs>;
export type ArchiveRepair = InferArchiveModel<typeof repairs>;
