import { getCredentialsByUserId } from "@repo/db/repositories/user.repository";
import { getPermissionsByRoleId } from "@repo/db/repositories/userRolePermission.repository";
import { initTRPC, TRPCError } from "@trpc/server";

import type { Meta } from "../meta";

import { Context } from "../createContext";

export default function createOrganizationMiddleware() {
  const t = initTRPC.context<Context>().meta<Meta>().create();

  return {
    pluginProc: t.procedure.use(async ({ ctx, next, meta }) => {
      if (!ctx.session || !ctx.session.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const user = await getCredentialsByUserId(ctx.session.userId);
      if (!user || !user.organizationId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      if (meta) {
        const permissions = await getPermissionsByRoleId(user.roleId);
        if (!permissions) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const hasPermission = permissions.find(
          (permission) =>
            permission.action === meta.action &&
            permission.entity === meta.entity,
        );

        if (!hasPermission) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
      }

      return next({
        ctx: {
          session: {
            userId: ctx.session.userId,
            organizationId: user.organizationId,
          },
        },
      });
    }),
  };
}
