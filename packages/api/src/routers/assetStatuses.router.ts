import {
  archiveAssetStatus,
  countAssetStatuses,
  createAssetStatus,
  getAllAssetStatuses,
  getAssetStatusById,
  getAssetStatusSelect,
  updateAssetStatus,
} from "@repo/db/repositories/assetStatus.repository";
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

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllAssetStatusesSchema)
    .query(async ({ input }) => {
      const allAssetStatuses = getAllAssetStatuses(input);
      return allAssetStatuses;
    }),
  countAll: organizationProcedure
    .input(countAssetStatusesSchema)
    .query(({ input }) => {
      const count = countAssetStatuses(input);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getAssetStatusesSelectSchema)
    .query(({ input }) => {
      const allAssetStatuses = getAssetStatusSelect(input);
      return allAssetStatuses;
    }),
  getById: organizationProcedure
    .input(getAssetStatusByIdSchema)
    .query(async ({ input }) => {
      const AssetStatus = await getAssetStatusById(input.id);

      if (!AssetStatus) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User Status not found",
        });
      }

      return AssetStatus;
    }),
  create: organizationProcedure
    .input(createAssetStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdAssetStatus = await createAssetStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdAssetStatus);

      return createdAssetStatus;
    }),
  update: organizationProcedure
    .input(updateAssetStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedAssetStatus = await updateAssetStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedAssetStatus);

      return updatedAssetStatus;
    }),
  archive: organizationProcedure
    .input(archiveAssetStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedAssetStatus = await archiveAssetStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedAssetStatus);

      return archivedAssetStatus;
    }),
});
