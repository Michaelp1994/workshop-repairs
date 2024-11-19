import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { locationTable } from "../tables/location.sql";

const orderMapping = {
  name: locationTable.name,
  address: locationTable.address,
  createdAt: locationTable.createdAt,
  updatedAt: locationTable.updatedAt,
};

const filterMapping = {};

const globalFilterColumns = [locationTable.name];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
