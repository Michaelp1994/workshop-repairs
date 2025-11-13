import { eq } from "drizzle-orm";

import type { CreateInput } from "../types";

import { type DatabaseTransaction } from "..";
import {
  type OrganizationInvitationInput,
  organizationInvitationTable,
} from "../tables/organization-invitation.sql";
import {
  type OrganizationID,
  type OrganizationInput,
  organizationTable,
} from "../tables/organization.sql";

export default class OrganizationRepository {
  async createInvitation(
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

  async createOrganization(
    tx: DatabaseTransaction,
    input: CreateInput<OrganizationInput>,
  ) {
    const query = tx.insert(organizationTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getOrganizationById(tx: DatabaseTransaction, id: OrganizationID) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.id, id));
    const [res] = await query.execute();
    return res;
  }

  async getOrganizationByInvitationCode(
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

  async getOrganizationByName(tx: DatabaseTransaction, name: string) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.name, name));
    const [res] = await query.execute();
    return res;
  }
}
