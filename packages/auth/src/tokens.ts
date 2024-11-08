import type { OrganizationID } from "../../db/src/schemas/organizations.schema";
import type { UserID } from "@repo/validators/ids.validators";

import { jwtVerify, SignJWT } from "jose";
import { Resource } from "sst";

const secret = new TextEncoder().encode(Resource.JWT_SECRET.value);

export interface SessionData {
  userId: UserID;
  organizationId: OrganizationID | null;
}

export async function generateToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .sign(secret);
}

export async function verifyToken(token: string) {
  return await jwtVerify<SessionData>(token, secret);
}
