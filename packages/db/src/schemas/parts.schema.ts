import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizations } from "./organization.schema";

export const parts = pgTable("parts", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  partNumber: varchar("part_number").notNull(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizations.id),
  info: varchar("info"),
  ...metadataColumns,
});

export type Part = InferModel<typeof parts>;
export type PartID = Part["id"];
export type CreatePart = InferCreateModel<typeof parts>;
export type UpdatePart = InferUpdateModel<typeof parts>;
export type ArchivePart = InferArchiveModel<typeof parts>;
