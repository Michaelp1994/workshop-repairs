import type { NextRequest } from "next/server";

import { createTRPCContext } from "@repo/api/createContext";
import { appRouter } from "@repo/api/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

async function handler(req: NextRequest) {
  const results = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
  return results;
}

export { handler as GET, handler as POST };
