import type {
  CountEquipmentTypesInput,
  GetAllEquipmentTypesInput,
  GetEquipmentTypesSelectInput,
} from "@repo/validators/server/equipmentTypes.validators";

import { type Database, db } from "@repo/db";
import EquipmentTypeRepository from "@repo/db/repositories/equipmentType.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { EquipmentTypeInput } from "../../../db/src/tables/equipmentType.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export default class EquipmentTypeService {
  constructor(
    private db: Database,
    private equipmentTypeRepository: EquipmentTypeRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveEquipmentType(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const equipmentType = await this.equipmentTypeRepository.archive(
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

      const slug = createSlug(sequence.equipmentTypeKeyPrefix, localId);
      return {
        slug,
        ...equipmentType,
      };
    });
  }

  async countEquipmentTypes(
    input: CountEquipmentTypesInput,
    session: OrganizationSession,
  ) {
    return this.equipmentTypeRepository.count(
      db,
      input,
      session.organizationId,
    );
  }

  async createEquipmentType(
    input: CreateInput<EquipmentTypeInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementEquipmentTypeSequence(
          tx,
          session.organizationId,
        );

      const metadata = createInsertMetadata(session);
      const values = {
        localId: sequence.equipmentTypeLastUsedValue,
        ...input,
        ...metadata,
      };
      const equipmentType = await this.equipmentTypeRepository.create(
        tx,
        values,
      );

      const slug = createSlug(
        sequence.equipmentTypeKeyPrefix,
        equipmentType.localId,
      );
      return {
        slug,
        ...equipmentType,
      };
    });
  }

  async getAllEquipmentTypes(
    input: GetAllEquipmentTypesInput,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allEquipmentTypes = await this.equipmentTypeRepository.getAll(
      this.db,
      input,
      session.organizationId,
    );
    return allEquipmentTypes.map(({ localId, ...client }) => ({
      ...client,
      slug: createSlug(sequence.equipmentTypeKeyPrefix, localId),
    }));
  }

  async getEquipmentType(localId: number, session: OrganizationSession) {
    return this.equipmentTypeRepository.getByLocalId(
      db,
      localId,
      session.organizationId,
    );
  }

  async getEquipmentTypesSelect(
    input: GetEquipmentTypesSelectInput,
    session: OrganizationSession,
  ) {
    return this.equipmentTypeRepository.getAllSimple(
      db,
      input,
      session.organizationId,
    );
  }

  async updateEquipmentType(
    input: UpdateInput<EquipmentTypeInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = { ...input, ...metadata };
      const equipmentType = await this.equipmentTypeRepository.update(
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

      const slug = createSlug(sequence.equipmentTypeKeyPrefix, localId);
      return {
        slug,
        ...equipmentType,
      };
    });
  }
}
