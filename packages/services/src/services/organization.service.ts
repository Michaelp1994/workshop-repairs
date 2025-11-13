import type { OrganizationID } from "@repo/validators/ids.validators";

import { type Database } from "@repo/db";
import OrganizationRepository from "@repo/db/repositories/organization.repository";

import type { OrganizationInput } from "../../../db/src/tables/organization.sql";
import type { CreateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";

export default class OrganizationService {
  constructor(
    private db: Database,
    private organizationRepository: OrganizationRepository,
  ) {}
  async createOrganization(input: CreateInput<OrganizationInput>) {
    return await this.db.transaction(async (tx) => {
      return this.organizationRepository.createOrganization(tx, input);
    });
  }

  async getOrganization(organizationId: OrganizationID) {
    const organization = await this.organizationRepository.getOrganizationById(
      this.db,
      organizationId,
    );
    assertDatabaseResult(organization);
    return organization;
  }
}
