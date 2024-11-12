import { partTable } from "../schemas/part.table";

export const partOrderMapping = {
  name: partTable.name,
  createdAt: partTable.createdAt,
  updatedAt: partTable.updatedAt,
  partNumber: partTable.partNumber,
};

export const partFilterMapping = {
  // model_id: partsToModels.modelId,
};
