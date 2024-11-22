import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { clientTable } from "../tables/client.sql";

const clientOrderMapping = {
  name: clientTable.name,
  createdAt: clientTable.createdAt,
  updatedAt: clientTable.updatedAt,
};

const clientFilterMapping = {};

const globalFilterColumns = [clientTable.name];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(clientFilterMapping);

export const getOrderBy = createOrderByFunction(clientOrderMapping);
