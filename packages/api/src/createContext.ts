import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { verifyToken } from "@repo/auth/tokens";
import { db } from "@repo/db";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";

export interface Session {
  userId: number;
  organizationId: number | null;
}

export async function createContext({
  event: { headers },
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) {
  const token = headers?.["authorization"];
  console.log({ token });
  if (!token) {
    return {
      db,
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
      session: session,
    };
  } catch {
    console.error("bad token");
    return {
      db,
      session: null,
    };
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
