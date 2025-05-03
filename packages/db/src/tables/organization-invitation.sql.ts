import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { organizationTable } from "./organization.sql";

export const organizationInvitationTable = pgTable("organization_invitation", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull().unique(),
  invitationCode: uuid().defaultRandom(),
  emailSentAt: timestamp(),
  organizationId: integer()
    .notNull()
    .references(() => organizationTable.id),
});

export const organizationInvitationRelations = relations(
  organizationInvitationTable,
  ({ one }) => ({
    organization: one(organizationTable, {
      fields: [organizationInvitationTable.organizationId],
      references: [organizationTable.id],
    }),
  }),
);

export type OrganizationInvitation = InferModel<
  typeof organizationInvitationTable
>;
export type OrganizationInvitationID = OrganizationInvitation["id"];
export type CreateOrganizationInvitation = InferCreateModel<
  typeof organizationInvitationTable
>;
export type UpdateOrganizationInvitation = InferUpdateModel<
  typeof organizationInvitationTable
>;
export type ArchiveOrganizationInvitation = InferArchiveModel<
  typeof organizationInvitationTable
>;
