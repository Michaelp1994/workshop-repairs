import {
  assetStatusId,
  clientId,
  locationId,
  modelId,
} from "@repo/validators/ids.validators";
import { z } from "zod";

export const assetFormSchema = z.object({
  assetNumber: z.string().min(3),
  serialNumber: z.string().min(3),
  statusId: assetStatusId,
  modelId,
  locationId,
});

export type AssetFormInput = z.infer<typeof assetFormSchema>;

export const defaultAsset: AssetFormInput = {
  assetNumber: "",
  serialNumber: "",
  modelId: 0,
  statusId: 0,
  locationId: 0,
};

export const assetSearchSchema = z.object({
  locationId: locationId.optional(),
  modelId: modelId.optional(),
  clientId: clientId.optional(),
});

export type AssetSearchParams = z.infer<typeof assetSearchSchema>;
