export const bucket = new sst.aws.Bucket("Bucket1", {
  access: "public",
});
export const vpc = new sst.aws.Vpc("Vpc1", { bastion: true, nat: "ec2" });
export const rds = new sst.aws.Postgres("Postgres1", { vpc, proxy: true });

export const devCommand = new sst.x.DevCommand("Studio", {
  link: [rds],
  dev: {
    directory: "./packages/db",
    command: "npx drizzle-kit studio",
  },
});
