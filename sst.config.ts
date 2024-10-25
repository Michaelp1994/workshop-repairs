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
    const vpc = new sst.aws.Vpc("MyVpc", { bastion: true, nat: "ec2" });
    const rds = new sst.aws.Postgres("MyPostgres", { vpc, proxy: true });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "pnpm run db:studio",
      },
    }); 

    const api = new sst.aws.Function("MyApi", {
      vpc,
      url: true,
      link: [rds],
      handler: "packages/api/src/api.handler",
    });

    const bucket = new sst.aws.Bucket("MyBucket", {
      access: "public"
    });
    new sst.aws.Nextjs("MyWeb", {
      link: [bucket]
    });
  },
});
