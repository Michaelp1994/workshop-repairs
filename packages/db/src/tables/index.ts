import { assetStatusTable } from "./asset-status.sql";
import { assetTable } from "./asset.sql";
import { clientTable } from "./client.sql";
import { emailVerificationRequestTable } from "./email-verification-request.sql";
import { equipmentTypeTable } from "./equipment-type.sql";
import { locationTable } from "./location.sql";
import { manufacturerTable } from "./manufacturer.sql";
import { modelImageTable } from "./model-image.sql";
import { modelTable } from "./model.sql";
import { organizationInvitationTable } from "./organization-invitation.sql";
import { organizationTable } from "./organization.sql";
import { partTable } from "./part.sql";
import { partsToModelTable } from "./parts-to-model.sql";
import { repairCommentTable } from "./repair-comment.sql";
import { repairImageTable } from "./repair-image.sql";
import { repairPartTable } from "./repair-part.sql";
import { repairStatusTypeTable } from "./repair-status-type.sql";
import { repairTypeTable } from "./repair-type.sql";
import { repairTable } from "./repair.sql";
import { userOnboardingTable } from "./user-onboarding.sql";
import { userTypeTable } from "./user-type.sql";
import { userTable } from "./user.sql";

export const schema = {
  assetStatusTable,
  equipmentTypeTable,
  assetTable,
  clientTable,
  locationTable,
  manufacturerTable,
  modelImageTable,
  modelTable,
  partsToModelTable,
  partTable,
  userOnboardingTable,
  repairCommentTable,
  repairImageTable,
  repairPartTable,
  organizationTable,
  organizationInvitationTable,
  repairStatusTypeTable,
  repairTypeTable,
  repairTable,
  userTypeTable,
  userTable,
  emailVerificationRequestTable,
};
