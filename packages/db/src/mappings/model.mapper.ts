import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelTable } from "../tables/model.sql";

const orderMapping = {
  name: modelTable.name,
  nickname: modelTable.nickname,
  createdAt: modelTable.createdAt,
  updatedAt: modelTable.updatedAt,
  manufacturer_name: manufacturerTable.name,
};

const filterMapping = {
  manufacturer_id: manufacturerTable.id,
};

const globalFilterColumns = [
  modelTable.name,
  modelTable.nickname,
  manufacturerTable.name,
];

export const createGlobalFilters =
  createGlobalFilterFunction(globalFilterColumns);

export const createColumnFilters = createColumnFilterFunction(filterMapping);

export const createSortOrder = createOrderByFunction(orderMapping);
