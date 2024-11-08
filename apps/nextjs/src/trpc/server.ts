import { type AppRouter } from "@repo/api/router";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { cookies } from "next/headers";
import { Resource } from "sst";

const apiUrl = Resource.API1.url;

export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: apiUrl,
      headers() {
        const token = cookies().get("Authorization");
        if (!token) {
          return {};
        }
        return {
          Authorization: token.value,
        };
      },
    }),
  ],
});
