import type {
  CountModelsInput,
  GetAllModelsInput,
  GetModelsSelectInput,
} from "@repo/validators/server/models.validators";

import { db } from "@repo/db";
import {
  archiveModel,
  countModels,
  createModel,
  getAllModels,
  getModelByLocalId,
  getModelsSelect,
  updateModel,
} from "@repo/db/repositories/model.repository";
import {
  getSequenceByOrganizationId,
  incrementModelSequence,
} from "@repo/db/repositories/organizationSequence.repository";

import type { ModelInput } from "../../../db/src/tables/model.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export async function getAllModelsService(
  input: GetAllModelsInput,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );
  assertDatabaseResult(sequence);
  const allModels = await getAllModels(db, input, session.organizationId);
  return allModels.map(({ localId, ...model }) => ({
    ...model,
    slug: createSlug(sequence.modelKeyPrefix, localId),
  }));
}

export async function countModelsService(
  input: CountModelsInput,
  session: OrganizationSession,
) {
  return countModels(db, input, session.organizationId);
}

export async function getModelsSelectService(
  input: GetModelsSelectInput,
  session: OrganizationSession,
) {
  return getModelsSelect(db, input, session.organizationId);
}

export async function getModelService(
  localId: number,
  session: OrganizationSession,
) {
  return getModelByLocalId(db, localId, session.organizationId);
}

export async function createModelService(
  input: CreateInput<ModelInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementModelSequence(tx, session.organizationId);
    const metadata = createInsertMetadata(session);

    assertDatabaseResult(sequence);

    const values = {
      ...input,
      ...metadata,
      localId: sequence.modelLastUsedValue,
    };
    const model = await createModel(tx, values);
    assertDatabaseResult(model);

    const slug = createSlug(sequence.modelKeyPrefix, model.localId);

    return {
      ...model,
      slug,
    };
  });
}

export async function updateModelService(
  input: UpdateInput<ModelInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };

    const model = await updateModel(
      tx,
      values,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(model);

    const sequence = await getSequenceByOrganizationId(
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

export async function archiveModelService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const archivedModel = await archiveModel(
      tx,
      metadata,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(archivedModel);

    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.modelKeyPrefix, localId);

    return { slug, ...archivedModel };
  });
}
