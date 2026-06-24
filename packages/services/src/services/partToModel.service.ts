import type { GetSelectInput } from "@repo/validators/server/dataTables.validators";

import { type Database } from "@repo/db";
import ModelRepository from "@repo/db/repositories/model.repository";
import PartRepository from "@repo/db/repositories/part.repository";
import PartToModelRepository from "@repo/db/repositories/partToModel.repository";

import type { PartToModelInput } from "../../../db/src/tables/partToModel.table";
import type { CountInput, GetAllInput, UpdateInput } from "../types";

import {
  createInsertMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class PartToModelService {
  constructor(
    private db: Database,
    private partToModelRepository: PartToModelRepository,
    private modelRepository: ModelRepository,
    private partRepository: PartRepository,
  ) {}

  async archivePartToModel(
    {
      partLocalId,
      modelLocalId,
    }: { partLocalId: number; modelLocalId: number },
    session: OrganizationSession,
  ) {
    const [part, model] = await Promise.all([
      this.partRepository.getByLocalId(
        this.db,
        partLocalId,
        session.organizationId,
      ),
      this.modelRepository.getByLocalId(
        this.db,
        modelLocalId,
        session.organizationId,
      ),
    ]);
    return await this.db.transaction(async (tx) => {
      return this.partToModelRepository.archive(tx, {
        partId: part.id,
        modelId: model.id,
      });
    });
  }

  async countAllModelsByPartId(
    input: CountInput<{ partLocalId: number }>,
    session: OrganizationSession,
  ) {
    const part = await this.partRepository.getByLocalId(
      this.db,
      input.filters.partLocalId,
      session.organizationId,
    );
    return this.partToModelRepository.countAllModelsByPartId(this.db, {
      ...input,
      filters: { partId: part.id },
    });
  }

  async countAllPartsByModelId(
    input: CountInput<{ modelLocalId: number }>,
    session: OrganizationSession,
  ) {
    const model = await this.modelRepository.getByLocalId(
      this.db,
      input.filters.modelLocalId,
      session.organizationId,
    );
    return this.partToModelRepository.countAllPartsByModelId(this.db, {
      ...input,
      filters: { modelId: model.id },
    });
  }

  async createPartToModel(
    input: Omit<UpdateInput<PartToModelInput>, "partId" | "modelId"> & {
      partLocalId: number;
      modelLocalId: number;
    },
    session: OrganizationSession,
  ) {
    const [part, model] = await Promise.all([
      this.partRepository.getByLocalId(
        this.db,
        input.partLocalId,
        session.organizationId,
      ),
      this.modelRepository.getByLocalId(
        this.db,
        input.modelLocalId,
        session.organizationId,
      ),
    ]);
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const { partLocalId: _, modelLocalId: __, ...rest } = input;
      const values = {
        ...rest,
        partId: part.id,
        modelId: model.id,
        ...metadata,
      };
      return this.partToModelRepository.create(tx, values);
    });
  }

  async getAllModelsByPartId(
    input: GetAllInput<{ partLocalId: number }>,
    session: OrganizationSession,
  ) {
    const part = await this.partRepository.getByLocalId(
      this.db,
      input.filters.partLocalId,
      session.organizationId,
    );
    return this.partToModelRepository.getAllModelsByPartId(this.db, {
      ...input,
      filters: { partId: part.id },
    });
  }

  async getAllPartsByModelId(
    input: GetAllInput<{ modelLocalId: number }>,
    session: OrganizationSession,
  ) {
    const model = await this.modelRepository.getByLocalId(
      this.db,
      input.filters.modelLocalId,
      session.organizationId,
    );
    return this.partToModelRepository.getAllPartsByModelId(this.db, {
      ...input,
      filters: { modelId: model.id },
    });
  }

  async getModelsByPartIdSelect(
    input: GetSelectInput,
    partLocalId: number,
    session: OrganizationSession,
  ) {
    const part = await this.partRepository.getByLocalId(
      this.db,
      partLocalId,
      session.organizationId,
    );
    return this.partToModelRepository.getModelsByPartIdSelect(
      this.db,
      input,
      part.id,
    );
  }

  async getPartsByModelIdSelect(
    input: GetSelectInput,
    modelLocalId: number,
    session: OrganizationSession,
  ) {
    const model = await this.modelRepository.getByLocalId(
      this.db,
      modelLocalId,
      session.organizationId,
    );
    return this.partToModelRepository.getPartsByModelIdSelect(
      this.db,
      input,
      model.id,
    );
  }

  async getPartToModelById(
    partLocalId: number,
    modelLocalId: number,
    session: OrganizationSession,
  ) {
    const [part, model] = await Promise.all([
      this.partRepository.getByLocalId(
        this.db,
        partLocalId,
        session.organizationId,
      ),
      this.modelRepository.getByLocalId(
        this.db,
        modelLocalId,
        session.organizationId,
      ),
    ]);
    return this.partToModelRepository.getById(this.db, {
      partId: part.id,
      modelId: model.id,
    });
  }

  async updatePartToModel(
    input: UpdateInput<PartToModelInput>,
    partLocalId: number,
    modelLocalId: number,
    session: OrganizationSession,
  ) {
    const [part, model] = await Promise.all([
      this.partRepository.getByLocalId(
        this.db,
        partLocalId,
        session.organizationId,
      ),
      this.modelRepository.getByLocalId(
        this.db,
        modelLocalId,
        session.organizationId,
      ),
    ]);
    return await this.db.transaction(async (tx) => {
      return this.partToModelRepository.update(tx, input, {
        partId: part.id,
        modelId: model.id,
      });
    });
  }
}
