import "server-only"; // <-- ensure this file cannot be imported from the client
import { createTRPCContext } from "@repo/api/createContext";
// import { createContext } from "@repo/api/createContext";
import { appRouter, createCaller } from "@repo/api/router";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { makeQueryClient } from "./query-client";

const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");
  return createTRPCContext({
    headers: heads,
  });
});

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCaller(createContext);
export const { trpc: api, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);
