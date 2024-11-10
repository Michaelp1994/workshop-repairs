import * as userOnboardingsController from "@repo/db/controllers/userOnboardings.controller";

import assertDatabaseResult from "../helpers/trpcAssert";
import { authedProcedure, router } from "../trpc";

export default router({
  getCurrentUser: authedProcedure.query(async ({ ctx }) => {
    const onboarding = await userOnboardingsController.getUser(
      ctx.session.userId,
    );
    assertDatabaseResult(onboarding);
    return onboarding;
  }),
});
