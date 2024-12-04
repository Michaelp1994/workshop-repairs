import { z } from "zod";

export const assetId = z.number().positive();
export type AssetID = z.infer<typeof assetId>;

export const assetStatusId = z.number().positive();
export type AssetStatusID = z.infer<typeof assetStatusId>;

export const clientId = z.number().positive();
export type ClientID = z.infer<typeof clientId>;

export const equipmentTypeId = z.number().positive();
export type EquipmentTypeID = z.infer<typeof equipmentTypeId>;

export const locationId = z.number().positive();
export type LocationID = z.infer<typeof locationId>;

export const manufacturerId = z.number().positive();
export type ManufacturerID = z.infer<typeof manufacturerId>;

export const modelId = z.number().positive();
export type ModelID = z.infer<typeof modelId>;

export const modelImageId = z.number().positive();
export type ModelImageID = z.infer<typeof modelImageId>;

export const partId = z.number().positive();
export type PartID = z.infer<typeof partId>;

export const repairId = z.number().positive();
export type RepairID = z.infer<typeof repairId>;

export const repairCommentId = z.number().positive();
export type RepairCommentID = z.infer<typeof repairCommentId>;

export const repairImageId = z.number().positive();
export type RepairImageID = z.infer<typeof repairImageId>;

export const repairPartId = z.number().positive();
export type RepairPartID = z.infer<typeof repairPartId>;

export const repairStatusTypeId = z.number().positive();
export type RepairStatusTypeID = z.infer<typeof repairStatusTypeId>;

export const repairTypeId = z.number().positive();
export type RepairTypeID = z.infer<typeof repairTypeId>;

export const userId = z.number().positive();
export type UserID = z.infer<typeof userId>;

export const userRoleId = z.number().positive();
export type UserRoleID = z.infer<typeof userRoleId>;

export const userOnboardingId = z.number().positive();
export type UserOnboardingID = z.infer<typeof userOnboardingId>;

export const organizationId = z.number().positive();
export type OrganizationID = z.infer<typeof organizationId>;

export const organizationInvitationId = z.number().positive();
export type OrganizationInvitationID = z.infer<typeof organizationInvitationId>;
