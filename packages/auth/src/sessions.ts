import type { UserID } from "@repo/validators/ids.validators";

import { getCookie, setCookie } from "./cookies";
import { generateToken, verifyToken } from "./tokens";

export interface Session {
  userId: number;
}

export async function getSession(headers: Headers): Promise<Session | null> {
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

export function createSetSession(resHeaders?: Headers) {
  return async function (user: { id: UserID }) {
    if (!resHeaders) {
      throw new Error(
        "You are trying to set a session within a server component that does not have access to the response headers.",
      );
    }
    const token = await generateToken({
      userId: user.id,
    });
    setCookie(resHeaders, "Authorization", `Bearer ${token}`, {
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookie(resHeaders, "userId", user.id.toString(), {
      secure: false,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  };
}

export function createClearSession(resHeaders?: Headers) {
  return async function () {
    if (!resHeaders) {
      throw new Error(
        "You are trying to clear a session within a server component that does not have access to the response headers.",
      );
    }
    setCookie(resHeaders, "Authorization", "", {
      secure: false,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    setCookie(resHeaders, "userId", "", {
      secure: false,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
  };
}
