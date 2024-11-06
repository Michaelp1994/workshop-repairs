import { email } from "./email";
import { jwtSecret } from "./env";
import { rds, vpc, bucket } from "./storage";

export const api = new sst.aws.ApiGatewayV2("API1", {
  vpc,
  link: [rds, bucket, email, jwtSecret],
  cors: true,
});

api.route("GET /{proxy+}", {
  handler: "./packages/api/src/api.handler",
  nodejs: {
    install: ["@node-rs/argon2"],
  },
});

api.route("POST /{proxy+}", {
  handler: "./packages/api/src/api.handler",
  nodejs: {
    install: ["@node-rs/argon2"],
  },
});
