import type { OrganizationID } from "@repo/validators/ids.validators";

import { db } from "@repo/db";
import { createOrganization } from "@repo/db/repositories/organization.repository";
import { getOrganizationById } from "@repo/db/repositories/organization.repository";

import type { OrganizationInput } from "../../../db/src/tables/organization.sql";
import type { CreateInput } from "../types";

export async function getOrganizationService(organizationId: OrganizationID) {
  return getOrganizationById(db, organizationId);
}

export async function createOrganizationService(
  input: CreateInput<OrganizationInput>,
) {
  return await db.transaction(async (tx) => {
    return createOrganization(tx, input);
  });
}
