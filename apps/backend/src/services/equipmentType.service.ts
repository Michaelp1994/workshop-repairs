import type { EquipmentTypeInput } from "../tables/equipmentType.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { type Database } from "../db";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";
import EquipmentTypeRepository from "../repositories/equipmentType.repository";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";

export default class EquipmentTypeService {
  constructor(
    private db: Database,
    private equipmentTypeRepository: EquipmentTypeRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveEquipmentType(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const { id, ...equipmentType } =
        await this.equipmentTypeRepository.archive(
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
        id: slug,
        ...equipmentType,
      };
    });
  }

  async countEquipmentTypes(input: CountInput, session: OrganizationSession) {
    return this.equipmentTypeRepository.count(
      this.db,
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
      const { id, ...equipmentType } =
        await this.equipmentTypeRepository.create(tx, values);

      const slug = createSlug(
        sequence.equipmentTypeKeyPrefix,
        equipmentType.localId,
      );
      return {
        id: slug,
        ...equipmentType,
      };
    });
  }

  async getAllEquipmentTypes(input: GetAllInput, session: OrganizationSession) {
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
      id: createSlug(sequence.equipmentTypeKeyPrefix, localId),
    }));
  }

  async getEquipmentType(localId: number, session: OrganizationSession) {
    return this.equipmentTypeRepository.getByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getEquipmentTypesSelect(
    input: GetAllSimpleInput,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const equipmentTypes = await this.equipmentTypeRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return equipmentTypes.map(({ value, label }) => ({
      value: createSlug(sequence.equipmentTypeKeyPrefix, value),
      label,
    }));
  }

  async updateEquipmentType(
    input: UpdateInput<EquipmentTypeInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = { ...input, ...metadata };
      const { id, ...equipmentType } =
        await this.equipmentTypeRepository.update(
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
        id: slug,
        ...equipmentType,
      };
    });
  }
}
