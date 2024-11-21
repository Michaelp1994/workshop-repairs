import {
  archiveAssetStatus,
  createAssetStatus,
  getAllAssetStatuses,
  getAssetStatusById,
  getAssetStatusesCount,
  getAssetStatusSelect,
  updateAssetStatus,
} from "@repo/db/repositories/assetStatus.repository";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveAssetStatusSchema,
  createAssetStatusSchema,
  getAssetStatusByIdSchema,
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
    .input(dataTableSchema)
    .query(async ({ input }) => {
      const allUserTypes = getAllAssetStatuses(input);
      return allUserTypes;
    }),
  getCount: organizationProcedure
    .input(dataTableCountSchema)
    .query(({ input }) => {
      const count = getAssetStatusesCount(input);
      return count;
    }),
  getSelect: organizationProcedure.input(getSelectSchema).query(({ input }) => {
    const allUserTypes = getAssetStatusSelect(input);
    return allUserTypes;
  }),
  getById: organizationProcedure
    .input(getAssetStatusByIdSchema)
    .query(async ({ input }) => {
      const userType = await getAssetStatusById(input.id);

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
      const metadata = createInsertMetadata(ctx.session);
      const createdUserType = await createAssetStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdUserType);

      return createdUserType;
    }),
  update: organizationProcedure
    .input(updateAssetStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedUserType = await updateAssetStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedUserType);

      return updatedUserType;
    }),
  archive: organizationProcedure
    .input(archiveAssetStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedUserType = await archiveAssetStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedUserType);

      return archivedUserType;
    }),
});
