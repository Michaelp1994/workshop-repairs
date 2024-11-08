import { api } from "./api";
// import { identityPool, userPool, userPoolClient } from "./auth";
import { bucket, rds } from "./storage";

const region = aws.getRegionOutput().name;

export const nextjs = new sst.aws.Nextjs("MyWeb", {
  link: [bucket, rds, api],
  dev: {
    directory: "./apps/nextjs",
    command: "pnpm run dev",
  },
  path: "apps/nextjs",
  domain: "workshop-repairs.click",
  environment: {
    NEXT_PUBLIC_AWS_REGION: region,
    NEXT_PUBLIC_AWS_API_URL: api.url,
    NEXT_PUBLIC_AWS_BUCKET: bucket.name,
    NEXT_PUBLIC_DOMAIN:
      $app.stage === "production" ? "workshop-repairs.click" : "localhost:3000",
  },
});
