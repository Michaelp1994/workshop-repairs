import RepairPartService from "@repo/services/services/repairPart.service";
import {
  archiveRepairPartSchema,
  countRepairPartsSchema,
  createRepairPartSchema,
  getAllRepairPartsSchema,
  getRepairPartByIdSchema,
  updateRepairPartSchema,
} from "@repo/validators/server/repairParts.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function repairPartRouter(repairPartService: RepairPartService) {
  return router({
    getAll: organizationProcedure
      .input(getAllRepairPartsSchema)
      .query(async ({ input, ctx }) => {
        const allRepairParts = await repairPartService.getAllRepairParts(
          input,
          ctx.session,
        );

        return allRepairParts;
      }),
    countAll: organizationProcedure
      .input(countRepairPartsSchema)
      .query(async ({ input, ctx }) => {
        const count = await repairPartService.countRepairParts(
          input,
          ctx.session,
        );
        return count;
      }),
    getById: organizationProcedure
      .input(getRepairPartByIdSchema)
      .query(async ({ input, ctx }) => {
        const repairPart = await repairPartService.getRepairPartById(
          input.id,
          ctx.session,
        );

        return repairPart;
      }),
    create: organizationProcedure
      .input(createRepairPartSchema)
      .mutation(async ({ input, ctx }) => {
        const repairLocalId = splitSlug(input.repairId).localId;
        const partLocalId = splitSlug(input.partId).localId;
        const createdRepairPart = await repairPartService.createRepairPart(
          {
            ...input,
            repairLocalId,
            partLocalId,
          },
          ctx.session,
        );

        return createdRepairPart;
      }),
    update: organizationProcedure
      .input(updateRepairPartSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedRepairPart = await repairPartService.updateRepairPart(
          values,
          id,
          ctx.session,
        );

        return updatedRepairPart;
      }),
    archive: organizationProcedure
      .input(archiveRepairPartSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedRepairPart = await repairPartService.archiveRepairPart(
          input.id,
          ctx.session,
        );

        return archivedRepairPart;
      }),
  });
}
