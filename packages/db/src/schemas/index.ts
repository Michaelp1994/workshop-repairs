import { assetTable } from "./asset.table";
import { assetStatusTable } from "./asset-status.table";
import { clientTable } from "./client.table";
import { emailVerificationRequestTable } from "./email-verification-request.table";
import { equipmentTypeTable } from "./equipment-type.table";
import { locationTable } from "./location.table";
import { manufacturerTable } from "./manufacturer.table";
import { modelTable } from "./model.table";
import { modelImageTable } from "./model-image.table";
import { organizationTable } from "./organization.table";
import { organizationInvitationTable } from "./organization-invitation.table";
import { partTable } from "./part.table";
import { partsToModelTable } from "./parts-to-model.table";
import { repairTable } from "./repair.table";
import { repairCommentTable } from "./repair-comment.table";
import { repairImageTable } from "./repair-image.table";
import { repairPartTable } from "./repair-part.table";
import { repairStatusTypeTable } from "./repair-status-type.table";
import { repairTypeTable } from "./repair-type.table";
import { userTable } from "./user.table";
import { userOnboardingTable } from "./user-onboarding.table";
import { userTypeTable } from "./user-type.table";

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
