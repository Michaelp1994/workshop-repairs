import type { RepairStatusTypeID } from "@repo/validators/ids.validators";
import type {
  CountRepairStatusTypesInput,
  GetAllRepairStatusTypesInput,
  GetRepairStatusSelectInput,
} from "@repo/validators/server/repairStatusTypes.validators";

import { db } from "@repo/db";
import {
  archiveRepairStatus,
  countRepairStatusTypes,
  createRepairStatus,
  getAllRepairStatusTypes,
  getRepairStatusById,
  getRepairStatusTypesSelect,
  updateRepairStatus,
} from "@repo/db/repositories/repairStatusType.repository";

import type { RepairStatusTypeInput } from "../../../db/src/tables/repair-status-type.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function getAllRepairStatusTypesService(
  input: GetAllRepairStatusTypesInput,
  _session: OrganizationSession,
) {
  return getAllRepairStatusTypes(db, input);
}

export async function countRepairStatusTypesService(
  input: CountRepairStatusTypesInput,
  _session: OrganizationSession,
) {
  return countRepairStatusTypes(db, input);
}

export async function getRepairStatusSelectService(
  input: GetRepairStatusSelectInput,
  _session: OrganizationSession,
) {
  return getRepairStatusTypesSelect(db, input);
}

export async function getRepairStatusByIdService(
  id: RepairStatusTypeID,
  _session: OrganizationSession,
) {
  return getRepairStatusById(db, id);
}

export async function createRepairStatusTypeService(
  input: CreateInput<RepairStatusTypeInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createRepairStatus(tx, values);
  });
}

export async function updateRepairStatusTypeService(
  input: UpdateInput<RepairStatusTypeInput>,
  repairStatusId: RepairStatusTypeID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateRepairStatus(tx, values, repairStatusId);
  });
}

export async function archiveRepairStatusTypeService(
  repairStatusId: RepairStatusTypeID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveRepairStatus(tx, metadata, repairStatusId);
  });
}
