// import { identityPool, userPool, userPoolClient } from "./auth";
import { jwtSecret } from "./env";
import { bucket, rds, vpc } from "./storage";

const region = aws.getRegionOutput().name;

export const nextjs = new sst.aws.Nextjs("MyWeb", {
  link: [bucket, rds, jwtSecret],
  dev: {
    directory: "./apps/nextjs",
    command: "pnpm run dev",
  },
  vpc: vpc,
  path: "apps/nextjs",
  domain: "workshop-repairs.click",
  environment: {
    REACT_EDITOR: "code",
    NEXT_PUBLIC_AWS_REGION: region,
    NEXT_PUBLIC_AWS_BUCKET: bucket.name,
    NEXT_PUBLIC_URL:
      $app.stage === "production"
        ? "https://workshop-repairs.click"
        : "http://localhost:3000",
  },
});
