// constants.ts
import { z } from "zod";

// Must assign NEXT_PUBLIC_* env vars to a variable to force Next to inline them
const publicEnv = {
  NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID:
    process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
};

export const ENV = z
  .object({
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID: z.string(),
  })
  .parse(publicEnv);
