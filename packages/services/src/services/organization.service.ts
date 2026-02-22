import type OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";
import type UserRepository from "@repo/db/repositories/user.repository";
import type { OrganizationID } from "@repo/validators/ids.validators";

import { type Database } from "@repo/db";
import OrganizationRepository from "@repo/db/repositories/organization.repository";
import { ZodError } from "zod";

import {
  type AuthedSession,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import {
  createOrganizationLogoKeyFromFileName,
  fileExistsInS3,
  getOrganizationLogoUrlFromKey,
} from "../helpers/s3";

export default class OrganizationService {
  constructor(
    private db: Database,
    private organizationRepository: OrganizationRepository,
    private userRepository: UserRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async createOrganization(
    input: { name: string; logo: string },
    session: AuthedSession,
  ) {
    const fileExists = await fileExistsInS3(
      createOrganizationLogoKeyFromFileName(input.logo),
    );
    if (!fileExists) {
      throw new Error("File does not exist.");
    }

    const user = await this.userRepository.getById(this.db, session.userId);

    if (user.organizationId) {
      throw new Error("You already belong to an organization");
    }

    const organizationExists = await this.organizationRepository.findByName(
      this.db,
      input.name,
    );

    if (organizationExists) {
      throw new ZodError([
        {
          input: null,
          code: "custom",
          path: ["name"],
          message: "This name is already taken.",
        },
      ]);
    }
    const updatedUser = await this.db.transaction(async (tx) => {
      const createdOrganization = await this.organizationRepository.create(tx, {
        ...input,
        createdById: session.userId,
        createdAt: new Date(),
      });

      await this.organizationSequenceRepository.create(tx, {
        assetKeyPrefix: "AST",
        partKeyPrefix: "PRT",
        repairKeyPrefix: "RPR",
        manufacturerKeyPrefix: "MFR",
        clientKeyPrefix: "CLT",
        modelKeyPrefix: "MDL",
        equipmentTypeKeyPrefix: "EPT",
        locationKeyPrefix: "LOC",
        createdById: session.userId,
        createdAt: new Date(),
        organizationId: createdOrganization.id,
      });

      const metadata = createUpdateMetadata(session);
      return await this.userRepository.update(
        tx,
        { organizationId: createdOrganization.id, ...metadata },
        session.userId,
      );
    });

    return updatedUser;
  }

  async getOrganization(organizationId: OrganizationID) {
    const organization = await this.organizationRepository.getById(
      this.db,
      organizationId,
    );

    return {
      ...organization,
      logo: organization.logo
        ? getOrganizationLogoUrlFromKey(organization.logo)
        : null,
    };
  }
}
