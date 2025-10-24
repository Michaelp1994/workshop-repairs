import { createTRPCContext } from "@repo/api/createContext";
import { appRouter } from "@repo/api/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = async function GET(req: Request) {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
  return response;
};

export const runtime = "nodejs";

export { handler as GET, handler as POST };
