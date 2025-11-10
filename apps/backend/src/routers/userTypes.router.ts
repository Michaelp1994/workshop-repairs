import {
  archiveUserTypeService,
  countUserTypesService,
  createUserTypeService,
  getAllUserTypesService,
  getUserTypeByIdService,
  getUserTypesSelectService,
  updateUserTypeService,
} from "@repo/services/services/userType.service";
import {
  archiveUserTypeSchema,
  countUserTypesSchema,
  createUserTypeSchema,
  getAllUserTypesSchema,
  getUserTypeByIdSchema,
  getUserTypeSelectSchema,
  updateUserTypeSchema,
} from "@repo/validators/server/userTypes.validators";
import { TRPCError } from "@trpc/server";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllUserTypesSchema)
    .query(async ({ input, ctx }) => {
      const allUserTypes = getAllUserTypesService(input, ctx.session);
      return allUserTypes;
    }),
  countAll: organizationProcedure
    .input(countUserTypesSchema)
    .query(({ input, ctx }) => {
      const count = countUserTypesService(input, ctx.session);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getUserTypeSelectSchema)
    .query(async ({ input, ctx }) => {
      const allUserTypes = getUserTypesSelectService(input, ctx.session);
      return allUserTypes;
    }),
  getById: organizationProcedure
    .input(getUserTypeByIdSchema)
    .query(async ({ input, ctx }) => {
      const userType = await getUserTypeByIdService(input.id, ctx.session);

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
      const createdUserType = await createUserTypeService(input, ctx.session);
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
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedUserType = await updateUserTypeService(
        values,
        id,
        ctx.session,
      );

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
      const archivedUserType = await archiveUserTypeService(
        input.id,
        ctx.session,
      );

      if (!archivedUserType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive user Type",
        });
      }

      return archivedUserType;
    }),
});
