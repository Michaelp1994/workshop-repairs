import { randomUUID } from "crypto";

import type { ModelImageInput } from "../tables/modelImage.table";
import type { CountInput, GetAllInput, UpdateInput } from "./types";
import type { ModelImageID } from "../validators/ids.validators";

import { type Database } from "../db";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import {
  createModelImageKeyFromFileName,
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
} from "../helpers/s3";
import ModelRepository from "../repositories/model.repository";
import ModelImageRepository from "../repositories/modelImage.repository";

export default class ModelImageService {
  constructor(
    private db: Database,
    private modelImageRepository: ModelImageRepository,
    private modelRepository: ModelRepository,
  ) {}
  async archiveModelImage(id: ModelImageID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.modelImageRepository.archive(tx, metadata, id);
    });
  }

  async countModelImages(input: CountInput, _session: OrganizationSession) {
    return this.modelImageRepository.count(this.db, input);
  }

  async createModelImage(
    input: { fileName: string; modelLocalId: number; caption: string },
    session: OrganizationSession,
  ) {
    const fileExists = await fileExistsInS3(
      createModelImageKeyFromFileName(input.fileName),
    );
    if (!fileExists) {
      throw new Error("File does not exist.");
    }
    const model = await this.modelRepository.getByLocalId(
      this.db,
      input.modelLocalId,
      session.organizationId,
    );
    const modelImages = await this.modelImageRepository.getAllByModelId(
      this.db,
      model.id,
    );
    const isFirstImage = modelImages.length === 0;

    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        caption: input.caption,
        modelId: model.id,
        url: input.fileName,
        ...metadata,
      };
      const createdModelImage = await this.modelImageRepository.create(
        tx,
        values,
      );

      if (isFirstImage) {
        const modelMetadata = createUpdateMetadata(session);
        //TODO: fixme
        await this.modelRepository.update(tx, {
          defaultImageId: createdModelImage.id,
          ...modelMetadata,
        });
      }

      return createdModelImage;
    });
  }

  async getAllModelImages(input: GetAllInput, _session: OrganizationSession) {
    return this.modelImageRepository.getAll(this.db, input);
  }

  async getAllModelImagesByModelId(
    modelLocalId: number,
    session: OrganizationSession,
  ) {
    const model = await this.modelRepository.getByLocalId(
      this.db,
      modelLocalId,
      session.organizationId,
    );
    return this.modelImageRepository.getAllByModelId(this.db, model.id);
  }

  async getModelImageById(id: ModelImageID, _session: OrganizationSession) {
    return this.modelImageRepository.getById(this.db, id);
  }

  async requestUploadModelImage(
    input: { fileType: string },
    _session: OrganizationSession,
  ) {
    const uuid = randomUUID();
    const fileExt = getFileExtension(input.fileType);
    const fileName = `${uuid}.${fileExt}`;
    const presignedUrl = await createPresignedUrl({
      Key: createModelImageKeyFromFileName(fileName),
    });
    return { url: presignedUrl, fileName };
  }

  async setFavouriteModelImage(
    input: { id: ModelImageID },
    session: OrganizationSession,
  ) {
    const modelImage = await this.modelImageRepository.getById(
      this.db,
      input.id,
    );

    const metadata = createUpdateMetadata(session);
    //TODO: fixme
    await this.modelRepository.update(this.db, {
      id: modelImage.modelId,
      defaultImageId: modelImage.id,
      ...metadata,
    });

    return modelImage;
  }

  async updateModelImage(
    input: UpdateInput<ModelImageInput>,
    id: ModelImageID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.modelImageRepository.update(tx, values, id);
    });
  }
}
