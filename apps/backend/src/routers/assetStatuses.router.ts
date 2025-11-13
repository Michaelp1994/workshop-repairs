import AssetStatusService from "@repo/services/services/assetStatus.service";
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

export default function assetStatusRouter(
  assetStatusService: AssetStatusService,
) {
  return router({
    getAll: organizationProcedure
      .input(getAllAssetStatusesSchema)
      .query(async ({ input, ctx }) => {
        const allUserTypes = await assetStatusService.getAllAssetStatuses(
          input,
          ctx.session,
        );
        return allUserTypes;
      }),
    countAll: organizationProcedure
      .input(countAssetStatusesSchema)
      .query(async ({ input, ctx }) => {
        const count = await assetStatusService.countAssetStatuses(
          input,
          ctx.session,
        );
        return count;
      }),
    getSelect: organizationProcedure
      .input(getAssetStatusesSelectSchema)
      .query(async ({ input, ctx }) => {
        const allUserTypes = await assetStatusService.getAssetStatusSelect(
          input,
          ctx.session,
        );
        return allUserTypes;
      }),
    getById: organizationProcedure
      .input(getAssetStatusByIdSchema)
      .query(async ({ input, ctx }) => {
        const userType = await assetStatusService.getAssetStatus(
          input.id,
          ctx.session,
        );

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
        const createdUserType = await assetStatusService.createAssetStatus(
          input,
          ctx.session,
        );

        return createdUserType;
      }),
    update: organizationProcedure
      .input(updateAssetStatusSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedUserType = await assetStatusService.updateAssetStatus(
          values,
          id,
          ctx.session,
        );

        return updatedUserType;
      }),
    archive: organizationProcedure
      .input(archiveAssetStatusSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedUserType = await assetStatusService.archiveAssetStatus(
          input.id,
          ctx.session,
        );

        return archivedUserType;
      }),
  });
}
