import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const organizations = pgTable("organizations", {
  id: serial().primaryKey(),
  name: text().notNull().unique(),
  invitationId: uuid().defaultRandom(),
});

export type Organization = InferModel<typeof organizations>;
export type OrganizationID = Organization["id"];
export type CreateOrganization = InferCreateModel<typeof organizations>;
export type UpdateOrganization = InferUpdateModel<typeof organizations>;
export type ArchiveOrganization = InferArchiveModel<typeof organizations>;
