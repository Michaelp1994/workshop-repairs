import { models } from "../schemas/models.schema";
import { parts } from "../schemas/parts.schema";
import { partsToModels } from "../schemas/parts-to-models.schema";

export const partsToModelsOrderMapping = {
  part_name: parts.name,
  part_partNumber: parts.partNumber,
  model_name: models.name,
  quantity: partsToModels.quantity,
};

export const partsToModelsFilterMapping = {
  part_id: partsToModels.partId,
  model_id: partsToModels.modelId,
};
