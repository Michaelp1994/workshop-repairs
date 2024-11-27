import { verifyToken } from "@repo/auth/tokens";
import { parse, serialize, type SerializeOptions } from "cookie";

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

export interface Session {
  userId: number;
  organizationId: number | null;
}

function getCookie(headers: Headers, name: string) {
  const cookieHeader = headers.get("Cookie");
  if (!cookieHeader) return;
  const cookies = parse(cookieHeader);
  return cookies[name];
}

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
  function setCookie(name: string, value: string, options: SerializeOptions) {
    resHeaders?.append("Set-Cookie", serialize(name, value, options));
  }
  const authCookie = getCookie(req.headers, "Authorization");
  const token = authCookie?.split(" ")[1];
  if (!token) {
    console.log("no token");
    return {
      setCookie,
      session: null,
    };
  }
  try {
    const verifiedToken = await verifyToken(token);
    const session = {
      userId: verifiedToken.payload.userId,
      organizationId: verifiedToken.payload.organizationId,
    };
    return {
      setCookie,
      session: session,
    };
  } catch {
    console.log(`Bad token: ${token}`);
    return {
      setCookie,
      session: null,
    };
  }
}
