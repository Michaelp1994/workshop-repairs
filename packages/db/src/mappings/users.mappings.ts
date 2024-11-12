import { userTable } from "../schemas/user.table";
import { userTypeTable } from "../schemas/user-type.table";

export const userOrderMapping = {
  firstName: userTable.firstName,
  email: userTable.email,
  type_name: userTypeTable.name,
  createdAt: userTable.createdAt,
  updatedAt: userTable.updatedAt,
};

export const userFilterMapping = {
  type: userTypeTable.id,
};
