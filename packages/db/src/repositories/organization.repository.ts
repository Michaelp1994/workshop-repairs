import { eq } from "drizzle-orm";

import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "..";
import { organizationInvitationTable } from "../tables/organization-invitation.sql";
import {
  type OrganizationID,
  organizationTable,
} from "../tables/organization.sql";

export async function getOrganizationById(
  tx: DatabaseTransaction,
  id: OrganizationID,
) {
  const query = tx
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function getOrganizationByName(
  tx: DatabaseTransaction,
  name: string,
) {
  const query = tx
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.name, name));
  const [res] = await query.execute();
  return res;
}

export async function createOrganization(
  tx: DatabaseTransaction,
  input: CreateInput<OrganizationInput>,
) {
  const query = tx.insert(organizationTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function getOrganizationByInvitationCode(
  tx: DatabaseTransaction,
  invitationCode: string,
) {
  const query = tx
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.invitationCode, invitationCode));
  const [res] = await query.execute();
  return res;
}

export async function createInvitation(
  tx: DatabaseTransaction,
  input: CreateInput<OrganizationInvitationInput>,
) {
  const query = tx
    .insert(organizationInvitationTable)
    .values(input)
    .returning();
  const [res] = await query.execute();
  return res;
}
