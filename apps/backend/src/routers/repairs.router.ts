import RepairService from "@repo/services/services/repair.service";
import {
  archiveRepairSchema,
  countRepairsSchema,
  createRepairSchema,
  getAllRepairsSchema,
  getRepairBySlugSchema,
  getRepairsSelectSchema,
  updateRepairSchema,
} from "@repo/validators/server/repairs.validators";
import { TRPCError } from "@trpc/server";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function Router(repairService: RepairService) {
  return router({
    getAll: organizationProcedure
      .input(getAllRepairsSchema)
      .query(async ({ ctx, input }) => {
        const allRepairs = await repairService.getAllRepairs(
          input,
          ctx.session,
        );
        return allRepairs;
      }),

    countAll: organizationProcedure
      .input(countRepairsSchema)
      .query(async ({ ctx, input }) => {
        const count = await repairService.countRepairs(input, ctx.session);
        if (count === undefined) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "can't count repairs",
          });
        }
        return count;
      }),

    getSelect: organizationProcedure
      .input(getRepairsSelectSchema)
      .query(async ({ input, ctx }) => {
        const allRepairs = await repairService.getRepairsSelect(
          input,
          ctx.session,
        );
        return allRepairs;
      }),

    getBySlug: organizationProcedure
      .input(getRepairBySlugSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.slug);
        const repair = await repairService.getRepair(localId, ctx.session);

        if (!repair) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        return repair;
      }),

    create: organizationProcedure
      .input(createRepairSchema)
      .mutation(async ({ input, ctx }) => {
        const repair = await repairService.createRepair(input, ctx.session);

        return repair;
      }),

    update: organizationProcedure
      .input(updateRepairSchema)
      .mutation(async ({ input: { slug, ...values }, ctx }) => {
        const { localId } = splitSlug(slug);

        const updatedRepair = await repairService.updateRepair(
          values,
          localId,
          ctx.session,
        );

        return updatedRepair;
      }),

    archive: organizationProcedure
      .input(archiveRepairSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.slug);

        const archivedRepair = await repairService.archiveRepair(
          localId,
          ctx.session,
        );

        return archivedRepair;
      }),
  });
}
