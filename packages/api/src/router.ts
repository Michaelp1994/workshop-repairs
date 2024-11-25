import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import assets from "./routers/assets.router";
import assetStatuses from "./routers/assetStatuses.router";
import auth from "./routers/auth.router";
import clients from "./routers/clients.router";
import equipmentTypes from "./routers/equipmentTypes.router";
import locations from "./routers/locations.router";
import manufacturers from "./routers/manufacturers.router";
import meta from "./routers/meta.router";
import modelImages from "./routers/modelImages.router";
import models from "./routers/models.router";
import organizations from "./routers/organizations.router";
import parts from "./routers/parts.router";
import partsToModels from "./routers/partsToModels.router";
import repairComments from "./routers/repairComments.router";
import repairImages from "./routers/repairImages.router";
import repairParts from "./routers/repairParts.router";
import repairs from "./routers/repairs.router";
import repairStatusTypes from "./routers/repairStatusTypes.router";
import repairTypes from "./routers/repairTypes.router";
import userOnboardings from "./routers/userOnboardings.router";
import users from "./routers/users.router";
import userTypes from "./routers/userTypes.router";
import { createCallerFactory, router } from "./trpc";

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
  userTypes,
});

export const createCaller = createCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
