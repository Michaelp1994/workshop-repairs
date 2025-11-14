import { assetRelations, assetTable } from "./asset.table";
import { assetStatusRelations, assetStatusTable } from "./assetStatus.table";
import { clientRelations, clientTable } from "./client.table";
import {
  emailVerificationRequestRelations,
  emailVerificationRequestTable,
} from "./emailVerificationRequest.table";
import {
  equipmentTypeRelations,
  equipmentTypeTable,
} from "./equipmentType.table";
import { groupTable } from "./group.table";
import { groupRoleTable } from "./groupRole.table";
import { locationRelations, locationTable } from "./location.table";
import { manufacturerRelations, manufacturerTable } from "./manufacturer.table";
import { modelRelations, modelTable } from "./model.table";
import { modelImageRelations, modelImageTable } from "./modelImage.table";
import { organizationRelations, organizationTable } from "./organization.table";
import {
  organizationInvitationRelations,
  organizationInvitationTable,
} from "./organizationInvitation.table";
import {
  organizationSequenceRelations,
  organizationSequenceTable,
} from "./organizationSequences.table";
import { partRelations, partTable } from "./part.table";
import { partToModelRelations, partToModelTable } from "./partToModel.table";
import { permissionTable } from "./permission.table";
import { repairRelations, repairTable } from "./repair.table";
import {
  repairCommentRelations,
  repairCommentTable,
} from "./repairComment.table";
import { repairImageRelations, repairImageTable } from "./repairImage.table";
import { repairPartRelations, repairPartTable } from "./repairPart.table";
import {
  repairStatusTypeRelations,
  repairStatusTypeTable,
} from "./repairStatusType.table";
import { repairTypeRelations, repairTypeTable } from "./repairType.table";
import { roleTable } from "./role.table";
import { rolePermissionTable } from "./rolePermission.table";
import { userRelations, userTable } from "./user.table";
import { userGroupTable } from "./userGroup.table";
import {
  userOnboardingRelations,
  userOnboardingTable,
} from "./userOnboarding.table";
import { userRoleTable } from "./userRole.table";
import { userTypeRelations, userTypeTable } from "./userType.table";

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
