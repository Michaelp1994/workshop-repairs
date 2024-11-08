import { db } from "..";
import {
  type CreateOrganization,
  organizationTable,
} from "../schemas/organization.table";
import {
  type CreateOrganizationInvitation,
  organizationInvitationTable,
} from "../schemas/organization-invitation.table";

export async function create(input: CreateOrganization) {
  const query = db.insert(organizationTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function createInvitation(input: CreateOrganizationInvitation) {
  const query = db
    .insert(organizationInvitationTable)
    .values(input)
    .returning();
  const [res] = await query.execute();
  return res;
}
