/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "workshop-repairs",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      access: "public",
    });
    const vpc = new sst.aws.Vpc("MyVpc", { bastion: true, nat: "ec2" });
    const rds = new sst.aws.Postgres("MyPostgres", { vpc, proxy: true });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    const trpc = new sst.aws.Function("Trpc", {
      url: true,
      handler: "index.handler",
    });

    // const api = new sst.aws.Function("MyApi", {
    //   vpc,
    //   url: true,
    //   link: [rds],
    //   handler: "src/api.handler",
    // });

    // new sst.aws.Nextjs("MyWeb", {
    //   link: [bucket, rds],
    // });
    // return {
    //   api: api.url,
    // };
  },
});
