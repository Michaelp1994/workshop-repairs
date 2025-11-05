import type { OrganizationID } from "@repo/validators/ids.validators";

import { db } from "@repo/db";
import {
  createAsset,
  getAllAssets,
} from "@repo/db/repositories/asset.repository";
import {
  getSequenceByOrganizationId,
  incrementAssetSequence,
} from "@repo/db/repositories/organizationSequence.repository";
import assert from "assert";

import type { CreateAsset } from "../../../db/src/tables/asset.sql";

import { createSlug } from "../helpers/slugs";

export default function assertDatabaseResult(value: unknown): asserts value {
  assert(value != null, new Error("INTERNAL_SERVER_ERROR"));
}

export async function createAssetService(input: Omit<CreateAsset, "localId">) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementAssetSequence(tx, input.organizationId);

    assertDatabaseResult(sequence);

    const values = {
      ...input,
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

export async function getAllAssetsService(input, organizationId) {
  return await db.transaction(async (tx) => {
    const sequence = await getSequenceByOrganizationId(tx, organizationId);

    assertDatabaseResult(sequence);

    const allAssets = await getAllAssets(tx, input, organizationId);

    allAssets.map((asset) => ({
      ...asset,
      slug: createSlug(sequence.assetKeyPrefix, asset.localId),
    }));
  });
}
