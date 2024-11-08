import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const organizationTable = pgTable("organization", {
  id: serial().primaryKey(),
  name: text().notNull().unique(),
  invitationId: uuid().defaultRandom(),
});

export type Organization = InferModel<typeof organizationTable>;
export type OrganizationID = Organization["id"];
export type CreateOrganization = InferCreateModel<typeof organizationTable>;
export type UpdateOrganization = InferUpdateModel<typeof organizationTable>;
export type ArchiveOrganization = InferArchiveModel<typeof organizationTable>;
