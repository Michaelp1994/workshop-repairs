/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  console: {
    autodeploy: {
      target(event) {
        if (
          event.type === "tag" &&
          event.tag.startsWith("v") &&
          event.action === "pushed"
        ) {
          return { stage: "production" };
        }
      },
    },
  },
  app(input) {
    return {
      name: "workshop-repairs",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-southeast-2",
          profile: "workshop-repairs",
        },
      },
    };
  },
  async run() {
    const email = await import("./infra/email");
    const storage = await import("./infra/storage");
    const web = await import("./infra/web");

    return {
      Region: aws.getRegionOutput().name,
      nextjs: web.nextjs.url,
      bucket: storage.router.url,
      email: email.email.sender,
    };
  },
});
