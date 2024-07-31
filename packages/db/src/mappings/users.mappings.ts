import { userTypes } from "../schemas/user-types.schema";
import { users } from "../schemas/users.schema";

export const userOrderMapping = {
  firstName: users.firstName,
  email: users.email,
  type_name: userTypes.name,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export const userFilterMapping = {
  type: userTypes.id,
};
