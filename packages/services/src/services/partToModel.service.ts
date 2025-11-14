import type { ModelID, PartID } from "@repo/validators/ids.validators";
import type { GetSelectInput } from "@repo/validators/server/dataTables.validators";
import type {
  CountAllModelsByPartIdInput,
  CountAllPartsByModelIdInput,
  GetAllModelsByPartIdInput,
  GetAllPartsByModelIdInput,
} from "@repo/validators/server/partsToModel.validators";

import { type Database } from "@repo/db";
import PartToModelRepository from "@repo/db/repositories/partToModel.repository";

import type { PartToModelInput } from "../../../db/src/tables/partToModel.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createInsertMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class PartToModelService {
  constructor(
    private db: Database,
    private partToModelRepository: PartToModelRepository,
  ) {}
  async archivePartToModel({
    partId,
    modelId,
  }: {
    partId: PartID;
    modelId: ModelID;
  }) {
    return await this.db.transaction(async (tx) => {
      return this.partToModelRepository.archivePartToModel(tx, {
        partId,
        modelId,
      });
    });
  }

  async countAllModelsByPartId(input: CountAllModelsByPartIdInput) {
    return this.partToModelRepository.countAllModelsByPartId(this.db, input);
  }

  async countAllPartsByModelId(input: CountAllPartsByModelIdInput) {
    return this.partToModelRepository.countAllPartsByModelId(this.db, input);
  }

  async createPartToModel(
    input: CreateInput<PartToModelInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.partToModelRepository.createPartToModel(tx, values);
    });
  }

  async getAllModelsByPartId(input: GetAllModelsByPartIdInput) {
    return this.partToModelRepository.getAllModelsByPartId(this.db, input);
  }

  async getAllPartsByModelId(input: GetAllPartsByModelIdInput) {
    return this.partToModelRepository.getAllPartsByModelId(this.db, input);
  }

  async getModelsByPartIdSelect(input: GetSelectInput, partId: PartID) {
    return this.partToModelRepository.getModelsByPartIdSelect(
      this.db,
      input,
      partId,
    );
  }

  async getPartsByModelIdSelect(input: GetSelectInput, modelId: ModelID) {
    return this.partToModelRepository.getPartsByModelIdSelect(
      this.db,
      input,
      modelId,
    );
  }

  async getPartToModelById(partId: PartID, modelId: ModelID) {
    return this.partToModelRepository.getPartToModelById(this.db, {
      partId,
      modelId,
    });
  }

  async updatePartToModel(input: UpdateInput<PartToModelInput>) {
    return await this.db.transaction(async (tx) => {
      return this.partToModelRepository.updatePartToModel(tx, input);
    });
  }
}
