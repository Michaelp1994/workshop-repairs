import type { ModelID, ModelImageID } from "@repo/validators/ids.validators";
import type {
  CountModelImagesInput,
  GetAllModelImagesInput,
} from "@repo/validators/server/modelImages.validators";

import { type Database } from "@repo/db";
import ModelRepository from "@repo/db/repositories/model.repository";
import ModelImageRepository from "@repo/db/repositories/modelImage.repository";
import { randomUUID } from "crypto";

import type { ModelImageInput } from "../../../db/src/tables/modelImage.table";
import type { UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
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

  async countModelImages(
    input: CountModelImagesInput,
    _session: OrganizationSession,
  ) {
    return this.modelImageRepository.count(this.db, input);
  }

  async createModelImage(
    input: { fileName: string; modelId: ModelID; caption: string },
    session: OrganizationSession,
  ) {
    const fileExists = await fileExistsInS3(
      createModelImageKeyFromFileName(input.fileName),
    );
    if (!fileExists) {
      throw new Error("File does not exist.");
    }
    const modelImages = await this.modelImageRepository.getAllByModelId(
      this.db,
      input.modelId,
    );
    const isFirstImage = modelImages.length === 0;

    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        url: input.fileName,
        ...metadata,
      };
      const createdModelImage = await this.modelImageRepository.create(
        tx,
        values,
      );
      assertDatabaseResult(createdModelImage);
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

  async getAllModelImages(
    input: GetAllModelImagesInput,
    _session: OrganizationSession,
  ) {
    return this.modelImageRepository.getAll(this.db, input);
  }

  async getAllModelImagesByModelId(id: ModelID, _session: OrganizationSession) {
    return this.modelImageRepository.getAllByModelId(this.db, id);
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
    assertDatabaseResult(modelImage);

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
