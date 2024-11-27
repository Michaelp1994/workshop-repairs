import { relations } from "drizzle-orm";
import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { userTable } from "./user.sql";

export const organizationTable = pgTable("organization", {
  id: serial().primaryKey(),
  name: text().notNull().unique(),
  logo: text(),
  invitationCode: uuid().defaultRandom(),
});

export const organizationRelations = relations(
  organizationTable,
  ({ many }) => ({
    users: many(userTable),
  }),
);

export type Organization = InferModel<typeof organizationTable>;
export type OrganizationID = Organization["id"];
export type CreateOrganization = InferCreateModel<typeof organizationTable>;
export type UpdateOrganization = InferUpdateModel<typeof organizationTable>;
export type ArchiveOrganization = InferArchiveModel<typeof organizationTable>;
