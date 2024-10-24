import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import metadataColumns from "./metadata-columns";
import { organizations } from "./organizations.schema";

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  organizationId: integer("organizationId").notNull().references(() => organizations.id),
  ...metadataColumns,
});

export type Client = InferModel<typeof clients>;
export type ClientID = Client["id"];
export type CreateClient = InferCreateModel<typeof clients>;
export type UpdateClient = InferUpdateModel<typeof clients>;
export type ArchiveClient = InferArchiveModel<typeof clients>;
