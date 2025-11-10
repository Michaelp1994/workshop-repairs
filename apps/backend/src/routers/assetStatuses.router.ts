import {
  archiveAssetStatusService,
  countAssetStatusesService,
  createAssetStatusService,
  getAllAssetStatusesService,
  getAssetStatusSelectService,
  getAssetStatusService,
  updateAssetStatusService,
} from "@repo/services/services/assetStatus.service";
import {
  archiveAssetStatusSchema,
  countAssetStatusesSchema,
  createAssetStatusSchema,
  getAllAssetStatusesSchema,
  getAssetStatusByIdSchema,
  getAssetStatusesSelectSchema,
  updateAssetStatusSchema,
} from "@repo/validators/server/assetStatuses.validators";
import { TRPCError } from "@trpc/server";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllAssetStatusesSchema)
    .query(async ({ input, ctx }) => {
      const allUserTypes = await getAllAssetStatusesService(input, ctx.session);
      return allUserTypes;
    }),
  countAll: organizationProcedure
    .input(countAssetStatusesSchema)
    .query(async ({ input, ctx }) => {
      const count = await countAssetStatusesService(input, ctx.session);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getAssetStatusesSelectSchema)
    .query(async ({ input, ctx }) => {
      const allUserTypes = await getAssetStatusSelectService(
        input,
        ctx.session,
      );
      return allUserTypes;
    }),
  getById: organizationProcedure
    .input(getAssetStatusByIdSchema)
    .query(async ({ input, ctx }) => {
      const userType = await getAssetStatusService(input.id, ctx.session);

      if (!userType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "userType not found",
        });
      }

      return userType;
    }),
  create: organizationProcedure
    .input(createAssetStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const createdUserType = await createAssetStatusService(
        input,
        ctx.session,
      );

      return createdUserType;
    }),
  update: organizationProcedure
    .input(updateAssetStatusSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedUserType = await updateAssetStatusService(
        values,
        id,
        ctx.session,
      );

      return updatedUserType;
    }),
  archive: organizationProcedure
    .input(archiveAssetStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const archivedUserType = await archiveAssetStatusService(
        input.id,
        ctx.session,
      );

      return archivedUserType;
    }),
});
