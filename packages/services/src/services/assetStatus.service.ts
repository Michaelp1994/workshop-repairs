import { type Database } from "@repo/db";
import AssetStatusRepository from "@repo/db/repositories/assetStatus.repository";

import type { AssetStatusInput } from "../../../db/src/tables/assetStatus.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class AssetStatusService {
  constructor(
    private db: Database,
    private assetStatusRepository: AssetStatusRepository,
  ) {}
  async archiveAssetStatus(id: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.assetStatusRepository.archive(tx, metadata, id);
    });
  }

  async countAssetStatuses(input: CountInput, _session: OrganizationSession) {
    return this.assetStatusRepository.count(this.db, input);
  }

  async createAssetStatus(
    input: CreateInput<AssetStatusInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      const assetStatus = await this.assetStatusRepository.create(tx, values);
      return assetStatus;
    });
  }

  async getAllAssetStatuses(input: GetAllInput, _session: OrganizationSession) {
    return this.assetStatusRepository.getAll(this.db, input);
  }

  async getAssetStatus(id: number, _session: OrganizationSession) {
    return this.assetStatusRepository.getById(this.db, id);
  }

  async getAssetStatusSelect(
    input: GetAllSimpleInput,
    _session: OrganizationSession,
  ) {
    return this.assetStatusRepository.getAllSimple(this.db, input);
  }

  async updateAssetStatus(
    input: UpdateInput<AssetStatusInput>,
    id: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.assetStatusRepository.update(tx, values, id);
    });
  }
}
