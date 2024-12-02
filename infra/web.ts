import { email } from "./email";
import { bucket, rds, router, vpc } from "./storage";

const domain =
  $app.stage === "production"
    ? "workshop-repairs.click"
    : $app.stage === "staging"
      ? `staging.workshop-repairs.click`
      : undefined;

export const nextjs = new sst.aws.Nextjs("MyWeb", {
  link: [bucket, router, rds, email],
  dev: {
    directory: "./apps/nextjs",
    command: "pnpm run dev",
  },
  vpc: vpc,
  path: "apps/nextjs",
  domain,
  environment: {
    REACT_EDITOR: "code",
    JWT_SECRET: process.env["JWT_SECRET"],
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID:
      process.env["NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID"],
    NEXT_PUBLIC_URL:
      $app.stage === "production"
        ? "https://workshop-repairs.click"
        : "http://localhost:3000",
  },
});
