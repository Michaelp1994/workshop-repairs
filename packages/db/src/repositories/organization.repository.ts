import { eq } from "drizzle-orm";

import type { CreateInput } from "../types";

import { type DatabaseTransaction } from "..";
import {
  type OrganizationID,
  type OrganizationInput,
  organizationTable,
} from "../tables/organization.table";
import { returnOne } from "../helpers/executeQuery";

export default class OrganizationRepository {
  async create(tx: DatabaseTransaction, input: CreateInput<OrganizationInput>) {
    const query = tx.insert(organizationTable).values(input).returning();
    return await returnOne(query);
  }

  async getById(tx: DatabaseTransaction, id: OrganizationID) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.id, id));
    return await returnOne(query);
  }

  async getByInvitationCode(tx: DatabaseTransaction, invitationCode: string) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.invitationCode, invitationCode));
    return await returnOne(query);
  }

  async getByName(tx: DatabaseTransaction, name: string) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.name, name));
    return await returnOne(query);
  }
}
