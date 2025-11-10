import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

import {
  createClearSession,
  createSetSession,
  getSession,
} from "@repo/auth/sessions";

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

export async function createTRPCContext({
  req,
  res,
}: CreateHTTPContextOptions) {
  const setSession = createSetSession(res);
  const clearSession = createClearSession(res);
  const session = await getSession(req.headers);
  return {
    setSession,
    clearSession,
    session,
  };
}
