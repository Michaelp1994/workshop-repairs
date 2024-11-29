export const bucket = new sst.aws.Bucket("Bucket1", {
  access: "cloudfront",
});

export const router = new sst.aws.Router("MyRouter", {
  domain:
    $app.stage === "production" ? "images.workshop-repairs.click" : undefined,
  routes: {
    "/*": {
      bucket,
    },
  },
});

export const vpc = new sst.aws.Vpc("Vpc1", { nat: "ec2", bastion: true });

const password = process.env.DEV_POSTGRES_PASSWORD;
const username = process.env.DEV_POSTGRES_USER;
const host = process.env.DEV_POSTGRES_HOST;
const database = process.env.DEV_POSTGRES_DB;
const port = Number(process.env.DEV_POSTGRES_PORT);

if ($dev) {
  if (!password || !username || !database || !port) {
    throw new Error("Please check your .env file for postgres credentials.");
  }
}

export const rds = new sst.aws.Postgres("Postgres", {
  vpc,
  proxy: true,
  dev: {
    username,
    password,
    database,
    port,
    host,
  },
});

export const migrationLambda = new sst.aws.Function("MigrationLambda", {
  handler: "packages/db/src/migrate.handler",
  copyFiles: [{ from: "packages/db/migrations", to: "migrations" }],
  link: [rds],
  vpc,
});

export const seedLambda = new sst.aws.Function("SeedLambda", {
  handler: "packages/db/src/seed.handler",
  link: [rds],
  vpc,
});

export const devCommand = new sst.x.DevCommand("Studio", {
  link: [rds],
  dev: {
    command: "pnpm db studio",
  },
});
