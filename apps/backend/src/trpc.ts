import { initTRPC } from "@trpc/server";
import z, { ZodError } from "zod";

import type { Context } from "./createContext";

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? z.flattenError(error.cause) : null,
      },
    };
  },
});

export const { router, procedure } = t;
