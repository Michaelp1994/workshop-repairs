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

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function assetStatusRouter(
  assetStatusService: AssetStatusService,
) {
  return router({
    getAll: organizationProcedure
      .input(getAllAssetStatusesSchema)
      .query(async ({ input, ctx }) => {
        const allAssetStatuses = await assetStatusService.getAllAssetStatuses(
          input,
          ctx.session,
        );
        return allAssetStatuses;
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
        const allAssetStatuses = await assetStatusService.getAssetStatusSelect(
          input,
          ctx.session,
        );
        return allAssetStatuses;
      }),
    getById: organizationProcedure
      .input(getAssetStatusByIdSchema)
      .query(async ({ input, ctx }) => {
        const AssetStatus = await assetStatusService.getAssetStatus(
          input.id,
          ctx.session,
        );

        return AssetStatus;
      }),
    create: organizationProcedure
      .input(createAssetStatusSchema)
      .mutation(async ({ input, ctx }) => {
        const createdAssetStatus = await assetStatusService.createAssetStatus(
          input,
          ctx.session,
        );

        return createdAssetStatus;
      }),
    update: organizationProcedure
      .input(updateAssetStatusSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedAssetStatus = await assetStatusService.updateAssetStatus(
          values,
          id,
          ctx.session,
        );

        return updatedAssetStatus;
      }),
    archive: organizationProcedure
      .input(archiveAssetStatusSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedAssetStatus = await assetStatusService.archiveAssetStatus(
          input.id,
          ctx.session,
        );

        return archivedAssetStatus;
      }),
  });
}
