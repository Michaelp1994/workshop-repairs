import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { laxAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { organizationTable } from "./organization.table";

export const organizationInvitationTable = pgTable(
  "organization_invitation",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: text().notNull().unique(),
    invitationCode: uuid().defaultRandom(),
    emailSentAt: timestamp(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...laxAuditing,
  },
  (t) => [...auditConstraints(t)],
);

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
export type OrganizationInvitationInput = InferInsertModel<
  typeof organizationInvitationTable
>;
