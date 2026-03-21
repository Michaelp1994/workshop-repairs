import { type Database } from "@repo/db";
import ModelRepository, {
  ModelFilters,
} from "@repo/db/repositories/model.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { ModelInput } from "../../../db/src/tables/model.table";
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
import { getModelImageUrlFromKey } from "../helpers/s3";
import { createSlug } from "../helpers/slugs";

export default class ModelService {
  constructor(
    private db: Database,
    private modelRepository: ModelRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
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
    input: CreateInput<ModelInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementModelSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      const values = {
        ...input,
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
    return this.modelRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
  }

  async updateModel(
    input: UpdateInput<ModelInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
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
