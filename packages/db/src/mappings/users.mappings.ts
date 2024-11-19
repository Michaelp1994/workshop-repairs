import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { userTable } from "../tables/user.sql";
import { userTypeTable } from "../tables/user-type.sql";

export const orderMapping = {
  firstName: userTable.firstName,
  email: userTable.email,
  type_name: userTypeTable.name,
  createdAt: userTable.createdAt,
  updatedAt: userTable.updatedAt,
};

export const filterMapping = {
  type: userTypeTable.id,
};

const globalFilterColumns = [userTable.firstName, userTable.email];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
