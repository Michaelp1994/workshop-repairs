import { assetStatusRelations, assetStatusTable } from "./asset-status.table";
import { assetRelations, assetTable } from "./asset.table";
import { clientRelations, clientTable } from "./client.table";
import {
  emailVerificationRequestRelations,
  emailVerificationRequestTable,
} from "./email-verification-request.table";
import {
  equipmentTypeRelations,
  equipmentTypeTable,
} from "./equipment-type.table";
import { groupRoleTable } from "./group-role.table";
import { groupTable } from "./group.table";
import { locationRelations, locationTable } from "./location.table";
import { manufacturerRelations, manufacturerTable } from "./manufacturer.table";
import { modelImageRelations, modelImageTable } from "./model-image.table";
import { modelRelations, modelTable } from "./model.table";
import {
  organizationInvitationRelations,
  organizationInvitationTable,
} from "./organization-invitation.table";
import {
  organizationSequenceRelations,
  organizationSequenceTable,
} from "./organization-sequences.table";
import { organizationRelations, organizationTable } from "./organization.table";
import { partToModelRelations, partToModelTable } from "./part-to-model.table";
import { partRelations, partTable } from "./part.table";
import { permissionTable } from "./permission.table";
import {
  repairCommentRelations,
  repairCommentTable,
} from "./repair-comment.table";
import { repairImageRelations, repairImageTable } from "./repair-image.table";
import { repairPartRelations, repairPartTable } from "./repair-part.table";
import {
  repairStatusTypeRelations,
  repairStatusTypeTable,
} from "./repair-status-type.table";
import { repairTypeRelations, repairTypeTable } from "./repair-type.table";
import { repairRelations, repairTable } from "./repair.table";
import { rolePermissionTable } from "./role-permission.table";
import { roleTable } from "./role.table";
import { userGroupTable } from "./user-group.table";
import {
  userOnboardingRelations,
  userOnboardingTable,
} from "./user-onboarding.table";
import { userRoleTable } from "./user-role.table";
import { userTypeRelations, userTypeTable } from "./user-type.table";
import { userRelations, userTable } from "./user.table";

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
