export const bucket = new sst.aws.Bucket("Bucket1", {
  access: "public",
});

let vpc = undefined,
  rds;
if ($dev) {
  const password = "password";
  const username = "postgres";
  const database = "local";
  const port = 5432;

  new docker.Container("LocalPostgres", {
    // Unique container name
    name: `postgres-${$app.name}`,
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
  rds = new sst.Linkable("Postgres1", {
    properties: {
      host: "localhost",
      port,
      username,
      password,
      database,
    },
  });
} else {
  vpc = new sst.aws.Vpc("Vpc1", { bastion: true, nat: "ec2" });
  rds = new sst.aws.Postgres("Postgres1", { vpc, proxy: true });
}

export { rds, vpc };

export const devCommand = new sst.x.DevCommand("Studio", {
  link: [rds],
  dev: {
    directory: "./packages/db",
    command: "npx drizzle-kit studio",
  },
});
