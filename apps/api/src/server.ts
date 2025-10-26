import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { createServer } from "http";

import { createTRPCContext } from "./createContext";
import { appRouter } from "./router";

const handler = createHTTPHandler({
  middleware: cors(),
  basePath: "/api/trpc/",
  router: appRouter,
  responseMeta() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    };
  },
  createContext: createTRPCContext,
});

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  handler(req, res);
});

server.listen(2022);
