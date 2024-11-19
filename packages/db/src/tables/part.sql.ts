import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizationTable } from "./organization.sql";

export const partTable = pgTable("part", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  partNumber: varchar().notNull(),
  organizationId: integer()
    .notNull()
    .references(() => organizationTable.id),
  info: varchar(),
  ...metadataColumns,
});

export type Part = InferModel<typeof partTable>;
export type PartID = Part["id"];
export type CreatePart = InferCreateModel<typeof partTable>;
export type UpdatePart = InferUpdateModel<typeof partTable>;
export type ArchivePart = InferArchiveModel<typeof partTable>;
