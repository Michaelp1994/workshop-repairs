import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { auditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.sql";

export const partTable = pgTable("part", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  partNumber: varchar().notNull(),
  organizationId: integer()
    .notNull()
    .references(() => organizationTable.id),
  info: varchar(),
  ...timestamps,
  ...auditing,
});

export type Part = InferModel<typeof partTable>;
export type PartID = Part["id"];
export type CreatePart = InferCreateModel<typeof partTable>;
export type UpdatePart = InferUpdateModel<typeof partTable>;
export type ArchivePart = InferArchiveModel<typeof partTable>;
