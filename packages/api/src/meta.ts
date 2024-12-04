import type { UserRolePermission } from "../../db/src/tables/user-role-permission.sql";

export interface Meta {
  action: UserRolePermission["action"];
  entity: UserRolePermission["entity"];
}
