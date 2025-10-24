import {
  createClearSession,
  createSetSession,
  getSession,
} from "@repo/auth/sessions";

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

interface CreateTRPCContextOptions {
  req: {
    headers: Headers;
  };
  resHeaders?: Headers;
}

export async function createTRPCContext({
  req,
  resHeaders,
}: CreateTRPCContextOptions) {
  const setSession = createSetSession(resHeaders);
  const clearSession = createClearSession(resHeaders);
  const session = await getSession(req.headers);
  return {
    setSession,
    clearSession,
    session,
  };
}
