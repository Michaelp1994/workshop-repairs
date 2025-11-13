import type {
  CountPartsInput,
  GetAllPartsInput,
  GetPartsSelectInput,
} from "@repo/validators/server/parts.validators";

import { type Database, db } from "@repo/db";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";
import PartRepository from "@repo/db/repositories/part.repository";

import type { PartInput } from "../../../db/src/tables/part.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export default class PartService {
  constructor(
    private db: Database,
    private partRepository: PartRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}
  async archivePart(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const archivedPart = await this.partRepository.archivePart(
        tx,
        metadata,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(archivedPart);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return { slug, ...archivedPart };
    });
  }

  async countParts(input: CountPartsInput, session: OrganizationSession) {
    return this.partRepository.countParts(
      this.db,
      input,
      session.organizationId,
    );
  }

  async createPart(
    input: CreateInput<PartInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementPartSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      assertDatabaseResult(sequence);

      const values = {
        ...input,
        ...metadata,
        localId: sequence.partLastUsedValue,
      };
      const part = await this.partRepository.createPart(tx, values);
      assertDatabaseResult(part);

      const slug = createSlug(sequence.assetKeyPrefix, part.localId);

      return {
        ...part,
        slug,
      };
    });
  }

  async getAllParts(input: GetAllPartsInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getSequenceByOrganizationId(
        db,
        session.organizationId,
      );
    assertDatabaseResult(sequence);
    const allParts = await this.partRepository.getAllParts(
      this.db,
      input,
      session.organizationId,
    );
    return allParts.map(({ localId, ...part }) => ({
      ...part,
      slug: createSlug(sequence.partKeyPrefix, localId),
    }));
  }

  async getPart(localId: number, session: OrganizationSession) {
    return this.partRepository.getPartByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getPartsSelect(
    input: GetPartsSelectInput,
    session: OrganizationSession,
  ) {
    return this.partRepository.getPartsSelect(
      this.db,
      input,
      session.organizationId,
    );
  }

  async updatePart(
    input: UpdateInput<PartInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      const part = await this.partRepository.updatePart(
        tx,
        values,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(part);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return {
        slug,
        ...part,
      };
    });
  }
}
