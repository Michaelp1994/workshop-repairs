import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";


export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
});

export type Organization = InferModel<typeof organizations>;
export type OrganizationID = Organization["id"];
export type CreateOrganization = InferCreateModel<typeof organizations>;
export type UpdateOrganization = InferUpdateModel<typeof organizations>;
export type ArchiveOrganization = InferArchiveModel<typeof organizations>;
