import type { PartInput } from "../tables/part.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { type Database } from "../db";
import { createSlug } from "../helpers/createSlug";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";
import PartRepository from "../repositories/part.repository";

export default class PartService {
  constructor(
    private db: Database,
    private partRepository: PartRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}
  async archivePart(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const { id, ...archivedPart } = await this.partRepository.archive(
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

      const slug = createSlug(sequence.partKeyPrefix, localId);
      return { id: slug, ...archivedPart };
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
      const { id, ...part } = await this.partRepository.create(tx, values);

      const slug = createSlug(sequence.partKeyPrefix, part.localId);

      return {
        id: slug,
        ...part,
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
      id: createSlug(sequence.partKeyPrefix, localId),
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
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const parts = await this.partRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return parts.map(({ value, label }) => ({
      value: createSlug(sequence.partKeyPrefix, value),
      label,
    }));
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
      const { id, ...part } = await this.partRepository.update(
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

      const slug = createSlug(sequence.partKeyPrefix, localId);
      return {
        id: slug,
        ...part,
      };
    });
  }
}
