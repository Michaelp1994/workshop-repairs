import type {
  RepairCommentID,
  RepairID,
} from "@repo/validators/ids.validators";
import type {
  CountRepairCommentsInput,
  GetAllRepairCommentsInput,
} from "@repo/validators/server/repairComments.validators";

import { db } from "@repo/db";
import {
  archiveRepairComment,
  countRepairComments,
  createRepairComment,
  getAllRepairComments,
  getAllRepairCommentsByRepairId,
  getRepairCommentById,
  updateRepairComment,
} from "@repo/db/repositories/repairComment.repository";

import type { RepairCommentInput } from "../../../db/src/tables/repair-comment.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function getAllRepairCommentsService(
  input: GetAllRepairCommentsInput,
) {
  return getAllRepairComments(db, input);
}

export async function countRepairCommentsService(
  input: CountRepairCommentsInput,
) {
  return countRepairComments(db, input);
}

export async function getRepairCommentByIdService(id: RepairCommentID) {
  return getRepairCommentById(db, id);
}

export async function getAllRepairCommentsByRepairIdService(
  repairId: RepairID,
) {
  return getAllRepairCommentsByRepairId(db, repairId);
}

export async function createRepairCommentService(
  input: CreateInput<RepairCommentInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createRepairComment(tx, values);
  });
}

export async function updateRepairCommentService(
  input: UpdateInput<RepairCommentInput>,
  id: RepairCommentID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateRepairComment(tx, values, id);
  });
}

export async function archiveRepairCommentService(
  id: RepairCommentID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveRepairComment(tx, metadata, id);
  });
}
