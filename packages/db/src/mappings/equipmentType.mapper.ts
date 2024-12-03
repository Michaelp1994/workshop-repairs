import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { equipmentTypeTable } from "../tables/equipment-type.sql";

const orderMapping = {
  name: equipmentTypeTable.name,
  createdAt: equipmentTypeTable.createdAt,
  updatedAt: equipmentTypeTable.updatedAt,
};

const filterMapping = {};

const globalFilterColumns = [equipmentTypeTable.name];

export const createGlobalFilters =
  createGlobalFilterFunction(globalFilterColumns);

export const createColumnFilters = createColumnFilterFunction(filterMapping);

export const createSortOrder = createOrderByFunction(orderMapping);
