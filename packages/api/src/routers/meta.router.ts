import { publicProcedure, router } from "../trpc";

export default router({
  // Greeting procedure
  version: publicProcedure.query(() => process.env["npm_package_version"]),
});
