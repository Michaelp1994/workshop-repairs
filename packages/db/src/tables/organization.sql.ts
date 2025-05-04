import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { organizationInvitationTable } from "./organization-invitation.sql";
import { userTable } from "./user.sql";

export const organizationTable = pgTable("organization", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  logo: text(),
  invitationCode: uuid().defaultRandom(),
});

export const organizationRelations = relations(
  organizationTable,
  ({ many }) => ({
    users: many(userTable),
    invitations: many(organizationInvitationTable),
  }),
);

export type Organization = InferModel<typeof organizationTable>;
export type OrganizationID = Organization["id"];
export type CreateOrganization = InferCreateModel<typeof organizationTable>;
export type UpdateOrganization = InferUpdateModel<typeof organizationTable>;
export type ArchiveOrganization = InferArchiveModel<typeof organizationTable>;
