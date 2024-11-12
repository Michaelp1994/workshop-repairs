import { eq } from "drizzle-orm";

import { db } from "..";
import {
  type CreateOrganization,
  type OrganizationID,
  organizationTable,
} from "../schemas/organization.table";
import {
  type CreateOrganizationInvitation,
  organizationInvitationTable,
} from "../schemas/organization-invitation.table";

export async function getById(id: OrganizationID) {
  const query = db
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function getByName(name: string) {
  const query = db
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.name, name));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateOrganization) {
  const query = db.insert(organizationTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function getByInvitationCode(invitationCode: string) {
  const query = db
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.invitationCode, invitationCode));
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
