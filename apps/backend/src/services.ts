import { createDbConnection } from "./db";
import { env } from "./env";
import AssetRepository from "./repositories/asset.repository";
import AssetStatusRepository from "./repositories/assetStatus.repository";
import ClientRepository from "./repositories/client.repository";
import EmailVerificationRequestRepository from "./repositories/emailVerificationRequest.repository";
import EquipmentTypeRepository from "./repositories/equipmentType.repository";
import LocationRepository from "./repositories/location.repository";
import ManufacturerRepository from "./repositories/manufacturer.repository";
import ModelRepository from "./repositories/model.repository";
import ModelImageRepository from "./repositories/modelImage.repository";
import OrganizationRepository from "./repositories/organization.repository";
import OrganizationInvitationRepository from "./repositories/organizationInvitation.repository";
import OrganizationSequenceRepository from "./repositories/organizationSequence.repository";
import PartRepository from "./repositories/part.repository";
import PartToModelRepository from "./repositories/partToModel.repository";
import RepairRepository from "./repositories/repair.repository";
import RepairCommentRepository from "./repositories/repairComment.repository";
import RepairImageRepository from "./repositories/repairImage.repository";
import RepairPartRepository from "./repositories/repairPart.repository";
import RepairStatusTypeRepository from "./repositories/repairStatusType.repository";
import RepairTypeRepository from "./repositories/repairType.repository";
import UserRepository from "./repositories/user.repository";
import UserOnboardingRepository from "./repositories/userOnboarding.repository";
// Services
import AssetService from "./services/asset.service";
import AssetStatusService from "./services/assetStatus.service";
import AuthService from "./services/auth.service";
import ClientService from "./services/client.service";
import EquipmentTypeService from "./services/equipmentType.service";
import LocationService from "./services/location.service";
import ManufacturerService from "./services/manufacturer.service";
import ModelService from "./services/model.service";
import ModelImageService from "./services/modelImage.service";
import OrganizationService from "./services/organization.service";
import OrganizationSequenceService from "./services/organizationSequence.service";
import PartService from "./services/part.service";
import PartToModelService from "./services/partToModel.service";
import RepairService from "./services/repair.service";
import RepairCommentService from "./services/repairComment.service";
import RepairImageService from "./services/repairImage.service";
import RepairPartService from "./services/repairPart.service";
import RepairStatusTypeService from "./services/repairStatusType.service";
import RepairTypeService from "./services/repairType.service";
import UserService from "./services/user.service";
import UserOnboardingService from "./services/userOnboarding.service";

// repositories
const assetRepository = new AssetRepository();
const organizationSequenceRepository = new OrganizationSequenceRepository();
const assetStatusRepository = new AssetStatusRepository();
const clientRepository = new ClientRepository();
const emailVerificationRequestRepository =
  new EmailVerificationRequestRepository();
const equipmentTypeRepository = new EquipmentTypeRepository();
const locationRepository = new LocationRepository();
const manufacturerRepository = new ManufacturerRepository();
const modelRepository = new ModelRepository();
const modelImageRepository = new ModelImageRepository();
const organizationRepository = new OrganizationRepository();
const partRepository = new PartRepository();
const partToModelRepository = new PartToModelRepository();
const repairRepository = new RepairRepository();
const repairCommentRepository = new RepairCommentRepository();
const repairImageRepository = new RepairImageRepository();
const repairPartRepository = new RepairPartRepository();
const repairStatusTypeRepository = new RepairStatusTypeRepository();
const repairTypeRepository = new RepairTypeRepository();
const userRepository = new UserRepository();
const userOnboardingRepository = new UserOnboardingRepository();
const userInvitationRepository = new OrganizationInvitationRepository();

// Create db connection
const db = createDbConnection({
  host: env.postgresHost,
  port: env.postgresPort,
  user: env.postgresUser,
  password: env.postgresPassword,
  database: env.postgresDatabase,
});

// services
export const assetService = new AssetService(
  db,
  assetRepository,
  organizationSequenceRepository,
  modelRepository,
  clientRepository,
  locationRepository,
);

export const assetStatusService = new AssetStatusService(
  db,
  assetStatusRepository,
);
export const authService = new AuthService(
  db,
  userRepository,
  userOnboardingRepository,
  emailVerificationRequestRepository,
);
export const clientService = new ClientService(
  db,
  clientRepository,
  organizationSequenceRepository,
);
export const equipmentTypeService = new EquipmentTypeService(
  db,
  equipmentTypeRepository,
  organizationSequenceRepository,
);
export const locationService = new LocationService(
  db,
  locationRepository,
  organizationSequenceRepository,
);
export const manufacturerService = new ManufacturerService(
  db,
  manufacturerRepository,
  organizationSequenceRepository,
);
export const modelService = new ModelService(
  db,
  modelRepository,
  organizationSequenceRepository,
  manufacturerRepository,
  equipmentTypeRepository,
);
export const modelImageService = new ModelImageService(
  db,
  modelImageRepository,
  modelRepository,
);
export const organizationService = new OrganizationService(
  db,
  organizationRepository,
  userRepository,
  organizationSequenceRepository,
);
export const organizationSequenceService = new OrganizationSequenceService(
  db,
  organizationSequenceRepository,
);
export const partService = new PartService(
  db,
  partRepository,
  organizationSequenceRepository,
);
export const partToModelService = new PartToModelService(
  db,
  partToModelRepository,
  modelRepository,
  partRepository,
);
export const repairService = new RepairService(
  db,
  repairRepository,
  organizationSequenceRepository,
  clientRepository,
  assetRepository,
);
export const repairCommentService = new RepairCommentService(
  db,
  repairCommentRepository,
  repairRepository,
);
export const repairImageService = new RepairImageService(
  db,
  repairImageRepository,
  repairRepository,
);
export const repairPartService = new RepairPartService(
  db,
  repairPartRepository,
  repairRepository,
  partRepository,
);
export const repairStatusTypeService = new RepairStatusTypeService(
  db,
  repairStatusTypeRepository,
);
export const repairTypeService = new RepairTypeService(
  db,
  repairTypeRepository,
);
export const userService = new UserService(
  db,
  userRepository,
  emailVerificationRequestRepository,
);
export const userOnboardingService = new UserOnboardingService(
  db,
  userOnboardingRepository,
  userRepository,
  organizationRepository,
  userInvitationRepository,
);
