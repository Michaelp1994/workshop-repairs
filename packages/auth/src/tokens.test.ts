import { expect, test } from "vitest";

import { generateToken, verifyToken } from "./tokens";

test("Can generate and verify a token.", async () => {
  const userId = 1;
  const organizationId = 5;
  const token = await generateToken({ userId, organizationId });
  const { payload } = await verifyToken(token);
  expect(payload.userId).toBe(userId);
  expect(payload.organizationId).toBe(organizationId);
});
