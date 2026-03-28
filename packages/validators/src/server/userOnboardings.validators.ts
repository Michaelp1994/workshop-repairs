import { z } from "zod";

import { userId } from "../isomorphic/ids.validators";

export const updateCurrentUserSchema = z.object({
  userId,
  invitedOthers: z.boolean(),
  organizationChosen: z.boolean(),
});
