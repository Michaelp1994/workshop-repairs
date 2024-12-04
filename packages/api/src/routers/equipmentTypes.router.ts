import {
  archiveEquipmentType,
  countEquipmentTypes,
  createEquipmentType,
  getAllEquipmentTypes,
  getEquipmentTypeById,
  getEquipmentTypesSelect,
  updateEquipmentType,
} from "@repo/db/repositories/equipmentType.repository";
import {
  archiveEquipmentTypeSchema,
  countEquipmentTypesSchema,
  createEquipmentTypeSchema,
  getAllEquipmentTypesSchema,
  getEquipmentTypeByIdSchema,
  getEquipmentTypesSelectSchema,
  updateEquipmentTypeSchema,
} from "@repo/validators/server/equipmentTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .meta({ action: "read", entity: "equipment-types" })
    .input(getAllEquipmentTypesSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = getAllEquipmentTypes(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  countAll: organizationProcedure
    .meta({ action: "read", entity: "equipment-types" })
    .input(countEquipmentTypesSchema)
    .query(({ ctx, input }) => {
      const count = countEquipmentTypes(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .meta({ action: "read", entity: "equipment-types" })
    .input(getEquipmentTypesSelectSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = await getEquipmentTypesSelect(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  getById: organizationProcedure
    .meta({ action: "read", entity: "equipment-types" })
    .input(getEquipmentTypeByIdSchema)
    .query(async ({ input }) => {
      const repairType = await getEquipmentTypeById(input.id);

      if (!repairType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairType not found",
        });
      }

      return repairType;
    }),
  create: organizationProcedure
    .meta({ action: "create", entity: "equipment-types" })
    .input(createEquipmentTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdEquipmentType = await createEquipmentType({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdEquipmentType);

      return createdEquipmentType;
    }),
  update: organizationProcedure
    .meta({ action: "update", entity: "equipment-types" })
    .input(updateEquipmentTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedEquipmentType = await updateEquipmentType({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedEquipmentType);

      return updatedEquipmentType;
    }),
  archive: organizationProcedure
    .meta({ action: "delete", entity: "equipment-types" })
    .input(archiveEquipmentTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);

      const archivedEquipmentType = await archiveEquipmentType({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedEquipmentType);

      return archivedEquipmentType;
    }),
});
