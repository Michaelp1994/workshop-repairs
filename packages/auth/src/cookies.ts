import type { IncomingHttpHeaders } from "http";

import { parse, serialize, type SerializeOptions } from "cookie";

export function getCookie(headers: IncomingHttpHeaders, name: string) {
  const cookieHeader = headers.cookie;
  if (!cookieHeader) return;
  const cookies = parse(cookieHeader);
  return cookies[name];
}

export function setCookie(
  name: string,
  value: string,
  options: SerializeOptions,
) {
  return serialize(name, value, options);
}
