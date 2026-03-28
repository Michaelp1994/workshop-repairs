import { type Database } from "@repo/db";
import EquipmentTypeRepository from "@repo/db/repositories/equipmentType.repository";
import ManufacturerRepository from "@repo/db/repositories/manufacturer.repository";
import ModelRepository, {
  ModelFilters,
} from "@repo/db/repositories/model.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type {
  CountInput,
  GetAllInput,
  GetAllSimpleInput,
} from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { getModelImageUrlFromKey } from "../helpers/s3";
import { createSlug } from "../helpers/slugs";

export default class ModelService {
  constructor(
    private db: Database,
    private modelRepository: ModelRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
    private manufacturerRepository: ManufacturerRepository,
    private equipmentTypeRepository: EquipmentTypeRepository,
  ) {}

  async archiveModel(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const archivedModel = await this.modelRepository.archive(
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

      const slug = createSlug(sequence.modelKeyPrefix, localId);

      return { slug, ...archivedModel };
    });
  }

  async countModels(
    input: CountInput<ModelFilters>,
    session: OrganizationSession,
  ) {
    return this.modelRepository.count(this.db, input, session.organizationId);
  }

  async createModel(
    input: {
      name: string;
      nickname: string;
      manufacturerLocalId: number;
      equipmentTypeLocalId: number;
    },
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementModelSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      const manufacturer = await this.manufacturerRepository.getByLocalId(
        tx,
        input.manufacturerLocalId,
        session.organizationId,
      );
      const equipmentType = await this.equipmentTypeRepository.getByLocalId(
        tx,
        input.equipmentTypeLocalId,
        session.organizationId,
      );

      const values = {
        name: input.name,
        nickname: input.nickname,
        manufacturerId: manufacturer.id,
        equipmentTypeId: equipmentType.id,
        ...metadata,
        localId: sequence.modelLastUsedValue,
      };
      const model = await this.modelRepository.create(tx, values);

      const slug = createSlug(sequence.modelKeyPrefix, model.localId);

      return {
        ...model,
        slug,
      };
    });
  }

  async getAllModels(
    input: GetAllInput<ModelFilters>,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allModels = await this.modelRepository.getAll(
      this.db,
      input,
      session.organizationId,
    );
    return allModels.map(({ localId, ...model }) => ({
      ...model,
      slug: createSlug(sequence.modelKeyPrefix, localId),
      defaultImageUrl: model.defaultImageUrl
        ? getModelImageUrlFromKey(model.defaultImageUrl)
        : null,
    }));
  }

  async getModel(localId: number, session: OrganizationSession) {
    return this.modelRepository.getByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getModelsSelect(
    input: GetAllSimpleInput<ModelFilters>,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const models = await this.modelRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return models.map(({ value, label }) => ({
      value: createSlug(sequence.modelKeyPrefix, value),
      label,
    }));
  }

  async updateModel(
    input: {
      name?: string;
      nickname?: string;
      manufacturerLocalId?: number;
      equipmentTypeLocalId?: number;
    },
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);

      let manufacturerId: number | undefined;
      let equipmentTypeId: number | undefined;

      if (input.manufacturerLocalId !== undefined) {
        const manufacturer = await this.manufacturerRepository.getByLocalId(
          tx,
          input.manufacturerLocalId,
          session.organizationId,
        );
        manufacturerId = manufacturer.id;
      }
      if (input.equipmentTypeLocalId !== undefined) {
        const equipmentType = await this.equipmentTypeRepository.getByLocalId(
          tx,
          input.equipmentTypeLocalId,
          session.organizationId,
        );
        equipmentTypeId = equipmentType.id;
      }

      const partialValues = {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.nickname !== undefined && { nickname: input.nickname }),
        ...(manufacturerId !== undefined && { manufacturerId }),
        ...(equipmentTypeId !== undefined && { equipmentTypeId }),
      };

      const values = {
        ...partialValues,
        ...metadata,
      };

      const model = await this.modelRepository.update(
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

      const slug = createSlug(sequence.modelKeyPrefix, localId);

      return {
        slug,
        ...model,
      };
    });
  }
}
