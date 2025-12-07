import type { OrganizationSequenceID } from "@repo/validators/ids.validators";

import { type Database } from "@repo/db";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { OrganizationSequenceInput } from "../../../db/src/tables/organizationSequences.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class OrganizationSequenceService {
  constructor(
    private db: Database,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}
  async createOrganizationSequence(
    input: CreateInput<OrganizationSequenceInput>,
    session: OrganizationSession,
  ) {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return this.organizationSequenceRepository.create(this.db, values);
  }

  async updateOrganizationSequence(
    input: UpdateInput<OrganizationSequenceInput>,
    id: OrganizationSequenceID,
    session: OrganizationSession,
  ) {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return this.organizationSequenceRepository.update(this.db, values, id);
  }
}
