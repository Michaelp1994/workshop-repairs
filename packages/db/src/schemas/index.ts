import { assetStatuses } from "./asset-statuses.schema";
import { assets } from "./assets.schema";
import { clients } from "./clients.schema";
import { emailVerificationRequests } from "./email-verification-requests.schema";
import { equipmentTypes } from "./equipment-types.schema";
import { locations } from "./locations.schema";
import { manufacturers } from "./manufacturers.schema";
import { modelImages } from "./model-images.schema";
import { models } from "./models.schema";
import { organizationInvitation } from "./organization-invitations.schema";
import { organizations } from "./organizations.schema";
import { parts } from "./parts.schema";
import { partsToModels } from "./parts-to-models.schema";
import { repairComments } from "./repair-comments.schema";
import { repairImages } from "./repair-images.schema";
import { repairParts } from "./repair-parts.schema";
import { repairStatusTypes } from "./repair-status-types.schema";
import { repairTypes } from "./repair-types.schema";
import { repairs } from "./repairs.schema";
import { userOnboardings } from "./user-onboardings.schema";
import { userTypes } from "./user-types.schema";
import { users } from "./users.schema";

export const schema = {
  assetStatuses,
  equipmentTypes,
  assets,
  clients,
  locations,
  manufacturers,
  modelImages,
  models,
  partsToModels,
  parts,
  userOnboardings,
  repairComments,
  repairImages,
  repairParts,
  organizations,
  organizationInvitation,
  repairStatusTypes,
  repairTypes,
  repairs,
  userTypes,
  users,
  emailVerificationRequests,
};
