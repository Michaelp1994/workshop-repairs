import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

//Routers
import assetsRouter from "./routers/assets.router";
import assetStatusesRouter from "./routers/assetStatuses.router";
import authRouter from "./routers/auth.router";
import clientsRouter from "./routers/clients.router";
import equipmentTypesRouter from "./routers/equipmentTypes.router";
import locationsRouter from "./routers/locations.router";
import manufacturersRouter from "./routers/manufacturers.router";
import metaRouter from "./routers/meta.router";
import modelImagesRouter from "./routers/modelImages.router";
import modelsRouter from "./routers/models.router";
import organizationsRouter from "./routers/organizations.router";
import partsRouter from "./routers/parts.router";
import partsToModelsRouter from "./routers/partsToModels.router";
import repairCommentsRouter from "./routers/repairComments.router";
import repairImagesRouter from "./routers/repairImages.router";
import repairPartsRouter from "./routers/repairParts.router";
import repairsRouter from "./routers/repairs.router";
import repairStatusTypesRouter from "./routers/repairStatusTypes.router";
import repairTypesRouter from "./routers/repairTypes.router";
import userOnboardingsRouter from "./routers/userOnboardings.router";
import usersRouter from "./routers/users.router";
import {
  assetService,
  assetStatusService,
  authService,
  clientService,
  equipmentTypeService,
  locationService,
  manufacturerService,
  modelImageService,
  modelService,
  organizationService,
  partService,
  partToModelService,
  repairCommentService,
  repairImageService,
  repairPartService,
  repairService,
  repairStatusTypeService,
  repairTypeService,
  userOnboardingService,
  userService,
} from "./services";
import { router } from "./trpc";

// routers
const assets = assetsRouter(assetService);
const assetStatuses = assetStatusesRouter(assetStatusService);
const auth = authRouter(authService);
const clients = clientsRouter(clientService);
const equipmentTypes = equipmentTypesRouter(equipmentTypeService);
const locations = locationsRouter(locationService);
const manufacturers = manufacturersRouter(manufacturerService);
const meta = metaRouter();
const modelImages = modelImagesRouter(modelImageService, modelService);
const models = modelsRouter(modelService);
const organizations = organizationsRouter(organizationService);

const parts = partsRouter(partService);
const partsToModels = partsToModelsRouter(partToModelService);
const repairComments = repairCommentsRouter(repairCommentService);
const repairImages = repairImagesRouter(repairImageService);
const repairParts = repairPartsRouter(repairPartService);
const repairs = repairsRouter(repairService);
const repairStatusTypes = repairStatusTypesRouter(repairStatusTypeService);
const repairTypes = repairTypesRouter(repairTypeService);
const userOnboardings = userOnboardingsRouter(userOnboardingService);
const users = usersRouter(userService);

export const appRouter = router({
  auth,
  assetStatuses,
  assets,
  clients,
  equipmentTypes,
  locations,
  manufacturers,
  organizations,
  meta,
  modelImages,
  models,
  parts,
  partsToModels,
  repairComments,
  repairImages,
  repairParts,
  repairs,
  repairStatusTypes,
  repairTypes,
  users,
  userOnboardings,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
