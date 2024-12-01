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
import { userTypeRelations, userTypeTable } from "./user-type.sql";
import { userRelations, userTable } from "./user.sql";

export const schema = {
  assetRelations,
  assetStatusRelations,
  assetStatusTable,
  assetTable,
  clientRelations,
  clientTable,
  emailVerificationRequestRelations,
  emailVerificationRequestTable,
  equipmentTypeRelations,
  equipmentTypeTable,
  locationRelations,
  locationTable,
  manufacturerRelations,
  manufacturerTable,
  modelImageRelations,
  modelImageTable,
  modelRelations,
  modelTable,
  organizationInvitationRelations,
  organizationInvitationTable,
  organizationRelations,
  organizationTable,
  partRelations,
  partsToModelRelations,
  partsToModelTable,
  partTable,
  repairCommentRelations,
  repairCommentTable,
  repairImageRelations,
  repairImageTable,
  repairPartRelations,
  repairPartTable,
  repairRelations,
  repairStatusTypeRelations,
  repairStatusTypeTable,
  repairTable,
  repairTypeRelations,
  repairTypeTable,
  userOnboardingRelations,
  userOnboardingTable,
  userRelations,
  userTable,
  userTypeRelations,
  userTypeTable,
};
