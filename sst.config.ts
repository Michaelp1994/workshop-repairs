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
        if (event.type === "pull_request") {
          return { stage: `pr-${event.number}` };
        }
      },
    },
  },
  app(input) {
    return {
      name: "workshop-repairs",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
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
      migrate: storage.migrationLambda.name,
      seed: storage.seedLambda.name,
    };
  },
});
