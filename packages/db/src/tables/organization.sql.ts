import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import { laxAuditing, timestamps } from "./columns.helpers";
import { organizationInvitationTable } from "./organization-invitation.sql";
import { userTable } from "./user.sql";

export const organizationTable = pgTable("organization", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  logo: varchar(),
  invitationCode: uuid().defaultRandom(),
  ...timestamps,
  ...laxAuditing,
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
export type OrganizationInput = InferInsertModel<typeof organizationTable>;
