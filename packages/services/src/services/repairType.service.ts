import type { RepairTypeID } from "@repo/validators/ids.validators";
import type {
  CountRepairTypesInput,
  GetAllRepairTypesInput,
  GetRepairTypesSelectInput,
} from "@repo/validators/server/repairTypes.validators";

import { db } from "@repo/db";
import {
  archiveRepairType,
  countRepairTypes,
  createRepairType,
  getAllRepairTypes,
  getRepairTypeById,
  getRepairTypesSelect,
  updateRepairType,
} from "@repo/db/repositories/repairType.repository";

import type { RepairTypeInput } from "../../../db/src/tables/repair-type.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function getAllRepairTypesService(
  input: GetAllRepairTypesInput,
  _session: OrganizationSession,
) {
  return getAllRepairTypes(db, input);
}

export async function countRepairTypesService(
  input: CountRepairTypesInput,
  _session: OrganizationSession,
) {
  return countRepairTypes(db, input);
}

export async function getRepairTypesSelectService(
  input: GetRepairTypesSelectInput,
  _session: OrganizationSession,
) {
  return getRepairTypesSelect(db, input);
}

export async function getRepairTypeByIdService(
  id: RepairTypeID,
  _session: OrganizationSession,
) {
  return getRepairTypeById(db, id);
}

export async function createRepairTypeService(
  input: CreateInput<RepairTypeInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createRepairType(tx, values);
  });
}

export async function updateRepairTypeService(
  input: UpdateInput<RepairTypeInput>,
  id: RepairTypeID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateRepairType(tx, values, id);
  });
}

export async function archiveRepairTypeService(
  id: RepairTypeID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveRepairType(tx, metadata, id);
  });
}
