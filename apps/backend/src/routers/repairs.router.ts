import RepairService from "../services/repair.service";
import {
  archiveRepairSchema,
  countRepairsSchema,
  createRepairSchema,
  getAllRepairsSchema,
  getRepairByIdSchema,
  getRepairsSelectSchema,
  type RepairFilters,
  updateRepairSchema,
} from "../validators/repairs.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

function repairFilters(filters: RepairFilters) {
  return {
    assetLocalId: filters.assetId
      ? splitSlug(filters.assetId).localId
      : undefined,
    clientLocalId: filters.clientId
      ? splitSlug(filters.clientId).localId
      : undefined,
  };
}

export default function Router(repairService: RepairService) {
  return router({
    getAll: organizationProcedure
      .input(getAllRepairsSchema)
      .query(async ({ ctx, input: { filters, ...rest } }) => {
        const allRepairs = await repairService.getAllRepairs(
          { ...rest, filters: repairFilters(filters) },
          ctx.session,
        );
        return allRepairs;
      }),

    countAll: organizationProcedure
      .input(countRepairsSchema)
      .query(async ({ ctx, input: { filters, ...rest } }) => {
        const count = await repairService.countRepairs(
          { ...rest, filters: repairFilters(filters) },
          ctx.session,
        );

        return count;
      }),

    getSelect: organizationProcedure
      .input(getRepairsSelectSchema)
      .query(async ({ input: { filters, ...rest }, ctx }) => {
        const allRepairs = await repairService.getRepairsSelect(
          { ...rest, filters: repairFilters(filters) },
          ctx.session,
        );
        return allRepairs;
      }),

    getById: organizationProcedure
      .input(getRepairByIdSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);
        const repair = await repairService.getRepair(localId, ctx.session);

        return repair;
      }),

    create: organizationProcedure
      .input(createRepairSchema)
      .mutation(async ({ input, ctx }) => {
        const { clientId, assetId, ...rest } = input;
        const repair = await repairService.createRepair(
          {
            ...rest,
            clientLocalId: splitSlug(clientId).localId,
            assetLocalId: splitSlug(assetId).localId,
          },
          ctx.session,
        );

        return repair;
      }),

    update: organizationProcedure
      .input(updateRepairSchema)
      .mutation(
        async ({ input: { id, clientId, assetId, ...values }, ctx }) => {
          const { localId } = splitSlug(id);

          const updatedRepair = await repairService.updateRepair(
            {
              ...values,
              clientLocalId: clientId ? splitSlug(clientId).localId : undefined,
              assetLocalId: assetId ? splitSlug(assetId).localId : undefined,
            },
            localId,
            ctx.session,
          );

          return updatedRepair;
        },
      ),

    archive: organizationProcedure
      .input(archiveRepairSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);

        const archivedRepair = await repairService.archiveRepair(
          localId,
          ctx.session,
        );

        return archivedRepair;
      }),
  });
}
