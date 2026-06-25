import type { RepairCommentInput } from "../tables/repairComment.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";
import type { RepairCommentID } from "../validators/ids.validators";

import { type Database } from "../db";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import RepairRepository from "../repositories/repair.repository";
import RepairCommentRepository from "../repositories/repairComment.repository";

export default class RepairCommentService {
  constructor(
    private db: Database,
    private repairCommentRepository: RepairCommentRepository,
    private repairRepository: RepairRepository,
  ) {}

  async archiveRepairComment(
    id: RepairCommentID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairCommentRepository.archive(tx, metadata, id);
    });
  }

  async countRepairComments(input: CountInput) {
    return this.repairCommentRepository.count(this.db, input);
  }

  async createRepairComment(
    input: Omit<CreateInput<RepairCommentInput>, "repairId"> & {
      repairLocalId: number;
    },
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const repair = await this.repairRepository.getByLocalId(
        tx,
        input.repairLocalId,
        session.organizationId,
      );
      const metadata = createInsertMetadata(session);
      const { repairLocalId: _, ...rest } = input;
      const values = {
        ...rest,
        repairId: repair.id,
        ...metadata,
      };
      return this.repairCommentRepository.create(tx, values);
    });
  }

  async getAllRepairComments(input: GetAllInput) {
    return this.repairCommentRepository.getAll(this.db, input);
  }

  async getAllRepairCommentsByRepairId(
    repairLocalId: number,
    session: OrganizationSession,
  ) {
    const repair = await this.repairRepository.getByLocalId(
      this.db,
      repairLocalId,
      session.organizationId,
    );
    return this.repairCommentRepository.getAllByRepairId(this.db, repair.id);
  }

  async getRepairCommentById(id: RepairCommentID) {
    return this.repairCommentRepository.getById(this.db, id);
  }

  async updateRepairComment(
    input: UpdateInput<RepairCommentInput>,
    id: RepairCommentID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairCommentRepository.update(tx, values, id);
    });
  }
}
