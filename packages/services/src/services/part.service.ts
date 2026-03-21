import { type Database } from "@repo/db";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";
import PartRepository from "@repo/db/repositories/part.repository";

import type { PartInput } from "../../../db/src/tables/part.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

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
      const archivedPart = await this.partRepository.archive(
        tx,
        metadata,
        localId,
        session.organizationId,
      );

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return { slug, ...archivedPart };
    });
  }

  async countParts(input: CountInput, session: OrganizationSession) {
    return this.partRepository.count(this.db, input, session.organizationId);
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

      const values = {
        ...input,
        ...metadata,
        localId: sequence.partLastUsedValue,
      };
      const part = await this.partRepository.create(tx, values);

      const slug = createSlug(sequence.assetKeyPrefix, part.localId);

      return {
        ...part,
        slug,
      };
    });
  }

  async getAllParts(input: GetAllInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allParts = await this.partRepository.getAll(
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
    return this.partRepository.getByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getPartsSelect(input: GetAllSimpleInput, session: OrganizationSession) {
    return this.partRepository.getAllSimple(
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
      const part = await this.partRepository.update(
        tx,
        values,
        localId,
        session.organizationId,
      );

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return {
        slug,
        ...part,
      };
    });
  }
}
