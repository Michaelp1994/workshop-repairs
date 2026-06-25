import { z } from "zod";

import { organizationSequenceId } from "./ids.validators";

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

export const updateOrganizationSequenceSchema = z.object({
  id: organizationSequenceId,
  assetKeyPrefix: z.string(),
  clientKeyPrefix: z.string(),
  equipmentTypeKeyPrefix: z.string(),
  locationKeyPrefix: z.string(),
  manufacturerKeyPrefix: z.string(),
  modelKeyPrefix: z.string(),
  partKeyPrefix: z.string(),
  repairKeyPrefix: z.string(),
});
