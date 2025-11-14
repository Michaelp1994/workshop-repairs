import type {
  CountModelsInput,
  GetAllModelsInput,
  GetModelsSelectInput,
} from "@repo/validators/server/models.validators";

import { type Database } from "@repo/db";
import ModelRepository from "@repo/db/repositories/model.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { ModelInput } from "../../../db/src/tables/model.table";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
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
      const archivedModel = await this.modelRepository.archiveModel(
        tx,
        metadata,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(archivedModel);

      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.modelKeyPrefix, localId);

      return { slug, ...archivedModel };
    });
  }

  async countModels(input: CountModelsInput, session: OrganizationSession) {
    return this.modelRepository.countModels(
      this.db,
      input,
      session.organizationId,
    );
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

      assertDatabaseResult(sequence);

      const values = {
        ...input,
        ...metadata,
        localId: sequence.modelLastUsedValue,
      };
      const model = await this.modelRepository.createModel(tx, values);
      assertDatabaseResult(model);

      const slug = createSlug(sequence.modelKeyPrefix, model.localId);

      return {
        ...model,
        slug,
      };
    });
  }

  async getAllModels(input: GetAllModelsInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getSequenceByOrganizationId(
        this.db,
        session.organizationId,
      );
    assertDatabaseResult(sequence);
    const allModels = await this.modelRepository.getAllModels(
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
    return this.modelRepository.getModelByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getModelsSelect(
    input: GetModelsSelectInput,
    session: OrganizationSession,
  ) {
    return this.modelRepository.getModelsSelect(
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

      const model = await this.modelRepository.updateModel(
        tx,
        values,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(model);

      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.modelKeyPrefix, localId);

      return {
        slug,
        ...model,
      };
    });
  }
}
