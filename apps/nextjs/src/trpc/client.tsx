"use client";

import { type AppRouter } from "@repo/api/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type ReactNode, useState } from "react";

import { makeQueryClient } from "./query-client";

interface TRPCReactProviderProps {
  children: ReactNode;
}

export const api = createTRPCReact<AppRouter>();
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    return process.env.NEXT_PUBLIC_URL;
  })();
  return `${base}/api/trpc`;
}
export function TRPCProvider({ children }: TRPCReactProviderProps) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
          headers: async () => {
            let heads;
            if (typeof window == "undefined") {
              const headers = await import("next/headers");
              heads = new Map(headers.headers());
            } else {
              heads = new Headers();
            }
            heads.set("x-trpc-source", "nextjs-react");
            return Object.fromEntries(heads);
          },
        }),
      ],
    }),
  );
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
