import { z } from "zod";

import { userId } from "./ids.validators";

export const updateCurrentUserSchema = z.object({
  userId: userId,
  invitedOthers: z.boolean(),
  organizationChosen: z.boolean(),
});
