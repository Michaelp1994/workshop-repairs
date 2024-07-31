import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import assets from "./routers/assets.router";
import clients from "./routers/clients.router";
import locations from "./routers/locations.router";
import manufacturers from "./routers/manufacturers.router";
import meta from "./routers/meta.router";
import modelImages from "./routers/modelImages.router";
import models from "./routers/models.router";
import parts from "./routers/parts.router";
import partsToModels from "./routers/partsToModels.router";
import repairComments from "./routers/repairComments.router";
import repairImages from "./routers/repairImages.router";
import repairParts from "./routers/repairParts.router";
import repairs from "./routers/repairs.router";
import repairStatusTypes from "./routers/repairStatusTypes.router";
import repairTypes from "./routers/repairTypes.router";
import users from "./routers/users.router";
import userTypes from "./routers/userTypes.router";
import { createCallerFactory, router } from "./trpc";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  // post: postRouter,
  assets,
  clients,
  locations,
  manufacturers,
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
  userTypes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
