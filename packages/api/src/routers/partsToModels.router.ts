import * as controller from "@repo/db/controllers/partsToModels.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as partsToModelSchemas from "@repo/validators/partsToModel.validators";
import { TRPCError } from "@trpc/server";

import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(({ ctx, input }) => {
    const allParts = controller.getAll(input, ctx.db);
    return allParts;
  }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ input, ctx }) => {
      const count = await controller.getCount(input, ctx.db);

      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't get count",
        });
      }
      return count;
    }),
  getSelect: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const allParts = controller.getSelect(input, ctx.db);
      return allParts;
    }),
  create: organizationProcedure
    .input(partsToModelSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const createdPartModel = await controller.create(input, ctx.db);

      if (!createdPartModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create part model connection",
        });
      }

      return createdPartModel;
    }),
  archive: organizationProcedure
    .input(partsToModelSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const archivedPartModel = await controller.archive(input, ctx.db);

      if (!archivedPartModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive part model connection",
        });
      }

      return archivedPartModel;
    }),
});
