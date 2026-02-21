import { publicProcedure } from "../procedures";
import { router } from "../trpc";

export default function metaRouter() {
  return router({
    // Greeting procedure
    ping: publicProcedure.query(
      () => `Hello! The time is now: ${new Date().toString()}`,
    ),
  });
}
