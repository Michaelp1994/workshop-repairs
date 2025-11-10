import type {
  CountRepairsInput,
  GetAllRepairsInput,
  GetRepairsSelectInput,
} from "@repo/validators/server/repairs.validators";

import { db } from "@repo/db";
import {
  getSequenceByOrganizationId,
  incrementRepairSequence,
} from "@repo/db/repositories/organizationSequence.repository";
import {
  archiveRepair,
  countRepairs,
  createRepair,
  getAllRepairs,
  getRepairByLocalId,
  getRepairsSelect,
  updateRepair,
} from "@repo/db/repositories/repair.repository";

import type { RepairInput } from "../../../db/src/tables/repair.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export async function getAllRepairsService(
  input: GetAllRepairsInput,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );
  assertDatabaseResult(sequence);
  const allRepairs = await getAllRepairs(db, input, session.organizationId);
  return allRepairs.map(({ localId, ...repair }) => ({
    ...repair,
    slug: createSlug(sequence.repairKeyPrefix, localId),
  }));
}

export async function countRepairsService(
  input: CountRepairsInput,
  session: OrganizationSession,
) {
  return countRepairs(db, input, session.organizationId);
}

export async function getRepairsSelectService(
  input: GetRepairsSelectInput,
  session: OrganizationSession,
) {
  return getRepairsSelect(db, input, session.organizationId);
}

export async function getRepairService(
  localId: number,
  session: OrganizationSession,
) {
  return getRepairByLocalId(db, localId, session.organizationId);
}

export async function createRepairService(
  input: CreateInput<RepairInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementRepairSequence(tx, session.organizationId);
    const metadata = createInsertMetadata(session);

    assertDatabaseResult(sequence);

    const values = {
      ...input,
      ...metadata,
      localId: sequence.repairLastUsedValue,
    };
    const repair = await createRepair(tx, values);
    assertDatabaseResult(repair);

    const slug = createSlug(sequence.assetKeyPrefix, repair.localId);

    return {
      ...repair,
      slug,
    };
  });
}

export async function updateRepairService(
  input: UpdateInput<RepairInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };

    const repair = await updateRepair(
      tx,
      values,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(repair);

    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.repairKeyPrefix, localId);

    return {
      slug,
      ...repair,
    };
  });
}

export async function archiveRepairService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const archivedRepair = await archiveRepair(
      tx,
      metadata,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(archivedRepair);

    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.assetKeyPrefix, localId);

    return { slug, ...archivedRepair };
  });
}
