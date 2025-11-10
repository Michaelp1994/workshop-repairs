import type { ModelID, ModelImageID } from "@repo/validators/ids.validators";
import type {
  CountModelImagesInput,
  GetAllModelImagesInput,
} from "@repo/validators/server/modelImages.validators";

import { db } from "@repo/db";
import {
  archiveModelImage,
  countModelImages,
  createModelImage,
  getAllModelImages,
  getAllModelImagesByModelId,
  getModelImageById,
  updateModelImage,
} from "@repo/db/repositories/modelImage.repository";

import type {
  CreateModelImage,
  ModelImageInput,
  UpdateModelImage,
} from "../../../db/src/tables/model-image.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function getAllModelImagesService(
  input: GetAllModelImagesInput,
  _session: OrganizationSession,
) {
  return getAllModelImages(db, input);
}

export async function countModelImagesService(
  input: CountModelImagesInput,
  _session: OrganizationSession,
) {
  return countModelImages(db, input);
}

export async function getModelImageByIdService(
  id: ModelImageID,
  _session: OrganizationSession,
) {
  return getModelImageById(db, id);
}

export async function getAllModelImagesByModelIdService(
  id: ModelID,
  _session: OrganizationSession,
) {
  return getAllModelImagesByModelId(db, id);
}

export async function requestUploadModelImageService(
  input: unknown,
  _session: OrganizationSession,
) {
  // request upload is typically handled outside DB; keep as passthrough
  return input;
}

export async function createModelImageService(
  input: CreateInput<ModelImageInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createModelImage(tx, values);
  });
}

export async function updateModelImageService(
  input: UpdateInput<ModelImageInput>,
  id: ModelImageID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateModelImage(tx, values, id);
  });
}

export async function setFavouriteModelImageService(
  _input: unknown,
  _session: OrganizationSession,
) {
  // domain logic handled at router level; no-op wrapper available
  return _input;
}

export async function archiveModelImageService(
  id: ModelImageID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveModelImage(tx, metadata, id);
  });
}
