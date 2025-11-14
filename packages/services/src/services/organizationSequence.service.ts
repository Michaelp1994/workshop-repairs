import type { OrganizationSequenceID } from "@repo/validators/ids.validators";

import { type Database } from "@repo/db";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { OrganizationSequenceInput } from "../../../db/src/tables/organizationSequences.table";
import type { CreateInput, UpdateInput } from "../types";

export default class OrganizationSequenceService {
  constructor(
    private db: Database,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}
  async createOrganizationSequence(
    input: CreateInput<OrganizationSequenceInput>,
  ) {
    return this.organizationSequenceRepository.create(this.db, input);
  }

  async updateOrganizationSequence(
    input: UpdateInput<OrganizationSequenceInput>,
    id: OrganizationSequenceID,
  ) {
    return this.organizationSequenceRepository.update(this.db, input, id);
  }
}
