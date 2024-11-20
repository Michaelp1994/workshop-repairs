import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { partTable } from "../tables/part.sql";

const orderMapping = {
  name: partTable.name,
  createdAt: partTable.createdAt,
  updatedAt: partTable.updatedAt,
  partNumber: partTable.partNumber,
};

const filterMapping = {
  // model_id: partsToModels.modelId,
};

const globalFilterColumns = [partTable.name];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
