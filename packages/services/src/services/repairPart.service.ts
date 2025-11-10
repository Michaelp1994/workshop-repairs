import type { RepairPartID } from "@repo/validators/ids.validators";
import type {
  CountRepairPartsInput,
  GetAllRepairPartsInput,
} from "@repo/validators/server/repairParts.validators";

import { db } from "@repo/db";
import {
  archiveRepairPart,
  countRepairParts,
  createRepairPart,
  getAllRepairParts,
  getRepairPartById,
  updateRepairPart,
} from "@repo/db/repositories/repairPart.repository";

import type { RepairPartInput } from "../../../db/src/tables/repair-part.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function getAllRepairPartsService(
  input: GetAllRepairPartsInput,
  _session: OrganizationSession,
) {
  return getAllRepairParts(db, input);
}

export async function countRepairPartsService(
  input: CountRepairPartsInput,
  _session: OrganizationSession,
) {
  return countRepairParts(db, input);
}

export async function getRepairPartByIdService(
  id: RepairPartID,
  _session: OrganizationSession,
) {
  return getRepairPartById(db, id);
}

export async function createRepairPartService(
  input: CreateInput<RepairPartInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createRepairPart(tx, values);
  });
}

export async function updateRepairPartService(
  input: UpdateInput<RepairPartInput>,
  id: RepairPartID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateRepairPart(tx, values, id);
  });
}

export async function archiveRepairPartService(
  id: RepairPartID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveRepairPart(tx, metadata, id);
  });
}
