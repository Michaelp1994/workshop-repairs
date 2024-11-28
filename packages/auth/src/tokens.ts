import type { OrganizationID, UserID } from "@repo/validators/ids.validators";

import { jwtVerify, SignJWT } from "jose";

if (!process.env["JWT_SECRET"]) {
  throw new Error("JWT_SECRET environment variable is required");
}

const secret = new TextEncoder().encode(process.env["JWT_SECRET"]);

export interface JWTPayload {
  userId: UserID;
  organizationId: OrganizationID | null;
}

export async function generateToken(jwtPayload: JWTPayload) {
  const jwtToken = await new SignJWT({
    userId: jwtPayload.userId,
    organizationId: jwtPayload.organizationId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .sign(secret);
  return jwtToken;
}

export async function verifyToken(token: string) {
  return await jwtVerify<JWTPayload>(token, secret);
}
