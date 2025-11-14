import type {
  RepairCommentID,
  RepairID,
} from "@repo/validators/ids.validators";
import type {
  CountRepairCommentsInput,
  GetAllRepairCommentsInput,
} from "@repo/validators/server/repairComments.validators";

import { type Database } from "@repo/db";
import RepairCommentRepository from "@repo/db/repositories/repairComment.repository";

import type { RepairCommentInput } from "../../../db/src/tables/repair-comment.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class RepairCommentService {
  constructor(
    private db: Database,
    private repairCommentRepository: RepairCommentRepository,
  ) {}

  async archiveRepairComment(
    id: RepairCommentID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairCommentRepository.archiveRepairComment(
        tx,
        metadata,
        id,
      );
    });
  }

  async countRepairComments(input: CountRepairCommentsInput) {
    return this.repairCommentRepository.countRepairComments(this.db, input);
  }

  async createRepairComment(
    input: CreateInput<RepairCommentInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairCommentRepository.createRepairComment(tx, values);
    });
  }

  async getAllRepairCommentsByRepairId(repairId: RepairID) {
    return this.repairCommentRepository.getAllRepairCommentsByRepairId(
      this.db,
      repairId,
    );
  }

  async getAllRepairComments(input: GetAllRepairCommentsInput) {
    return this.repairCommentRepository.getAllRepairComments(this.db, input);
  }

  async getRepairCommentById(id: RepairCommentID) {
    return this.repairCommentRepository.getRepairCommentById(this.db, id);
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
      return this.repairCommentRepository.updateRepairComment(tx, values, id);
    });
  }
}
