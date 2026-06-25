import { randomUUID } from "crypto";

import type { RepairImageInput } from "../tables/repairImage.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";
import type { RepairImageID } from "../validators/ids.validators";

import { type Database } from "../db";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import {
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
} from "../helpers/s3";
import RepairRepository from "../repositories/repair.repository";
import RepairImageRepository from "../repositories/repairImage.repository";

export default class RepairImageService {
  constructor(
    private db: Database,
    private repairImageRepository: RepairImageRepository,
    private repairRepository: RepairRepository,
  ) {}

  async archiveRepairImage(id: RepairImageID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairImageRepository.archive(tx, metadata, id);
    });
  }

  async countRepairImages(input: CountInput) {
    return this.repairImageRepository.count(this.db, input);
  }

  async createRepairImage(
    input: Omit<CreateInput<RepairImageInput>, "url" | "repairId"> & {
      fileName: string;
      repairLocalId: number;
    },
    session: OrganizationSession,
  ) {
    const fileExists = await fileExistsInS3(`repairImages/${input.fileName}`);

    if (!fileExists) {
      throw new Error("File does not exist.");
    }

    const createdRepairImage = await this.db.transaction(async (tx) => {
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
        url: input.fileName,
        ...metadata,
      };
      return this.repairImageRepository.create(tx, values);
    });

    return createdRepairImage;
  }

  async getAllRepairImages(input: GetAllInput) {
    return this.repairImageRepository.getAll(this.db, input);
  }

  async getAllRepairImagesByRepairId(
    repairLocalId: number,
    session: OrganizationSession,
  ) {
    const repair = await this.repairRepository.getByLocalId(
      this.db,
      repairLocalId,
      session.organizationId,
    );
    return this.repairImageRepository.getAllByRepairId(this.db, repair.id);
  }

  async getRepairImageById(id: RepairImageID) {
    return this.repairImageRepository.getById(this.db, id);
  }

  async requestUploadRepairImage(input: {
    fileType: string;
    fileSize: number;
  }) {
    const uuid = randomUUID();
    const fileExt = getFileExtension(input.fileType);
    const fileName = `${uuid}.${fileExt}`;
    const presignedUrl = await createPresignedUrl({
      Key: `repairImages/${fileName}`,
    });
    return { url: presignedUrl, fileName };
  }

  async updateRepairImage(
    input: UpdateInput<RepairImageInput>,
    id: RepairImageID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairImageRepository.update(tx, values, id);
    });
  }
}
