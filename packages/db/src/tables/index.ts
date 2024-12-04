import { assetStatusRelations, assetStatusTable } from "./asset-status.sql";
import { assetRelations, assetTable } from "./asset.sql";
import { clientRelations, clientTable } from "./client.sql";
import {
  emailVerificationRequestRelations,
  emailVerificationRequestTable,
} from "./email-verification-request.sql";
import {
  equipmentTypeRelations,
  equipmentTypeTable,
} from "./equipment-type.sql";
import { locationRelations, locationTable } from "./location.sql";
import { manufacturerRelations, manufacturerTable } from "./manufacturer.sql";
import { modelImageRelations, modelImageTable } from "./model-image.sql";
import { modelRelations, modelTable } from "./model.sql";
import {
  organizationInvitationRelations,
  organizationInvitationTable,
} from "./organization-invitation.sql";
import { organizationRelations, organizationTable } from "./organization.sql";
import { partRelations, partTable } from "./part.sql";
import { partsToModelRelations, partsToModelTable } from "./parts-to-model.sql";
import {
  repairCommentRelations,
  repairCommentTable,
} from "./repair-comment.sql";
import { repairImageRelations, repairImageTable } from "./repair-image.sql";
import { repairPartRelations, repairPartTable } from "./repair-part.sql";
import {
  repairStatusTypeRelations,
  repairStatusTypeTable,
} from "./repair-status-type.sql";
import { repairTypeRelations, repairTypeTable } from "./repair-type.sql";
import { repairRelations, repairTable } from "./repair.sql";
import {
  userOnboardingRelations,
  userOnboardingTable,
} from "./user-onboarding.sql";
import { userRoleRelations, userRoleTable } from "./user-role.sql";
import { userRelations, userTable } from "./user.sql";

export const schema = {
  assetStatusTable,
  assetTable,
  clientTable,
  emailVerificationRequestTable,
  equipmentTypeTable,
  locationTable,
  manufacturerTable,
  modelImageTable,
  modelTable,
  organizationInvitationTable,
  organizationTable,
  partsToModelTable,
  partTable,
  repairCommentTable,
  repairImageTable,
  repairPartTable,
  repairStatusTypeTable,
  repairTable,
  repairTypeTable,
  userOnboardingTable,
  userTable,
  userRoleTable,
};

export const relations = {
  assetRelations,
  assetStatusRelations,
  clientRelations,
  emailVerificationRequestRelations,
  equipmentTypeRelations,
  locationRelations,
  manufacturerRelations,
  modelImageRelations,
  modelRelations,
  organizationInvitationRelations,
  organizationRelations,
  partRelations,
  partsToModelRelations,
  repairCommentRelations,
  repairImageRelations,
  repairPartRelations,
  repairRelations,
  repairStatusTypeRelations,
  repairTypeRelations,
  userOnboardingRelations,
  userRelations,
  userRoleRelations,
};
