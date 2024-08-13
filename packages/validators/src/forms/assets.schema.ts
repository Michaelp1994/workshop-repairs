import { z } from "zod";

export const assetFormSchema = z.object(
  {
    assetNumber: z.string(),
    serialNumber: z
      .string()
      .min(3, "Serial Number must be at least 3 characters"),
    statusId: z
      .number({
        message: "Status is required",
      })
      .positive({
        message: "Status is required",
      }),
    modelId: z
      .number({
        message: "Model is required",
      })
      .positive({
        message: "Model is required",
      }),
    locationId: z
      .number({
        message: "Location is required",
      })
      .positive({
        message: "Location is required",
      }),
    clientId: z
      .number({
        message: "Client is required",
      })
      .positive({ message: "Client is required" }),
  },
  {},
);

export type AssetFormInput = z.infer<typeof assetFormSchema>;

export const defaultAsset: AssetFormInput = {
  assetNumber: "",
  serialNumber: "",
  modelId: 0,
  statusId: 0,
  locationId: 0,
  clientId: 0,
};
