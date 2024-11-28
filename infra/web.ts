import { bucket, rds, router, vpc } from "./storage";

const domain =
  $app.stage === "production"
    ? "workshop-repairs.click"
    : `${$app.stage}.workshop-repairs.click`;

export const nextjs = new sst.aws.Nextjs("MyWeb", {
  link: [bucket, router, rds],
  dev: {
    directory: "./apps/nextjs",
    command: "pnpm run dev",
  },
  vpc: vpc,
  path: "apps/nextjs",
  domain,
  environment: {
    REACT_EDITOR: "code",
    NEXT_PUBLIC_URL:
      $app.stage === "production"
        ? "https://workshop-repairs.click"
        : "http://localhost:3000",
  },
});
