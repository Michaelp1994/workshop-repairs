import type {
  CountEquipmentTypesInput,
  GetAllEquipmentTypesInput,
  GetEquipmentTypesSelectInput,
} from "@repo/validators/server/equipmentTypes.validators";

import { db } from "@repo/db";
import {
  archiveEquipmentType,
  countEquipmentTypes,
  createEquipmentType,
  getAllEquipmentTypes,
  getEquipmentTypeByLocalId,
  getEquipmentTypesSelect,
  updateEquipmentType,
} from "@repo/db/repositories/equipmentType.repository";
import {
  getSequenceByOrganizationId,
  incrementEquipmentTypeSequence,
} from "@repo/db/repositories/organizationSequence.repository";

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

export async function getAllEquipmentTypesService(
  input: GetAllEquipmentTypesInput,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );

  assertDatabaseResult(sequence);
  const allEquipmentTypes = await getAllEquipmentTypes(
    db,
    input,
    session.organizationId,
  );
  return allEquipmentTypes.map(({ localId, ...client }) => ({
    ...client,
    slug: createSlug(sequence.equipmentTypeKeyPrefix, localId),
  }));
}

export async function countEquipmentTypesService(
  input: CountEquipmentTypesInput,
  session: OrganizationSession,
) {
  return countEquipmentTypes(db, input, session.organizationId);
}

export async function getEquipmentTypesSelectService(
  input: GetEquipmentTypesSelectInput,
  session: OrganizationSession,
) {
  return getEquipmentTypesSelect(db, input, session.organizationId);
}

export async function getEquipmentTypeService(
  localId: number,
  session: OrganizationSession,
) {
  return getEquipmentTypeByLocalId(db, localId, session.organizationId);
}

export async function createEquipmentTypeService(
  input: CreateInput<EquipmentTypeInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementEquipmentTypeSequence(
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
    const equipmentType = await createEquipmentType(tx, values);
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

export async function updateEquipmentTypeService(
  input: UpdateInput<EquipmentTypeInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = { ...input, ...metadata };
    const equipmentType = await updateEquipmentType(
      tx,
      values,
      localId,
      session.organizationId,
    );
    const sequence = await getSequenceByOrganizationId(
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

export async function archiveEquipmentTypeService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const equipmentType = await archiveEquipmentType(
      tx,
      metadata,
      localId,
      session.organizationId,
    );
    const sequence = await getSequenceByOrganizationId(
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
