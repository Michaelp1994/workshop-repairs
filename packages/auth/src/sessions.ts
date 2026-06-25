import type { IncomingHttpHeaders, ServerResponse } from "http";

import { getCookie, setCookie } from "./cookies";
import { generateToken, verifyToken } from "./tokens";

export interface Session {
  userId: number;
}

export async function getSession(
  headers: IncomingHttpHeaders,
): Promise<Session | null> {
  const authCookie = getCookie(headers, "Authorization");
  if (!authCookie) {
    return null;
  }
  const token = authCookie.split(" ")[1];
  if (!token) {
    return null;
  }
  try {
    const verifiedToken = await verifyToken(token);
    const session = {
      userId: verifiedToken.payload.userId,
    };
    return session;
  } catch (e) {
    console.log("Bad token: ", e);
    return null;
  }
}

export function createSetSession(res: ServerResponse) {
  return async function (user: { id: number }) {
    const token = await generateToken({
      userId: user.id,
    });
    const cookieValue = setCookie("Authorization", `Bearer ${token}`, {
      secure: false,
      sameSite: "lax",
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    res.appendHeader("Set-Cookie", cookieValue);
  };
}

export function createClearSession(res: ServerResponse) {
  return function () {
    const authCookie = setCookie("Authorization", "", {
      secure: false,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    res.appendHeader("Set-Cookie", authCookie);
  };
}
