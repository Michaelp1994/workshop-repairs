import { eq } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "..";
import {
  type CreateOrganizationSequence,
  organizationSequenceTable,
  type UpdateOrganizationSequence,
} from "../tables/organization-sequences.sql";

export async function getSequenceByOrganizationId(id: OrganizationID) {
  const query = db
    .select()
    .from(organizationSequenceTable)
    .where(eq(organizationSequenceTable.organizationId, id));
  const [res] = await query.execute();
  return res;
}

export async function createOrganizationSequence(
  input: CreateOrganizationSequence,
) {
  const query = db.insert(organizationSequenceTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateOrganizationSequence({
  id,
  ...input
}: UpdateOrganizationSequence) {
  const query = db
    .update(organizationSequenceTable)
    .set(input)
    .where(eq(organizationSequenceTable.id, id))
    .returning();
  const [res] = await query.execute();
  return res;
}
