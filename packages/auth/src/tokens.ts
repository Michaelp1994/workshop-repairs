import type { UserID } from "@repo/validators/ids.validators";

import { jwtVerify, SignJWT } from "jose";
import { Resource } from "sst";

const secret = new TextEncoder().encode(Resource.JWT_SECRET.value);

interface Payload {
  userId: UserID;
}

export async function generateToken(userId: UserID) {
  return await new SignJWT({ userId })
    .setProtectedHeader({
      alg: "HS256",
    })
    .sign(secret);
}

export async function verifyToken(token: string) {
  return await jwtVerify<Payload>(token, secret);
}
