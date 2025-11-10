import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { modelTable } from "../tables/model.sql";
import { partTable } from "../tables/part.sql";
import { partToModelTable } from "../tables/part-to-model.sql";

const orderMapping = {
  part_name: partTable.name,
  part_partNumber: partTable.partNumber,
  model_name: modelTable.name,
  quantity: partToModelTable.quantity,
};

const filterMapping = {
  part_id: partToModelTable.partId,
  model_id: partToModelTable.modelId,
};

const globalFilterColumns = [
  partTable.name,
  partTable.partNumber,
  modelTable.name,
];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
