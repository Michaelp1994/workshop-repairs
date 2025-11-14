import { db } from "@repo/db";
import AssetRepository from "@repo/db/repositories/asset.repository";
import AssetStatusRepository from "@repo/db/repositories/assetStatus.repository";
import ClientRepository from "@repo/db/repositories/client.repository";
import EmailVerificationRequestRepository from "@repo/db/repositories/emailVerificationRequest.repository";
import EquipmentTypeRepository from "@repo/db/repositories/equipmentType.repository";
import LocationRepository from "@repo/db/repositories/location.repository";
import ManufacturerRepository from "@repo/db/repositories/manufacturer.repository";
import ModelRepository from "@repo/db/repositories/model.repository";
import ModelImageRepository from "@repo/db/repositories/modelImage.repository";
import OrganizationRepository from "@repo/db/repositories/organization.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";
import PartRepository from "@repo/db/repositories/part.repository";
import PartToModelRepository from "@repo/db/repositories/partToModel.repository";
import RepairRepository from "@repo/db/repositories/repair.repository";
import RepairCommentRepository from "@repo/db/repositories/repairComment.repository";
import RepairImageRepository from "@repo/db/repositories/repairImage.repository";
import RepairPartRepository from "@repo/db/repositories/repairPart.repository";
import RepairStatusTypeRepository from "@repo/db/repositories/repairStatusType.repository";
import RepairTypeRepository from "@repo/db/repositories/repairType.repository";
import UserRepository from "@repo/db/repositories/user.repository";
import UserOnboardingRepository from "@repo/db/repositories/userOnboarding.repository";
import UserTypeRepository from "@repo/db/repositories/userType.repository";
// Services
import AssetService from "@repo/services/services/asset.service";
import AssetStatusService from "@repo/services/services/assetStatus.service";
import AuthService from "@repo/services/services/auth.service";
import ClientService from "@repo/services/services/client.service";
import EquipmentTypeService from "@repo/services/services/equipmentType.service";
import LocationService from "@repo/services/services/location.service";
import ManufacturerService from "@repo/services/services/manufacturer.service";
import ModelService from "@repo/services/services/model.service";
import ModelImageService from "@repo/services/services/modelImage.service";
import OrganizationService from "@repo/services/services/organization.service";
import OrganizationSequenceService from "@repo/services/services/organizationSequence.service";
import PartService from "@repo/services/services/part.service";
import PartToModelService from "@repo/services/services/partToModel.service";
import RepairService from "@repo/services/services/repair.service";
import RepairCommentService from "@repo/services/services/repairComment.service";
import RepairImageService from "@repo/services/services/repairImage.service";
import RepairPartService from "@repo/services/services/repairPart.service";
import RepairStatusTypeService from "@repo/services/services/repairStatusType.service";
import RepairTypeService from "@repo/services/services/repairType.service";
import UserService from "@repo/services/services/user.service";
import UserOnboardingService from "@repo/services/services/userOnboarding.service";
import UserTypeService from "@repo/services/services/userType.service";

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
const userTypeRepository = new UserTypeRepository();

// services
export const assetService = new AssetService(
  db,
  assetRepository,
  organizationSequenceRepository,
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
);
export const modelImageService = new ModelImageService(
  db,
  modelImageRepository,
  modelRepository,
);
export const organizationService = new OrganizationService(
  db,
  organizationRepository,
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
);
export const repairService = new RepairService(
  db,
  repairRepository,
  organizationSequenceRepository,
);
export const repairCommentService = new RepairCommentService(
  db,
  repairCommentRepository,
);
export const repairImageService = new RepairImageService(
  db,
  repairImageRepository,
);
export const repairPartService = new RepairPartService(
  db,
  repairPartRepository,
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
);
export const userTypeService = new UserTypeService(db, userTypeRepository);
