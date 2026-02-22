import RepairStatusTypeService from "@repo/services/services/repairStatusType.service";
import {
  archiveRepairStatusTypeSchema,
  countRepairStatusTypesSchema,
  createRepairStatusTypeSchema,
  getAllRepairStatusTypesSchema,
  getRepairStatusSelectSchema,
  getRepairStatusTypeByIdSchema,
  updateRepairStatusTypeSchema,
} from "@repo/validators/server/repairStatusTypes.validators";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function Router(
  repairStatusTypeService: RepairStatusTypeService,
) {
  return router({
    getAll: organizationProcedure
      .input(getAllRepairStatusTypesSchema)
      .query(async ({ input, ctx }) => {
        const allRepairStatusTypes =
          await repairStatusTypeService.getAllRepairStatusTypes(
            input,
            ctx.session,
          );

        return allRepairStatusTypes;
      }),
    countAll: organizationProcedure
      .input(countRepairStatusTypesSchema)
      .query(async ({ input, ctx }) => {
        const count = await repairStatusTypeService.countRepairStatusTypes(
          input,
          ctx.session,
        );
        return count;
      }),
    getSelect: organizationProcedure
      .input(getRepairStatusSelectSchema)
      .query(async ({ input, ctx }) => {
        const allRepairStatusTypes =
          await repairStatusTypeService.getRepairStatusSelect(
            input,
            ctx.session,
          );
        return allRepairStatusTypes;
      }),
    getById: organizationProcedure
      .input(getRepairStatusTypeByIdSchema)
      .query(async ({ input, ctx }) => {
        const repairStatusType =
          await repairStatusTypeService.getRepairStatusById(
            input.id,
            ctx.session,
          );

        return repairStatusType;
      }),
    create: organizationProcedure
      .input(createRepairStatusTypeSchema)
      .mutation(async ({ input, ctx }) => {
        const createdRepairStatusType =
          await repairStatusTypeService.createRepairStatusType(
            input,
            ctx.session,
          );

        return createdRepairStatusType;
      }),
    update: organizationProcedure
      .input(updateRepairStatusTypeSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedRepairStatusType =
          await repairStatusTypeService.updateRepairStatusType(
            values,
            id,
            ctx.session,
          );

        return updatedRepairStatusType;
      }),
    archive: organizationProcedure
      .input(archiveRepairStatusTypeSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedRepairStatusType =
          await repairStatusTypeService.archiveRepairStatusType(
            input.id,
            ctx.session,
          );

        return archivedRepairStatusType;
      }),
  });
}
