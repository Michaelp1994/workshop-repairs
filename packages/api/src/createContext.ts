import { verifyToken } from "@repo/auth/tokens";
import { db } from "@repo/db";
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

export async function createTRPCContext(
  opts: { headers: Headers },
  resHeaders: Headers,
) {
  function setCookie(name: string, value: string, options: SerializeOptions) {
    resHeaders.append("Set-Cookie", serialize(name, value, options));
  }
  const authCookie = getCookie(opts.headers, "Authorization");
  const token = authCookie?.split(" ")[1];
  if (!token) {
    console.log("no token");
    return {
      db,
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
      db,
      setCookie,
      session: session,
    };
  } catch {
    console.log(`Bad token: ${token}`);
    return {
      db,
      setCookie,
      session: null,
    };
  }
}
