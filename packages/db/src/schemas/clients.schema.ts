import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import metadataColumns from "./metadata-columns";

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  ...metadataColumns,
});

export type Client = InferModel<typeof clients>;
export type ClientID = Client["id"];
export type CreateClient = InferCreateModel<typeof clients>;
export type UpdateClient = InferUpdateModel<typeof clients>;
export type ArchiveClient = InferArchiveModel<typeof clients>;
