import type { DatabaseTransaction } from "..";
import type { CreateInput } from "../types";

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
    const [res] = await query.execute();
    return res;
  }
}
