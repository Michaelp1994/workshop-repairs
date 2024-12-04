import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { userRoleTable } from "../tables/user-role.sql";
import { userTable } from "../tables/user.sql";

export const orderMapping = {
  firstName: userTable.firstName,
  email: userTable.email,
  role_name: userRoleTable.name,
  createdAt: userTable.createdAt,
  updatedAt: userTable.updatedAt,
};

export const filterMapping = {
  role: userRoleTable.id,
};

const globalFilterColumns = [userTable.firstName, userTable.email];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
