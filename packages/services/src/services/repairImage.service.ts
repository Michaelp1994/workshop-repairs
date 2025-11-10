import type { RepairID, RepairImageID } from "@repo/validators/ids.validators";
import type {
  CountRepairImagesInput,
  GetAllRepairImagesInput,
} from "@repo/validators/server/repairImages.validators";

import { db } from "@repo/db";
import {
  archiveRepairImage,
  countRepairImages,
  createRepairImage,
  getAllRepairImages,
  getAllRepairImagesByRepairId,
  getRepairImageById,
  updateRepairImage,
} from "@repo/db/repositories/repairImage.repository";

import type { RepairImageInput } from "../../../db/src/tables/repair-image.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function getAllRepairImagesService(
  input: GetAllRepairImagesInput,
) {
  return getAllRepairImages(db, input);
}

export async function countRepairImagesService(input: CountRepairImagesInput) {
  return countRepairImages(db, input);
}

export async function getAllRepairImagesByRepairIdService(repairId: RepairID) {
  return getAllRepairImagesByRepairId(db, repairId);
}

export async function getRepairImageByIdService(id: RepairImageID) {
  return getRepairImageById(db, id);
}

export async function requestUploadRepairImageService(input: unknown) {
  // passthrough — router handles presigned upload details
  return input;
}

export async function createRepairImageService(
  input: CreateInput<RepairImageInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createRepairImage(tx, values);
  });
}

export async function updateRepairImageService(
  input: UpdateInput<RepairImageInput>,
  id: RepairImageID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateRepairImage(tx, values, id);
  });
}

export async function archiveRepairImageService(
  id: RepairImageID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveRepairImage(tx, metadata, id);
  });
}
