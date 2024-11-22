import {
  archiveUserType,
  countUserTypes,
  createUserType,
  getAllUserTypes,
  getUserTypeById,
  getUserTypesSelect,
  updateUserType,
} from "@repo/db/repositories/userType.repository";
import {
  archiveUserTypeSchema,
  createUserTypeSchema,
  getAllUserTypesSchema,
  getUserTypeByIdSchema,
  getUserTypesCountSchema,
  getUserTypeSelectSchema,
  updateUserTypeSchema,
} from "@repo/validators/server/userTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllUserTypesSchema)
    .query(async ({ input }) => {
      const allUserTypes = getAllUserTypes(input);
      return allUserTypes;
    }),
  countAll: organizationProcedure
    .input(getUserTypesCountSchema)
    .query(({ input }) => {
      const count = countUserTypes(input);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getUserTypeSelectSchema)
    .query(async ({ input }) => {
      const allUserTypes = getUserTypesSelect(input);
      return allUserTypes;
    }),
  getById: organizationProcedure
    .input(getUserTypeByIdSchema)
    .query(async ({ input }) => {
      const userType = await getUserTypeById(input.id);

      if (!userType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "userType not found",
        });
      }

      return userType;
    }),
  create: organizationProcedure
    .input(createUserTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdUserType = await createUserType({
        ...input,
        ...metadata,
      });
      if (!createdUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create user Type",
        });
      }

      return createdUserType;
    }),
  update: organizationProcedure
    .input(updateUserTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedUserType = await updateUserType({
        ...input,
        ...metadata,
      });

      if (!updatedUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update user Type",
        });
      }

      return updatedUserType;
    }),
  archive: organizationProcedure
    .input(archiveUserTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedUserType = await archiveUserType({
        ...input,
        ...metadata,
      });

      if (!archivedUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive user Type",
        });
      }

      return archivedUserType;
    }),
});
