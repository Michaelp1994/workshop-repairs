import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { partTable } from "../tables/part.sql";
import { repairPartTable } from "../tables/repair-part.sql";

const orderMapping = {
  name: partTable.partNumber,
  partNumber: partTable.partNumber,
  installed: repairPartTable.installed,
};

const filterMapping = {
  name: partTable.partNumber,
  partNumber: partTable.partNumber,
  installed: repairPartTable.installed,
};

const globalFilterColumns = [partTable.partNumber, partTable.name];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
