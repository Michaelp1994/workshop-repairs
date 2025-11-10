import type { OrganizationSequenceID } from "@repo/validators/ids.validators";

import { db } from "@repo/db";
import {
  createOrganizationSequence,
  updateOrganizationSequence,
} from "@repo/db/repositories/organizationSequence.repository";

import type { OrganizationSequenceInput } from "../../../db/src/tables/organization-sequences.sql";
import type { CreateInput, UpdateInput } from "../types";

export async function createOrganizationSequenceService(
  input: CreateInput<OrganizationSequenceInput>,
) {
  return createOrganizationSequence(db, input);
}

export async function updateOrganizationSequenceService(
  input: UpdateInput<OrganizationSequenceInput>,
  id: OrganizationSequenceID,
) {
  return updateOrganizationSequence(db, input, id);
}
