import type {
  CountEquipmentTypesInput,
  GetAllEquipmentTypesInput,
  GetEquipmentTypesSelectInput,
} from "@repo/validators/server/equipmentTypes.validators";

import { type Database, db } from "@repo/db";
import EquipmentTypeRepository from "@repo/db/repositories/equipmentType.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { EquipmentTypeInput } from "../../../db/src/tables/equipment-type.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
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
      const equipmentType =
        await this.equipmentTypeRepository.archiveEquipmentType(
          tx,
          metadata,
          localId,
          session.organizationId,
        );
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
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
    return this.equipmentTypeRepository.countEquipmentTypes(
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
      assertDatabaseResult(sequence);
      const metadata = createInsertMetadata(session);
      const values = {
        localId: sequence.equipmentTypeLastUsedValue,
        ...input,
        ...metadata,
      };
      const equipmentType =
        await this.equipmentTypeRepository.createEquipmentType(tx, values);
      assertDatabaseResult(equipmentType);
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
      await this.organizationSequenceRepository.getSequenceByOrganizationId(
        this.db,
        session.organizationId,
      );

    assertDatabaseResult(sequence);
    const allEquipmentTypes =
      await this.equipmentTypeRepository.getAllEquipmentTypes(
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
    return this.equipmentTypeRepository.getEquipmentTypeByLocalId(
      db,
      localId,
      session.organizationId,
    );
  }

  async getEquipmentTypesSelect(
    input: GetEquipmentTypesSelectInput,
    session: OrganizationSession,
  ) {
    return this.equipmentTypeRepository.getEquipmentTypesSelect(
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
      const equipmentType =
        await this.equipmentTypeRepository.updateEquipmentType(
          tx,
          values,
          localId,
          session.organizationId,
        );
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.equipmentTypeKeyPrefix, localId);
      return {
        slug,
        ...equipmentType,
      };
    });
  }
}
