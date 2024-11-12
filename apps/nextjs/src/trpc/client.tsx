"use client";

import { type AppRouter } from "@repo/api/router";
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type ReactNode, useMemo } from "react";

import { useAuth } from "../auth/AuthContext";

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
      staleTime: 30 * 1000,
    },
  },
});

export function TRPCReactProvider(props: TRPCReactProviderProps) {
  const { token } = useAuth();
  if (!apiUrl) {
    throw new Error("Please set NEXT_PUBLIC_AWS_API_URL env variable.");
  }
  const trpcClient = useMemo(
    () =>
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
    [token],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
