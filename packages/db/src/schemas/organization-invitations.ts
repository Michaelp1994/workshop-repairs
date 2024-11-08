import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { organizations } from "./organizations.schema";

export const organizationInvitation = pgTable("organization_invitation", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  invitationCode: uuid().defaultRandom(),
  emailSentAt: timestamp(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizations.id),
});

export type OrganizationInvitation = InferModel<typeof organizationInvitation>;
export type OrganizationInvitationID = OrganizationInvitation["id"];
export type CreateOrganizationInvitation = InferCreateModel<
  typeof organizationInvitation
>;
export type UpdateOrganizationInvitation = InferUpdateModel<
  typeof organizationInvitation
>;
export type ArchiveOrganizationInvitation = InferArchiveModel<
  typeof organizationInvitation
>;
