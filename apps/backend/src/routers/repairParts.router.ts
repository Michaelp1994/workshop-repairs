import {
  archiveRepairPartService,
  countRepairPartsService,
  createRepairPartService,
  getAllRepairPartsService,
  getRepairPartByIdService,
  updateRepairPartService,
} from "@repo/services/services/repairPart.service";
import {
  archiveRepairPartSchema,
  countRepairPartsSchema,
  createRepairPartSchema,
  getAllRepairPartsSchema,
  getRepairPartByIdSchema,
  updateRepairPartSchema,
} from "@repo/validators/server/repairParts.validators";
import { TRPCError } from "@trpc/server";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllRepairPartsSchema)
    .query(async ({ input, ctx }) => {
      const allRepairParts = getAllRepairPartsService(input, ctx.session);

      return allRepairParts;
    }),
  countAll: organizationProcedure
    .input(countRepairPartsSchema)
    .query(({ input, ctx }) => {
      const count = countRepairPartsService(input, ctx.session);
      return count;
    }),
  getById: organizationProcedure
    .input(getRepairPartByIdSchema)
    .query(async ({ input, ctx }) => {
      const repairPart = await getRepairPartByIdService(input.id, ctx.session);

      if (!repairPart) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairPart not found",
        });
      }

      return repairPart;
    }),
  create: organizationProcedure
    .input(createRepairPartSchema)
    .mutation(async ({ input, ctx }) => {
      const createdRepairPart = await createRepairPartService(
        input,
        ctx.session,
      );

      return createdRepairPart;
    }),
  update: organizationProcedure
    .input(updateRepairPartSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedRepairPart = await updateRepairPartService(
        values,
        id,
        ctx.session,
      );

      return updatedRepairPart;
    }),
  archive: organizationProcedure
    .input(archiveRepairPartSchema)
    .mutation(async ({ input, ctx }) => {
      const archivedRepairPart = await archiveRepairPartService(
        input.id,
        ctx.session,
      );

      return archivedRepairPart;
    }),
});
