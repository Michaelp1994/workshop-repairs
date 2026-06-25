import { z } from "zod";

export const assetFormSchema = z.object(
  {
    assetNumber: z.string(),
    serialNumber: z
      .string()
      .min(3, "Serial Number must be at least 3 characters"),
    softwareVersion: z.string(),
    statusId: z
      .number({
        message: "Status is required",
      })
      .positive({
        message: "Status is required",
      }),
    modelId: z
      .string({ message: "Model is required" })
      .min(1, "Model is required"),
    locationId: z
      .string({ message: "Location is required" })
      .min(1, "Location is required"),
    clientId: z
      .string({ message: "Client is required" })
      .min(1, "Client is required"),
  },
  {},
);

export type AssetFormInput = z.infer<typeof assetFormSchema>;

export const defaultAsset: AssetFormInput = {
  assetNumber: "",
  serialNumber: "",
  softwareVersion: "",
  modelId: "",
  statusId: 0,
  locationId: "",
  clientId: "",
};
