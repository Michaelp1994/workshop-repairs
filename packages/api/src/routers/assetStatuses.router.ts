import * as assetStatusesController from "@repo/db/controllers/assetStatuses.controller";
import * as userTypeSchemas from "@repo/validators/assetStatuses.validators";
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
    const allUserTypes = assetStatusesController.getAll(input);
    return allUserTypes;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = assetStatusesController.getCount(input);
    return count;
  }),
  getSelect: organizationProcedure.input(getSelectSchema).query(({ input }) => {
    const allUserTypes = assetStatusesController.getSelect(input);
    return allUserTypes;
  }),
  getById: organizationProcedure
    .input(userTypeSchemas.getById)
    .query(async ({ input }) => {
      const userType = await assetStatusesController.getById(input.id);

      if (!userType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "userType not found",
        });
      }

      return userType;
    }),
  create: organizationProcedure
    .input(userTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdUserType = await assetStatusesController.create({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(createdUserType);

      return createdUserType;
    }),
  update: organizationProcedure
    .input(userTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedUserType = await assetStatusesController.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedUserType);

      return updatedUserType;
    }),
  archive: organizationProcedure
    .input(userTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedUserType = await assetStatusesController.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedUserType);

      return archivedUserType;
    }),
});
