import type { RepairTypeID } from "@repo/validators/ids.validators";
import type {
  CountRepairTypesInput,
  GetAllRepairTypesInput,
  GetRepairTypesSelectInput,
} from "@repo/validators/server/repairTypes.validators";

import { type Database } from "@repo/db";
import RepairTypeRepository from "@repo/db/repositories/repairType.repository";

import type { RepairTypeInput } from "../../../db/src/tables/repairType.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class RepairTypeService {
  constructor(
    private db: Database,
    private repairTypeRepository: RepairTypeRepository,
  ) {}

  async archiveRepairType(id: RepairTypeID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairTypeRepository.archiveRepairType(tx, metadata, id);
    });
  }

  async countRepairTypes(
    input: CountRepairTypesInput,
    _session: OrganizationSession,
  ) {
    return this.repairTypeRepository.countRepairTypes(this.db, input);
  }

  async createRepairType(
    input: CreateInput<RepairTypeInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairTypeRepository.createRepairType(tx, values);
    });
  }

  async getAllRepairTypes(
    input: GetAllRepairTypesInput,
    _session: OrganizationSession,
  ) {
    return this.repairTypeRepository.getAllRepairTypes(this.db, input);
  }

  async getRepairTypeById(id: RepairTypeID, _session: OrganizationSession) {
    return this.repairTypeRepository.getRepairTypeById(this.db, id);
  }

  async getRepairTypesSelect(
    input: GetRepairTypesSelectInput,
    _session: OrganizationSession,
  ) {
    return this.repairTypeRepository.getRepairTypesSelect(this.db, input);
  }

  async updateRepairType(
    input: UpdateInput<RepairTypeInput>,
    id: RepairTypeID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairTypeRepository.updateRepairType(tx, values, id);
    });
  }
}
