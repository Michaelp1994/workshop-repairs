import { parts } from "../schemas/parts.schema";

export const partOrderMapping = {
  name: parts.name,
  createdAt: parts.createdAt,
  updatedAt: parts.updatedAt,
  partNumber: parts.partNumber,
};

export const partFilterMapping = {
  // model_id: partsToModels.modelId,
};
