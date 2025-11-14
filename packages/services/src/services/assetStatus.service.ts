import type { AssetStatusID } from "@repo/validators/ids.validators";
import type {
  GetAllAssetStatusesInput,
  GetAssetStatusesSelectInput,
} from "@repo/validators/server/assetStatuses.validators";
import type { CountAssetStatusesInput } from "@repo/validators/server/assetStatuses.validators";

import { type Database } from "@repo/db";
import AssetStatusRepository from "@repo/db/repositories/assetStatus.repository";

import type { AssetStatusInput } from "../../../db/src/tables/assetStatus.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
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
      return this.assetStatusRepository.archiveAssetStatus(tx, metadata, id);
    });
  }

  async countAssetStatuses(
    input: CountAssetStatusesInput,
    _session: OrganizationSession,
  ) {
    return this.assetStatusRepository.countAssetStatuses(this.db, input);
  }

  async createAssetStatus(
    input: CreateInput<AssetStatusInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      const assetStatus = await this.assetStatusRepository.createAssetStatus(
        tx,
        values,
      );
      return assetStatus;
    });
  }

  async getAllAssetStatuses(
    input: GetAllAssetStatusesInput,
    _session: OrganizationSession,
  ) {
    return this.assetStatusRepository.getAllAssetStatuses(this.db, input);
  }

  async getAssetStatus(id: AssetStatusID, _session: OrganizationSession) {
    return this.assetStatusRepository.getAssetStatusById(this.db, id);
  }

  async getAssetStatusSelect(
    input: GetAssetStatusesSelectInput,
    _session: OrganizationSession,
  ) {
    return this.assetStatusRepository.getAssetStatusSelect(this.db, input);
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
      return this.assetStatusRepository.updateAssetStatus(tx, values, id);
    });
  }
}
