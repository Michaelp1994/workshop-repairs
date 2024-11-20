import { z } from "zod";

import { equipmentTypeId } from "./ids.validators";

export const createEquipmentTypeSchema = z.object({
  name: z.string().min(3),
});

export const updateEquipmentTypeSchema = z.object({
  id: equipmentTypeId,
  name: z.string().min(3),
});

export const getEquipmentTypeByIdSchema = z.object({
  id: equipmentTypeId,
});

export const archiveEquipmentTypeSchema = z.object({
  id: equipmentTypeId,
});
