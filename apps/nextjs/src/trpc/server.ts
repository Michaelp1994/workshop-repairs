import { type AppRouter } from "@repo/api/router";
import { httpBatchLink } from "@trpc/client";
import { createTRPCClient } from "@trpc/react-query";
import { Resource } from "sst";

export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: Resource.API1.url,
    }),
  ],
});
