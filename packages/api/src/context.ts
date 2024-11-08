import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { verifyToken } from "@repo/auth/tokens";
import { db } from "@repo/db";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";

interface CreateContextInput
  extends CreateAWSLambdaContextOptions<APIGatewayProxyEventV2> {
  setCookie: (name: string, value: string) => void;
}

export interface Session {
  userId: number;
  organizationId: number | null;
}

export async function createContext({ event, setCookie }: CreateContextInput) {
  const session = {
    userId: 1,
    organizationId: 1,
  };
  return {
    db,
    session: session,
    setCookie,
  };

  const token = event.headers?.["authorization"];
  console.log({ token });
  if (!token) {
    return {
      db,
      session: null,
      setCookie,
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
      setCookie,
    };
  } catch {
    console.error("bad token");
    return {
      db,
      session: null,
      setCookie,
    };
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
