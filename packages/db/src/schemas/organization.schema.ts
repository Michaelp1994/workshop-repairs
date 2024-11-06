import { pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const organizations = pgTable("organizations", {
  id: serial().primaryKey(),
  name: text().notNull().unique(),
});

export type Organization = InferModel<typeof organizations>;
export type OrganizationID = Organization["id"];
export type CreateOrganization = InferCreateModel<typeof organizations>;
export type UpdateOrganization = InferUpdateModel<typeof organizations>;
export type ArchiveOrganization = InferArchiveModel<typeof organizations>;
