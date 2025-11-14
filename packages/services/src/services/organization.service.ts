import type { OrganizationID } from "@repo/validators/ids.validators";

import { type Database } from "@repo/db";
import OrganizationRepository from "@repo/db/repositories/organization.repository";

import type { OrganizationInput } from "../../../db/src/tables/organization.table";
import type { CreateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import { getOrganizationLogoUrlFromKey } from "../helpers/s3";

export default class OrganizationService {
  constructor(
    private db: Database,
    private organizationRepository: OrganizationRepository,
  ) {}
  async createOrganization(input: CreateInput<OrganizationInput>) {
    return await this.db.transaction(async (tx) => {
      return this.organizationRepository.create(tx, input);
    });
  }

  async getOrganization(organizationId: OrganizationID) {
    const organization = await this.organizationRepository.getById(
      this.db,
      organizationId,
    );
    assertDatabaseResult(organization);
    return {
      ...organization,
      logo: organization.logo
        ? getOrganizationLogoUrlFromKey(organization.logo)
        : null,
    };
  }
}
