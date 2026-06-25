import { z } from "zod";

export const equipmentTypeFormSchema = z.object({
  name: z.string().min(3),
});

export type EquipmentTypeFormInput = z.infer<typeof equipmentTypeFormSchema>;

export const defaultEquipmentType: EquipmentTypeFormInput = {
  name: "",
};
