import { expect, test } from "vitest";

import { createSetSession, getSession } from "./sessions";
import { generateToken } from "./tokens";

test("Can set a session cookie", async () => {
  const headers = new Headers();
  const setSession = createSetSession(headers);
  await setSession({ id: 1 });

  expect(headers.has("Set-Cookie")).toBe(true);
});

test("Can get a session cookie", async () => {
  const headers = new Headers();
  const userId = 1;
  const token = await generateToken({ userId });
  headers.append("Cookie", `Authorization=Bearer ${token}`);
  const session = await getSession(headers);

  expect(session).toEqual({ userId });
});
