import type { OrganizationSequenceInput } from "../tables/organizationSequences.table";
import type { CreateInput, UpdateInput } from "../types";
import type { OrganizationSequenceID } from "../validators/ids.validators";

import { type Database } from "../db";
import {
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";

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
