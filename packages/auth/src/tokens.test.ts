import { expect, test } from "vitest";

import { generateToken, verifyToken } from "./tokens";

test("Can generate and verify a token.", async () => {
  const userId = 1;
  const token = await generateToken({ userId });
  const { payload } = await verifyToken(token);
  expect(payload.userId).toBe(userId);
});
