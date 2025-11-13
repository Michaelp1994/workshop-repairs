import type {
  CountAssetsInput,
  GetAllAssetsInput,
  GetAssetsSelectInput,
} from "@repo/validators/server/assets.validators";

import { type Database } from "@repo/db";
import AssetRepository from "@repo/db/repositories/asset.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

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

export default class AssetService {
  constructor(
    private db: Database,
    private assetRepository: AssetRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveAsset(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const where = {
        localId,
        organizationId: session.organizationId,
      };
      const archivedAsset = await this.assetRepository.archiveAsset(
        tx,
        metadata,
        where,
      );
      assertDatabaseResult(archivedAsset);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return { slug, ...archivedAsset };
    });
  }

  async countAssets(input: CountAssetsInput, session: OrganizationSession) {
    const count = await this.assetRepository.countAssets(
      this.db,
      input,
      session.organizationId,
    );
    assertDatabaseResult(count);
    return count;
  }

  async createAsset(
    input: CreateInput<AssetInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementAssetSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      assertDatabaseResult(sequence);

      const values = {
        ...input,
        ...metadata,
        localId: sequence.assetLastUsedValue,
      };

      const asset = await this.assetRepository.createAsset(tx, values);

      assertDatabaseResult(asset);

      const slug = createSlug(sequence.assetKeyPrefix, asset.localId);

      return {
        ...asset,
        slug,
      };
    });
  }

  async getAllAssets(input: GetAllAssetsInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getSequenceByOrganizationId(
        this.db,
        session.organizationId,
      );

    assertDatabaseResult(sequence);

    const allAssets = await this.assetRepository.getAllAssets(
      this.db,
      input,
      session.organizationId,
    );

    return allAssets.map(({ localId, ...asset }) => ({
      ...asset,
      slug: createSlug(sequence.assetKeyPrefix, localId),
    }));
  }

  async getAsset(localId: number, session: OrganizationSession) {
    const asset = await this.assetRepository.getAsset(this.db, {
      localId,
      organizationId: session.organizationId,
    });
    assertDatabaseResult(asset);
    return asset;
  }

  async getAssetsSelect(
    input: GetAssetsSelectInput,
    session: OrganizationSession,
  ) {
    const assets = await this.assetRepository.getAssetsSelect(
      this.db,
      input,
      session.organizationId,
    );
    return assets;
  }

  async updateAsset(
    input: UpdateInput<AssetInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const values = {
        ...input,
        ...createUpdateMetadata(session),
      };

      const where = {
        localId,
        organizationId: session.organizationId,
      };

      const updatedAsset = await this.assetRepository.updateAsset(
        tx,
        values,
        where,
      );
      assertDatabaseResult(updatedAsset);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
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
}
