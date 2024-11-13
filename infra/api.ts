import { email } from "./email";
import { jwtSecret } from "./env";
import { rds, vpc, bucket } from "./storage";

export const api = new sst.aws.ApiGatewayV2("API1", {
  domain: $dev ? undefined : "api.workshop-repairs.click",
  vpc,
  link: [rds, bucket, email, jwtSecret],
});

api.route("GET /{proxy+}", {
  name: `${$app.name}-${$app.stage}-api-get`,
  handler: "./packages/api/src/api.handler",
  vpc,
  nodejs: {
    install: ["@node-rs/argon2"],
  },
});

api.route("POST /{proxy+}", {
  name: `${$app.name}-${$app.stage}-api-post`,
  handler: "./packages/api/src/api.handler",
  vpc,
  link: [rds],
  nodejs: {
    install: ["@node-rs/argon2"],
  },
});
