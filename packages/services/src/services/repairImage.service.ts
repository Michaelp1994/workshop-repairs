import type { RepairID, RepairImageID } from "@repo/validators/ids.validators";
import type {
  CountRepairImagesInput,
  GetAllRepairImagesInput,
} from "@repo/validators/server/repairImages.validators";

import { type Database } from "@repo/db";
import RepairImageRepository from "@repo/db/repositories/repairImage.repository";
import { randomUUID } from "crypto";

import type { RepairImageInput } from "../../../db/src/tables/repairImage.table";
import type { CreateInput, UpdateInput } from "../types";

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

export default class RepairImageService {
  constructor(
    private db: Database,
    private repairImageRepository: RepairImageRepository,
  ) {}

  async archiveRepairImage(id: RepairImageID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairImageRepository.archiveRepairImage(tx, metadata, id);
    });
  }

  async countRepairImages(input: CountRepairImagesInput) {
    return this.repairImageRepository.countRepairImages(this.db, input);
  }

  async createRepairImage(
    input: Omit<CreateInput<RepairImageInput>, "url"> & { fileName: string },
    session: OrganizationSession,
  ) {
    const fileExists = await fileExistsInS3(`repairImages/${input.fileName}`);

    if (!fileExists) {
      throw new Error("File does not exist.");
    }

    const createdRepairImage = await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        url: input.fileName,
        ...metadata,
      };
      return this.repairImageRepository.createRepairImage(tx, values);
    });

    return createdRepairImage;
  }

  async getAllRepairImagesByRepairId(repairId: RepairID) {
    return this.repairImageRepository.getAllRepairImagesByRepairId(
      this.db,
      repairId,
    );
  }

  async getAllRepairImages(input: GetAllRepairImagesInput) {
    return this.repairImageRepository.getAllRepairImages(this.db, input);
  }

  async getRepairImageById(id: RepairImageID) {
    return this.repairImageRepository.getRepairImageById(this.db, id);
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
      return this.repairImageRepository.updateRepairImage(tx, values, id);
    });
  }
}
