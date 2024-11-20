import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { manufacturerTable } from "../tables/manufacturer.sql";

const orderMapping = {
  name: manufacturerTable.name,
  createdAt: manufacturerTable.createdAt,
  updatedAt: manufacturerTable.updatedAt,
};

const filterMapping = {};

const globalFilterColumns = [manufacturerTable.name];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
