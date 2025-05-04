import { createTRPCContext } from "@repo/api/createContext";
import { appRouter } from "@repo/api/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { withServerTelemetry } from "~/telemetry/withServerTelemetry";

const handler = withServerTelemetry(async function GET(req: Request) {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError: ({ error }) => {
      console.log({ error });
      throw error;
    },
  });
  return response;
});

export const runtime = "nodejs";

export { handler as GET, handler as POST };
