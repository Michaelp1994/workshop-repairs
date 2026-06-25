import type { DatabaseTransaction } from "../db";
import type { CreateInput } from "../types";

import { returnOne } from "../helpers/executeQuery";
import {
  type OrganizationInvitationInput,
  organizationInvitationTable,
} from "../tables/organizationInvitation.table";

export default class OrganizationInvitationRepository {
  async createInvitation(
    tx: DatabaseTransaction,
    input: CreateInput<OrganizationInvitationInput>,
  ) {
    const query = tx
      .insert(organizationInvitationTable)
      .values(input)
      .returning();
    return await returnOne(query);
  }
}
