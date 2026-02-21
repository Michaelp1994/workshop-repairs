import type {
  CountRepairsInput,
  GetAllRepairsInput,
  GetRepairsSelectInput,
} from "@repo/validators/server/repairs.validators";

import { type Database } from "@repo/db";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";
import RepairRepository from "@repo/db/repositories/repair.repository";

import type { RepairInput } from "../../../db/src/tables/repair.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export default class RepairService {
  constructor(
    private db: Database,
    private repairRepository: RepairRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveRepair(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const archivedRepair = await this.repairRepository.archive(
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

      return { slug, ...archivedRepair };
    });
  }

  async countRepairs(input: CountRepairsInput, session: OrganizationSession) {
    return this.repairRepository.count(this.db, input, session.organizationId);
  }

  async createRepair(
    input: CreateInput<RepairInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementRepairSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      const values = {
        ...input,
        ...metadata,
        localId: sequence.repairLastUsedValue,
      };
      const repair = await this.repairRepository.create(tx, values);

      const slug = createSlug(sequence.assetKeyPrefix, repair.localId);

      return {
        ...repair,
        slug,
      };
    });
  }

  async getAllRepairs(input: GetAllRepairsInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allRepairs = await this.repairRepository.getAll(
      this.db,
      input,
      session.organizationId,
    );
    return allRepairs.map(({ localId, ...repair }) => ({
      ...repair,
      slug: createSlug(sequence.repairKeyPrefix, localId),
    }));
  }

  async getRepair(localId: number, session: OrganizationSession) {
    return this.repairRepository.getByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getRepairsSelect(
    input: GetRepairsSelectInput,
    session: OrganizationSession,
  ) {
    return this.repairRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
  }

  async updateRepair(
    input: UpdateInput<RepairInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };

      const repair = await this.repairRepository.update(
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

      const slug = createSlug(sequence.repairKeyPrefix, localId);

      return {
        slug,
        ...repair,
      };
    });
  }
}
