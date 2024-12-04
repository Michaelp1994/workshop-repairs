import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";

import type { Context } from "./createContext";
import type { Meta } from "./meta";

import createAuthMiddleware from "./middleware/authMiddleware";
import createOrganizationMiddleware from "./middleware/organizationMiddleware";

const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

export const { router, createCallerFactory } = t;

export const publicProcedure = t.procedure;

const authPlugin = createAuthMiddleware();

export const authedProcedure = t.procedure.unstable_concat(
  authPlugin.pluginProc,
);

const organizationPlugin = createOrganizationMiddleware();

export const organizationProcedure = t.procedure.unstable_concat(
  organizationPlugin.pluginProc,
);
