import { eq } from "drizzle-orm";

import type { CreateInput } from "../types";

import { type DatabaseTransaction } from "..";
import {
  type OrganizationID,
  type OrganizationInput,
  organizationTable,
} from "../tables/organization.table";

export default class OrganizationRepository {
  async create(tx: DatabaseTransaction, input: CreateInput<OrganizationInput>) {
    const query = tx.insert(organizationTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getById(tx: DatabaseTransaction, id: OrganizationID) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.id, id));
    const [res] = await query.execute();
    return res;
  }

  async getByInvitationCode(tx: DatabaseTransaction, invitationCode: string) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.invitationCode, invitationCode));
    const [res] = await query.execute();
    return res;
  }

  async getByName(tx: DatabaseTransaction, name: string) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.name, name));
    const [res] = await query.execute();
    return res;
  }
}
