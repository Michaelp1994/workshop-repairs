import { manufacturerTable } from "../schemas/manufacturer.table";

export const manufacturerOrderMapping = {
  name: manufacturerTable.name,
  createdAt: manufacturerTable.createdAt,
  updatedAt: manufacturerTable.updatedAt,
};

export const manufacturerFilterMapping = {};
