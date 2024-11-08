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
    const env = await import("./infra/env");
    const auth = await import("./infra/auth");
    const email = await import("./infra/email");
    const storage = await import("./infra/storage");
    const api = await import("./infra/api");
    const web = await import("./infra/web");

    return {
      Region: aws.getRegionOutput().name,
      api: api.api.url,
      nextjs: web.nextjs.url,
    };
  },
});
