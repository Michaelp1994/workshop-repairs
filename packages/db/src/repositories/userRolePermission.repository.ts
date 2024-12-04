import { eq } from "drizzle-orm";

import type { UserRoleID } from "../tables/user-role.sql";

import { db } from "..";
import { userRolePermissionTable } from "../tables/user-role-permission.sql";

export async function getPermissionsByRoleId(roleId: UserRoleID) {
  const query = db
    .select({
      action: userRolePermissionTable.action,
      entity: userRolePermissionTable.entity,
    })
    .from(userRolePermissionTable)
    .where(eq(userRolePermissionTable.roleId, roleId));
  return await query.execute();
}
