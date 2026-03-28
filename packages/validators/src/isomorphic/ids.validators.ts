import { z } from "zod";

export const assetId = z.string();
export type AssetID = z.infer<typeof assetId>;

export const assetStatusId = z.string();
export type AssetStatusID = z.infer<typeof assetStatusId>;

export const clientId = z.string();
export type ClientID = z.infer<typeof clientId>;

export const equipmentTypeId = z.string();
export type EquipmentTypeID = z.infer<typeof equipmentTypeId>;

export const locationId = z.string();
export type LocationID = z.infer<typeof locationId>;

export const manufacturerId = z.string();
export type ManufacturerID = z.infer<typeof manufacturerId>;

export const modelId = z.string();
export type ModelID = z.infer<typeof modelId>;

export const modelImageId = z.string();
export type ModelImageID = z.infer<typeof modelImageId>;

export const partId = z.string();
export type PartID = z.infer<typeof partId>;

export const repairId = z.string();
export type RepairID = z.infer<typeof repairId>;

export const repairCommentId = z.string();
export type RepairCommentID = z.infer<typeof repairCommentId>;

export const repairImageId = z.string();
export type RepairImageID = z.infer<typeof repairImageId>;

export const repairPartId = z.string();
export type RepairPartID = z.infer<typeof repairPartId>;

export const repairStatusTypeId = z.string();
export type RepairStatusTypeID = z.infer<typeof repairStatusTypeId>;

export const repairTypeId = z.string();
export type RepairTypeID = z.infer<typeof repairTypeId>;

export const userId = z.string();
export type UserID = z.infer<typeof userId>;

export const userOnboardingId = z.string();
export type UserOnboardingID = z.infer<typeof userOnboardingId>;

export const organizationId = z.string();
export type OrganizationID = z.infer<typeof organizationId>;

export const organizationInvitationId = z.string();
export type OrganizationInvitationID = z.infer<typeof organizationInvitationId>;

export const organizationSequenceId = z.string();
export type OrganizationSequenceID = z.infer<typeof organizationSequenceId>;
