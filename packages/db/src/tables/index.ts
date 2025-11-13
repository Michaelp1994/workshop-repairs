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
import { groupRoleTable } from "./group-role.sql";
import { groupTable } from "./group.sql";
import { locationRelations, locationTable } from "./location.sql";
import { manufacturerRelations, manufacturerTable } from "./manufacturer.sql";
import { modelImageRelations, modelImageTable } from "./model-image.sql";
import { modelRelations, modelTable } from "./model.sql";
import {
  organizationInvitationRelations,
  organizationInvitationTable,
} from "./organization-invitation.sql";
import {
  organizationSequenceRelations,
  organizationSequenceTable,
} from "./organization-sequences.sql";
import { organizationRelations, organizationTable } from "./organization.sql";
import { partToModelRelations, partToModelTable } from "./part-to-model.sql";
import { partRelations, partTable } from "./part.sql";
import { permissionTable } from "./permission.sql";
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
import { rolePermissionTable } from "./role-permission.sql";
import { roleTable } from "./role.sql";
import { userGroupTable } from "./user-group.sql";
import {
  userOnboardingRelations,
  userOnboardingTable,
} from "./user-onboarding.sql";
import { userRoleTable } from "./user-role.sql";
import { userTypeRelations, userTypeTable } from "./user-type.sql";
import { userRelations, userTable } from "./user.sql";

export const schema = {
  assetStatusTable,
  assetTable,
  clientTable,
  emailVerificationRequestTable,
  equipmentTypeTable,
  groupRoleTable,
  groupTable,
  locationTable,
  manufacturerTable,
  modelImageTable,
  modelTable,
  organizationInvitationTable,
  organizationSequenceTable,
  organizationTable,
  partToModelTable,
  partTable,
  permissionTable,
  repairCommentTable,
  repairImageTable,
  repairPartTable,
  repairStatusTypeTable,
  repairTable,
  repairTypeTable,
  rolePermissionTable,
  roleTable,
  userGroupTable,
  userOnboardingTable,
  userRoleTable,
  userTable,
  userTypeTable,
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
  organizationSequenceRelations,
  organizationRelations,
  partRelations,
  partToModelRelations,
  repairCommentRelations,
  repairImageRelations,
  repairPartRelations,
  repairRelations,
  repairStatusTypeRelations,
  repairTypeRelations,
  userOnboardingRelations,
  userRelations,
  userTypeRelations,
};
