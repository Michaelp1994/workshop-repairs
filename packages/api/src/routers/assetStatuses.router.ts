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
  archiveAssetStatusSchema,
  createAssetStatusSchema,
  getAssetStatusByIdSchema,
  updateAssetStatusSchema,
} from "@repo/validators/assetStatuses.validators";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allUserTypes = getAllAssetStatuses(input);
    return allUserTypes;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
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
      const metadata = createMetadata(ctx.session);
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
      const metadata = updateMetadata(ctx.session);
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
      const metadata = archiveMetadata(ctx.session);
      const archivedUserType = await archiveAssetStatus({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedUserType);

      return archivedUserType;
    }),
});
