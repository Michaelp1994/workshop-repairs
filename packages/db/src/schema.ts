import { assetTable } from "./tables/asset.table";
import { assetStatusTable } from "./tables/assetStatus.table";
import { clientTable } from "./tables/client.table";
import { emailVerificationRequestTable } from "./tables/emailVerificationRequest.table";
import { equipmentTypeTable } from "./tables/equipmentType.table";
import { groupTable } from "./tables/group.table";
import { groupRoleTable } from "./tables/groupRole.table";
import { locationTable } from "./tables/location.table";
import { manufacturerTable } from "./tables/manufacturer.table";
import { modelTable } from "./tables/model.table";
import { modelImageTable } from "./tables/modelImage.table";
import { organizationTable } from "./tables/organization.table";
import { organizationInvitationTable } from "./tables/organizationInvitation.table";
import { organizationSequenceTable } from "./tables/organizationSequences.table";
import { partTable } from "./tables/part.table";
import { partToModelTable } from "./tables/partToModel.table";
import { permissionTable } from "./tables/permission.table";
import { repairTable } from "./tables/repair.table";
import { repairCommentTable } from "./tables/repairComment.table";
import { repairImageTable } from "./tables/repairImage.table";
import { repairPartTable } from "./tables/repairPart.table";
import { repairStatusTypeTable } from "./tables/repairStatusType.table";
import { repairTypeTable } from "./tables/repairType.table";
import { roleTable } from "./tables/role.table";
import { rolePermissionTable } from "./tables/rolePermission.table";
import { userTable } from "./tables/user.table";
import { userGroupTable } from "./tables/userGroup.table";
import { userOnboardingTable } from "./tables/userOnboarding.table";
import { userRoleTable } from "./tables/userRole.table";
import { userTypeTable } from "./tables/userType.table";

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
