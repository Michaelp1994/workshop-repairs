import { z } from "zod";

export const assetStatusFormSchema = z.object({
  name: z.string().min(3),
});

export type AssetStatusFormInput = z.infer<typeof assetStatusFormSchema>;

export const defaultAssetStatus: AssetStatusFormInput = {
  name: "",
};
