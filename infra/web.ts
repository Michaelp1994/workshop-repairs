import { bucket, rds, vpc, router } from "./storage";

export const nextjs = new sst.aws.Nextjs("MyWeb", {
  link: [bucket, router, rds],
  dev: {
    directory: "./apps/nextjs",
    command: "pnpm run dev",
  },
  vpc: vpc,
  path: "apps/nextjs",
  domain: "workshop-repairs.click",
  environment: {
    REACT_EDITOR: "code",

    NEXT_PUBLIC_URL:
      $app.stage === "production"
        ? "https://workshop-repairs.click"
        : "http://localhost:3000",
  },
});
