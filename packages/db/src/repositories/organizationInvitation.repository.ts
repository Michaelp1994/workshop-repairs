import type { DatabaseTransaction } from "..";
import type { CreateInput } from "../types";

import {
  type OrganizationInvitationInput,
  organizationInvitationTable,
} from "../tables/organizationInvitation.table";
import { returnOne } from "../helpers/executeQuery";

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
