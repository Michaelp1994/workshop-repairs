import type { AssetStatusID } from "@repo/validators/ids.validators";
import type {
  GetAllAssetStatusesInput,
  GetAssetStatusesSelectInput,
} from "@repo/validators/server/assetStatuses.validators";
import type { CountAssetStatusesInput } from "@repo/validators/server/assetStatuses.validators";

import { db } from "@repo/db";
import {
  archiveAssetStatus,
  countAssetStatuses,
  createAssetStatus,
  getAllAssetStatuses,
  getAssetStatusById,
  getAssetStatusSelect,
  updateAssetStatus,
} from "@repo/db/repositories/assetStatus.repository";

import type { AssetStatusInput } from "../../../db/src/tables/asset-status.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function getAllAssetStatusesService(
  input: GetAllAssetStatusesInput,
  _session: OrganizationSession,
) {
  return getAllAssetStatuses(db, input);
}

export async function countAssetStatusesService(
  input: CountAssetStatusesInput,
  _session: OrganizationSession,
) {
  return countAssetStatuses(db, input);
}

export async function getAssetStatusSelectService(
  input: GetAssetStatusesSelectInput,
  _session: OrganizationSession,
) {
  return getAssetStatusSelect(db, input);
}

export async function getAssetStatusService(
  id: AssetStatusID,
  _session: OrganizationSession,
) {
  return getAssetStatusById(db, id);
}

export async function createAssetStatusService(
  input: CreateInput<AssetStatusInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    const assetStatus = await createAssetStatus(tx, values);
    return assetStatus;
  });
}

export async function updateAssetStatusService(
  input: UpdateInput<AssetStatusInput>,
  id: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateAssetStatus(tx, values, id);
  });
}

export async function archiveAssetStatusService(
  id: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveAssetStatus(tx, metadata, id);
  });
}
