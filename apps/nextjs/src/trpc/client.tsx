"use client";

import { type AppRouter } from "@repo/api/router";
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type ReactNode, useState } from "react";

import { useAuth } from "./AuthContext";

interface TRPCReactProviderProps {
  children: ReactNode;
}

const apiUrl = process.env.NEXT_PUBLIC_AWS_API_URL;

export const api = createTRPCReact<AppRouter>();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      retry: false,
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 30 * 1000,
    },
  },
});

export function TRPCReactProvider(props: TRPCReactProviderProps) {
  if (!apiUrl) {
    throw new Error("Please set NEXT_PUBLIC_AWS_API_URL env variable.");
  }
  const { token } = useAuth();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: apiUrl,
          headers() {
            if (!token) {
              return {};
            }
            return {
              Authorization: token,
            };
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
