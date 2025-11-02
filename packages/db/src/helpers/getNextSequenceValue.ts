import { eq, sql } from "drizzle-orm";

import type { DatabaseTransaction } from "..";
import type { OrganizationID } from "../tables/organization.sql";

import { organizationSequenceTable } from "../tables/organization-sequences.sql";

export async function getNextSequenceValue(
  tx: DatabaseTransaction,
  organizationId: OrganizationID,
  type:
    | "asset"
    | "client"
    | "equipmentType"
    | "location"
    | "manufacturer"
    | "model"
    | "part"
    | "repair",
) {
  const key = `${type}LastUsedValue` as const;
  const [sequences] = await tx
    .update(organizationSequenceTable)
    .set({
      [key]: sql`${organizationSequenceTable[key]} + 1`,
    })
    .where(eq(organizationSequenceTable.organizationId, organizationId))
    .returning();

  if (!sequences) {
    throw new Error("Can't find sequence");
  }

  return sequences[key];
}
