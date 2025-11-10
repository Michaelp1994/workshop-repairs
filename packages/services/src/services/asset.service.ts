import type { GetAssetsSelectSchema } from "@repo/validators/server/assets.validators";

import { db } from "@repo/db";
import {
  archiveAsset,
  type AssetCountParameters,
  type AssetDataTableParameters,
  countAssets,
  createAsset,
  getAllAssets,
  getAsset,
  getAssetsSelect,
  updateAsset,
} from "@repo/db/repositories/asset.repository";
import {
  getSequenceByOrganizationId,
  incrementAssetSequence,
} from "@repo/db/repositories/organizationSequence.repository";

import type { AssetInput } from "../../../db/src/tables/asset.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export async function getAllAssetsService(
  input: AssetDataTableParameters,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );

  assertDatabaseResult(sequence);

  const allAssets = await getAllAssets(db, input, session.organizationId);

  return allAssets.map(({ localId, ...asset }) => ({
    ...asset,
    slug: createSlug(sequence.assetKeyPrefix, localId),
  }));
}

export async function countAssetsService(
  input: AssetCountParameters,
  session: OrganizationSession,
) {
  const count = await countAssets(db, input, session.organizationId);
  assertDatabaseResult(count);
  return count;
}

export async function getAssetsSelectService(
  input: GetAssetsSelectSchema,
  session: OrganizationSession,
) {
  const assets = await getAssetsSelect(db, input, session.organizationId);
  return assets;
}

export async function getAssetService(
  localId: number,
  session: OrganizationSession,
) {
  const asset = await getAsset(db, {
    localId,
    organizationId: session.organizationId,
  });
  assertDatabaseResult(asset);
  return asset;
}

export async function createAssetService(
  input: CreateInput<AssetInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementAssetSequence(tx, session.organizationId);
    const metadata = createInsertMetadata(session);

    assertDatabaseResult(sequence);

    const values = {
      ...input,
      ...metadata,
      localId: sequence.assetLastUsedValue,
    };

    const asset = await createAsset(tx, values);

    assertDatabaseResult(asset);

    const slug = createSlug(sequence.assetKeyPrefix, asset.localId);

    return {
      ...asset,
      slug,
    };
  });
}

export async function updateAssetService(
  input: UpdateInput<AssetInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const values = {
      ...input,
      ...createUpdateMetadata(session),
    };

    const where = {
      localId,
      organizationId: session.organizationId,
    };

    const updatedAsset = await updateAsset(tx, values, where);
    assertDatabaseResult(updatedAsset);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.assetKeyPrefix, localId);
    return {
      slug,
      ...updatedAsset,
    };
  });
}

export async function archiveAssetService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const where = {
      localId,
      organizationId: session.organizationId,
    };
    const archivedAsset = await archiveAsset(tx, metadata, where);
    assertDatabaseResult(archivedAsset);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.assetKeyPrefix, localId);
    return { slug, ...archivedAsset };
  });
}
