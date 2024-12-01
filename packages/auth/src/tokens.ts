import { jwtVerify, SignJWT } from "jose";

import type { Session } from "./sessions";

if (!process.env["JWT_SECRET"]) {
  throw new Error("JWT_SECRET environment variable is required");
}

const secret = new TextEncoder().encode(process.env["JWT_SECRET"]);

export async function generateToken(jwtPayload: Session) {
  const jwtToken = await new SignJWT({
    userId: jwtPayload.userId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .sign(secret);
  return jwtToken;
}

export async function verifyToken(token: string) {
  return await jwtVerify<Session>(token, secret);
}
