import { z } from "zod";

import { userId } from "./ids.validators";

export const updateCurrentUserSchema = z.object({
  userId,
  invitedOthers: z.boolean(),
  organizationChosen: z.boolean(),
});
