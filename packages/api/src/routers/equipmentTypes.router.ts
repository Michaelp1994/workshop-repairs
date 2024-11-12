import * as equipmentTypesController from "@repo/db/controllers/equipmentTypes.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as equipmentTypeSchemas from "@repo/validators/equipmentTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = equipmentTypesController.getAll(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = equipmentTypesController.getCount(
        input,
        ctx.session.organizationId,
      );
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = await equipmentTypesController.getSelect(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  getById: organizationProcedure
    .input(equipmentTypeSchemas.getById)
    .query(async ({ input, ctx }) => {
      const repairType = await equipmentTypesController.getById(
        input.id,
        ctx.db,
      );

      if (!repairType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairType not found",
        });
      }

      return repairType;
    }),
  create: organizationProcedure
    .input(equipmentTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdEquipmentType = await equipmentTypesController.create(
        { ...input, organizationId: ctx.session.organizationId, ...metadata },
        ctx.db,
      );

      if (!createdEquipmentType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair Type",
        });
      }

      return createdEquipmentType;
    }),
  update: organizationProcedure
    .input(equipmentTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedEquipmentType = await equipmentTypesController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedEquipmentType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repair Type",
        });
      }

      return updatedEquipmentType;
    }),
  archive: organizationProcedure
    .input(equipmentTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedEquipmentType = await equipmentTypesController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedEquipmentType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair Type",
        });
      }

      return archivedEquipmentType;
    }),
});
