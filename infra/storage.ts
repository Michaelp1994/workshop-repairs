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

export const vpc = new sst.aws.Vpc("Vpc1", { bastion: true, nat: "ec2" });

const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USERNAME;
const database = process.env.POSTGRES_DATABASE;
const port = Number(process.env.POSTGRES_PORT);

if ($dev) {
  if (!password || !username || !database || !port) {
    throw new Error("Please check your .env file for postgres credentials.");
  }

  const container = new docker.Container("LocalPostgres1", {
    // Unique container name
    name: `postgres-${$app.name}-dev`,
    restart: "always",
    image: "postgres:16.4",
    ports: [
      {
        internal: 5432,
        external: port,
      },
    ],
    envs: [
      `POSTGRES_PASSWORD=${password}`,
      `POSTGRES_USER=${username}`,
      `POSTGRES_DB=${database}`,
    ],
    volumes: [
      {
        // Where to store the data locally
        hostPath: "/tmp/postgres-data",
        containerPath: "/var/lib/postgresql/data",
      },
    ],
  });
}

export const rds = $dev
  ? new sst.Linkable("Postgres1", {
      properties: {
        host: "localhost",
        port,
        username,
        password,
        database,
      },
    })
  : new sst.aws.Postgres("Postgres1", { vpc, proxy: true });

export const devCommand = new sst.x.DevCommand("Studio", {
  link: [rds],
  dev: {
    command: "pnpm db studio",
  },
});
