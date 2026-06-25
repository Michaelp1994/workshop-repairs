import { eq } from "drizzle-orm";

import type { CreateInput } from "../types";

import { type DatabaseTransaction } from "../db";
import { returnOne } from "../helpers/executeQuery";
import {
  type OrganizationID,
  type OrganizationInput,
  organizationTable,
} from "../tables/organization.table";

export default class OrganizationRepository {
  async create(tx: DatabaseTransaction, input: CreateInput<OrganizationInput>) {
    const query = tx.insert(organizationTable).values(input).returning();
    return await returnOne(query);
  }

  async findByInvitationCode(tx: DatabaseTransaction, invitationCode: string) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.invitationCode, invitationCode));
    const [result] = await query.execute();
    return result;
  }

  async findByName(tx: DatabaseTransaction, name: string) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.name, name));
    const [result] = await query.execute();
    return result;
  }

  async getById(tx: DatabaseTransaction, id: OrganizationID) {
    const query = tx
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.id, id));
    return await returnOne(query);
  }
}
