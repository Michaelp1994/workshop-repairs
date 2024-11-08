import { modelTable } from "../schemas/model.table";
import { partTable } from "../schemas/part.table";
import { partsToModelTable } from "../schemas/parts-to-model.table";

export const partsToModelsOrderMapping = {
  part_name: partTable.name,
  part_partNumber: partTable.partNumber,
  model_name: modelTable.name,
  quantity: partsToModelTable.quantity,
};

export const partsToModelsFilterMapping = {
  part_id: partsToModelTable.partId,
  model_id: partsToModelTable.modelId,
};
