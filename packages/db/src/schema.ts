import { assetStatuses } from "./schemas/asset-statuses.schema";
import { assets } from "./schemas/assets.schema";
import { clients } from "./schemas/clients.schema";
import { emailVerificationRequests } from "./schemas/email-verification-requests.schema";
import { equipmentTypes } from "./schemas/equipment-types.schema";
import { locations } from "./schemas/locations.schema";
import { manufacturers } from "./schemas/manufacturers.schema";
import { modelImages } from "./schemas/model-images.schema";
import { models } from "./schemas/models.schema";
import { organizations } from "./schemas/organization.schema";
import { parts } from "./schemas/parts.schema";
import { partsToModels } from "./schemas/parts-to-models.schema";
import { repairComments } from "./schemas/repair-comments.schema";
import { repairImages } from "./schemas/repair-images.schema";
import { repairParts } from "./schemas/repair-parts.schema";
import { repairStatusTypes } from "./schemas/repair-status-types.schema";
import { repairTypes } from "./schemas/repair-types.schema";
import { repairs } from "./schemas/repairs.schema";
import { userTypes } from "./schemas/user-types.schema";
import { users } from "./schemas/users.schema";

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
  repairComments,
  repairImages,
  repairParts,
  organizations,
  repairStatusTypes,
  repairTypes,
  repairs,
  userTypes,
  users,
  emailVerificationRequests,
};
