import type {
  CountPartsInput,
  GetAllPartsInput,
  GetPartsSelectInput,
} from "@repo/validators/server/parts.validators";

import { db } from "@repo/db";
import {
  getSequenceByOrganizationId,
  incrementPartSequence,
} from "@repo/db/repositories/organizationSequence.repository";
import {
  archivePart,
  countParts,
  createPart,
  getAllParts,
  getPartByLocalId,
  getPartsSelect,
  updatePart,
} from "@repo/db/repositories/part.repository";

import type { PartInput } from "../../../db/src/tables/part.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export async function getAllPartsService(
  input: GetAllPartsInput,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );
  assertDatabaseResult(sequence);
  const allParts = await getAllParts(db, input, session.organizationId);
  return allParts.map(({ localId, ...part }) => ({
    ...part,
    slug: createSlug(sequence.partKeyPrefix, localId),
  }));
}

export async function countPartsService(
  input: CountPartsInput,
  session: OrganizationSession,
) {
  return countParts(db, input, session.organizationId);
}

export async function getPartsSelectService(
  input: GetPartsSelectInput,
  session: OrganizationSession,
) {
  return getPartsSelect(db, input, session.organizationId);
}

export async function getPartService(
  localId: number,
  session: OrganizationSession,
) {
  return getPartByLocalId(db, localId, session.organizationId);
}

export async function createPartService(
  input: CreateInput<PartInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementPartSequence(tx, session.organizationId);
    const metadata = createInsertMetadata(session);

    assertDatabaseResult(sequence);

    const values = {
      ...input,
      ...metadata,
      localId: sequence.partLastUsedValue,
    };
    const part = await createPart(tx, values);
    assertDatabaseResult(part);

    const slug = createSlug(sequence.assetKeyPrefix, part.localId);

    return {
      ...part,
      slug,
    };
  });
}

export async function updatePartService(
  input: UpdateInput<PartInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    const part = await updatePart(tx, values, localId, session.organizationId);
    assertDatabaseResult(part);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.assetKeyPrefix, localId);
    return {
      slug,
      ...part,
    };
  });
}

export async function archivePartService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const archivedPart = await archivePart(
      tx,
      metadata,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(archivedPart);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.assetKeyPrefix, localId);
    return { slug, ...archivedPart };
  });
}
