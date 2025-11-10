import type { ModelID, PartID } from "@repo/validators/ids.validators";
import type { GetSelectInput } from "@repo/validators/server/dataTables.validators";
import type {
  CountAllModelsByPartIdInput,
  CountAllPartsByModelIdInput,
  GetAllModelsByPartIdInput,
  GetAllPartsByModelIdInput,
} from "@repo/validators/server/partsToModel.validators";

import { db } from "@repo/db";
import {
  archivePartToModel,
  countAllModelsByPartId,
  countAllPartsByModelId,
  createPartToModel,
  getAllModelsByPartId,
  getAllPartsByModelId,
  getModelsByPartIdSelect,
  getPartsByModelIdSelect,
  getPartToModelById,
  updatePartToModel,
} from "@repo/db/repositories/partToModel.repository";

import type {
  ArchivePartToModel,
  PartToModelInput,
} from "../../../db/src/tables/parts-to-model.sql";
import type { CreateInput, UpdateInput } from "../types";

export async function getAllPartsByModelIdService(
  input: GetAllPartsByModelIdInput,
) {
  return getAllPartsByModelId(db, input);
}

export async function countAllPartsByModelIdService(
  input: CountAllPartsByModelIdInput,
) {
  return countAllPartsByModelId(db, input);
}

export async function getAllModelsByPartIdService(
  input: GetAllModelsByPartIdInput,
) {
  return getAllModelsByPartId(db, input);
}

export async function countAllModelsByPartIdService(
  input: CountAllModelsByPartIdInput,
) {
  return countAllModelsByPartId(db, input);
}

export async function getModelsByPartIdSelectService(
  input: GetSelectInput,
  partId: PartID,
) {
  return getModelsByPartIdSelect(db, input, partId);
}

export async function getPartsByModelIdSelectService(
  input: GetSelectInput,
  modelId: ModelID,
) {
  return getPartsByModelIdSelect(db, input, modelId);
}

export async function getPartToModelByIdService(
  partId: PartID,
  modelId: ModelID,
) {
  return getPartToModelById(db, { partId, modelId });
}

export async function createPartToModelService(
  input: CreateInput<PartToModelInput>,
) {
  return await db.transaction(async (tx) => {
    return createPartToModel(tx, input);
  });
}

export async function updatePartToModelService(
  input: UpdateInput<PartToModelInput>,
) {
  return await db.transaction(async (tx) => {
    return updatePartToModel(tx, input);
  });
}

export async function archivePartToModelService(input: ArchivePartToModel) {
  return await db.transaction(async (tx) => {
    return archivePartToModel(tx, input);
  });
}
