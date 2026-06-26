import type { RepairTypeInput } from "../tables/repairType.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "./types";
import type { RepairTypeID } from "../validators/ids.validators";

import { type Database } from "../db";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import RepairTypeRepository from "../repositories/repairType.repository";

export default class RepairTypeService {
  constructor(
    private db: Database,
    private repairTypeRepository: RepairTypeRepository,
  ) {}

  async archiveRepairType(id: RepairTypeID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairTypeRepository.archive(tx, metadata, id);
    });
  }

  async countRepairTypes(input: CountInput, _session: OrganizationSession) {
    return this.repairTypeRepository.count(this.db, input);
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
      return this.repairTypeRepository.create(tx, values);
    });
  }

  async getAllRepairTypes(input: GetAllInput, _session: OrganizationSession) {
    return this.repairTypeRepository.getAll(this.db, input);
  }

  async getRepairTypeById(id: RepairTypeID, _session: OrganizationSession) {
    return this.repairTypeRepository.getById(this.db, id);
  }

  async getRepairTypesSelect(
    input: GetAllSimpleInput,
    _session: OrganizationSession,
  ) {
    return this.repairTypeRepository.getAllSimple(this.db, input);
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
      return this.repairTypeRepository.update(tx, values, id);
    });
  }
}
