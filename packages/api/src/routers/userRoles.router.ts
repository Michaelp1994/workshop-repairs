import {
  archiveUserRole,
  countUserRoles,
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  getUserRolesSelect,
  updateUserRole,
} from "@repo/db/repositories/userRole.repository";
import {
  archiveUserRoleSchema,
  countUserRolesSchema,
  createUserRoleSchema,
  getAllUserRolesSchema,
  getUserRoleByIdSchema,
  getUserRoleSelectSchema,
  updateUserRoleSchema,
} from "@repo/validators/server/userRoles.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllUserRolesSchema)
    .query(async ({ input }) => {
      const allUserRoles = getAllUserRoles(input);
      return allUserRoles;
    }),
  countAll: organizationProcedure
    .input(countUserRolesSchema)
    .query(({ input }) => {
      const count = countUserRoles(input);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getUserRoleSelectSchema)
    .query(async ({ input }) => {
      const allUserRoles = getUserRolesSelect(input);
      return allUserRoles;
    }),
  getById: organizationProcedure
    .input(getUserRoleByIdSchema)
    .query(async ({ input }) => {
      const userRole = await getUserRoleById(input.id);

      if (!userRole) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "userRole not found",
        });
      }

      return userRole;
    }),
  create: organizationProcedure
    .input(createUserRoleSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdUserRole = await createUserRole({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });
      if (!createdUserRole) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create User Role",
        });
      }

      return createdUserRole;
    }),
  update: organizationProcedure
    .input(updateUserRoleSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedUserRole = await updateUserRole({
        ...input,
        ...metadata,
      });

      if (!updatedUserRole) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update User Role",
        });
      }

      return updatedUserRole;
    }),
  archive: organizationProcedure
    .input(archiveUserRoleSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedUserRole = await archiveUserRole({
        ...input,
        ...metadata,
      });

      if (!archivedUserRole) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive User Role",
        });
      }

      return archivedUserRole;
    }),
});
