import { publicProcedure, router } from "../trpc";

export default router({
  // Greeting procedure
  ping: publicProcedure.query(
    () => `Hello! The time is now: ${new Date().toString()}`,
  ),
});
