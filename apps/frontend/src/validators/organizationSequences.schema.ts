import { z } from "zod";

export const createOrganizationSequenceSchema = z.object({
  assetKeyPrefix: z.string(),
  clientKeyPrefix: z.string(),
  equipmentTypeKeyPrefix: z.string(),
  locationKeyPrefix: z.string(),
  manufacturerKeyPrefix: z.string(),
  modelKeyPrefix: z.string(),
  partKeyPrefix: z.string(),
  repairKeyPrefix: z.string(),
});

export type CreateOrganizationSequenceInput = z.infer<
  typeof createOrganizationSequenceSchema
>;

export const defaultOrganizationSequence: CreateOrganizationSequenceInput = {
  assetKeyPrefix: "ASSET-",
  clientKeyPrefix: "CLIENT-",
  equipmentTypeKeyPrefix: "EQUIP-",
  locationKeyPrefix: "LOCTN-",
  manufacturerKeyPrefix: "MANUF-",
  modelKeyPrefix: "MODEL-",
  partKeyPrefix: "PART-",
  repairKeyPrefix: "REPAIR-",
};
