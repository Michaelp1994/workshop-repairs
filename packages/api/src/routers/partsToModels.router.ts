import * as controller from "@repo/db/controllers/partsToModels.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as partsToModelSchemas from "@repo/validators/partsToModel.validators";
import { TRPCError } from "@trpc/server";

import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(({ input }) => {
    const allParts = controller.getAll(input);
    return allParts;
  }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ input }) => {
      const count = await controller.getCount(input);

      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't get count",
        });
      }
      return count;
    }),
  getSelect: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const allParts = controller.getSelect(input);
    return allParts;
  }),
  create: organizationProcedure
    .input(partsToModelSchemas.create)
    .mutation(async ({ input }) => {
      const createdPartModel = await controller.create(input);

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
    .mutation(async ({ input }) => {
      const archivedPartModel = await controller.archive(input);

      if (!archivedPartModel) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive part model connection",
        });
      }

      return archivedPartModel;
    }),
});
