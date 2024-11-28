export const bucket = new sst.aws.Bucket("Bucket1", {
  access: "cloudfront",
});

export const router = new sst.aws.Router("MyRouter", {
  domain: "images.workshop-repairs.click",
  routes: {
    "/*": {
      bucket,
    },
  },
});

export const vpc = new sst.aws.Vpc("Vpc1", { nat: "ec2" });

const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER;
const host = process.env.POSTGRES_HOST;
const database = process.env.POSTGRES_DB;
const port = Number(process.env.POSTGRES_PORT);

if ($dev) {
  if (!password || !username || !database || !port) {
    throw new Error("Please check your .env file for postgres credentials.");
  }
}

export const rds = new sst.aws.Postgres("Postgres", {
  vpc,
  dev: {
    username,
    password,
    database,
    port,
    host,
  },
});

export const devCommand = new sst.x.DevCommand("Studio", {
  link: [rds],
  dev: {
    command: "pnpm db studio",
  },
});
