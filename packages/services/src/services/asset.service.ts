import type {
  CountAssetsInput,
  GetAllAssetsInput,
  GetAssetsSelectInput,
} from "@repo/validators/server/assets.validators";

import { type Database } from "@repo/db";
import AssetRepository from "@repo/db/repositories/asset.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { AssetInput } from "../../../db/src/tables/asset.table";
import type { CreateInput, UpdateInput } from "../types";

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
      const archivedAsset = await this.assetRepository.archive(
        tx,
        metadata,
        where,
      );

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return { slug, ...archivedAsset };
    });
  }

  async countAssets(input: CountAssetsInput, session: OrganizationSession) {
    const count = await this.assetRepository.count(
      this.db,
      input,
      session.organizationId,
    );

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

      const values = {
        ...input,
        ...metadata,
        localId: sequence.assetLastUsedValue,
      };

      const asset = await this.assetRepository.create(tx, values);

      const slug = createSlug(sequence.assetKeyPrefix, asset.localId);

      return {
        ...asset,
        slug,
      };
    });
  }

  async getAllAssets(input: GetAllAssetsInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allAssets = await this.assetRepository.getAll(
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
    const asset = await this.assetRepository.getById(this.db, {
      localId,
      organizationId: session.organizationId,
    });

    return asset;
  }

  async getAssetsSelect(
    input: GetAssetsSelectInput,
    session: OrganizationSession,
  ) {
    const assets = await this.assetRepository.getAllSimple(
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

      const updatedAsset = await this.assetRepository.update(tx, values, where);

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return {
        slug,
        ...updatedAsset,
      };
    });
  }
}
