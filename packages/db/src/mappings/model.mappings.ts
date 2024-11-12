import { manufacturerTable } from "../schemas/manufacturer.table";
import { modelTable } from "../schemas/model.table";

export const modelOrderMapping = {
  name: modelTable.name,
  nickname: modelTable.nickname,
  createdAt: modelTable.createdAt,
  updatedAt: modelTable.updatedAt,
  manufacturer_name: manufacturerTable.name,
};

export const modelFilterMapping = {
  manufacturer_id: manufacturerTable.id,
};
