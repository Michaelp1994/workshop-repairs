import type { CountInput, GetAllInput, GetAllSimpleInput } from "../types";

import { type Database } from "../db";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";
import AssetRepository, {
  AssetFilters,
} from "../repositories/asset.repository";
import ClientRepository from "../repositories/client.repository";
import LocationRepository from "../repositories/location.repository";
import ModelRepository from "../repositories/model.repository";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";

export interface AssetInput {
  assetNumber: string;
  serialNumber: string;
  softwareVersion: string;
  statusId: number;
  modelLocalId: number;
  clientLocalId: number;
  locationLocalId: number;
}

export default class AssetService {
  constructor(
    private db: Database,
    private assetRepository: AssetRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
    private modelRepository: ModelRepository,
    private clientRepository: ClientRepository,
    private locationRepository: LocationRepository,
  ) {}
  async archiveAsset(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const where = {
        localId,
        organizationId: session.organizationId,
      };
      const { id, ...archivedAsset } = await this.assetRepository.archive(
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
      return { id: slug, ...archivedAsset };
    });
  }

  async countAssets(
    input: CountInput<AssetFilters>,
    session: OrganizationSession,
  ) {
    const count = await this.assetRepository.count(
      this.db,
      input,
      session.organizationId,
    );

    return count;
  }

  async createAsset(input: AssetInput, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementAssetSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      const model = await this.modelRepository.getByLocalId(
        tx,
        input.modelLocalId,
        session.organizationId,
      );

      const client = await this.clientRepository.getByLocalId(
        tx,
        input.clientLocalId,
        session.organizationId,
      );

      const location = await this.locationRepository.getByLocalId(
        tx,
        input.locationLocalId,
        session.organizationId,
      );

      const values = {
        assetNumber: input.assetNumber,
        serialNumber: input.serialNumber,
        softwareVersion: input.softwareVersion,
        statusId: input.statusId,
        modelId: model.id,
        clientId: client.id,
        locationId: location.id,
        ...metadata,
        localId: sequence.assetLastUsedValue,
      };

      const { id, ...asset } = await this.assetRepository.create(tx, values);

      const slug = createSlug(sequence.assetKeyPrefix, asset.localId);

      return {
        id: slug,
        ...asset,
      };
    });
  }

  async getAllAssets(
    input: GetAllInput<AssetFilters>,
    session: OrganizationSession,
  ) {
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

    return allAssets.map(({ id, localId, ...asset }) => ({
      id: createSlug(sequence.assetKeyPrefix, localId),
      ...asset,
    }));
  }

  async getAsset(localId: number, session: OrganizationSession) {
    const asset = await this.assetRepository.getByLocalId(this.db, {
      localId,
      organizationId: session.organizationId,
    });

    return asset;
  }

  async getAssetsSelect(
    input: GetAllSimpleInput<AssetFilters>,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const assets = await this.assetRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return assets.map(({ value, label }) => ({
      value: createSlug(sequence.assetKeyPrefix, value),
      label,
    }));
  }

  async updateAsset(
    input: Partial<AssetInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);

      let modelId: number | undefined;
      let clientId: number | undefined;
      let locationId: number | undefined;

      if (input.modelLocalId !== undefined) {
        const model = await this.modelRepository.getByLocalId(
          tx,
          input.modelLocalId,
          session.organizationId,
        );
        modelId = model.id;
      }
      if (input.clientLocalId !== undefined) {
        const client = await this.clientRepository.getByLocalId(
          tx,
          input.clientLocalId,
          session.organizationId,
        );
        clientId = client.id;
      }
      if (input.locationLocalId !== undefined) {
        const location = await this.locationRepository.getByLocalId(
          tx,
          input.locationLocalId,
          session.organizationId,
        );
        locationId = location.id;
      }

      const partialValues = {
        ...(input.assetNumber !== undefined && {
          assetNumber: input.assetNumber,
        }),
        ...(input.serialNumber !== undefined && {
          serialNumber: input.serialNumber,
        }),
        ...(input.softwareVersion !== undefined && {
          softwareVersion: input.softwareVersion,
        }),
        ...(input.statusId !== undefined && { statusId: input.statusId }),
        ...(modelId !== undefined && { modelId }),
        ...(clientId !== undefined && { clientId }),
        ...(locationId !== undefined && { locationId }),
      };

      const values = {
        ...partialValues,
        ...metadata,
      };

      const where = {
        localId,
        organizationId: session.organizationId,
      };

      const { id, ...updatedAsset } = await this.assetRepository.update(
        tx,
        values,
        where,
      );

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return {
        id: slug,
        ...updatedAsset,
      };
    });
  }
}
