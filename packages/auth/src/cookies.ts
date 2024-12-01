import { parse, serialize, type SerializeOptions } from "cookie";

export function getCookie(headers: Headers, name: string) {
  const cookieHeader = headers.get("Cookie");
  if (!cookieHeader) return;
  const cookies = parse(cookieHeader);
  return cookies[name];
}

export function setCookie(
  resHeaders: Headers,
  name: string,
  value: string,
  options: SerializeOptions,
) {
  resHeaders.append("Set-Cookie", serialize(name, value, options));
}

export function getAuthCookie(headers: Headers) {
  return getCookie(headers, "Authorization");
}

export function setAuthCookie(
  resHeaders: Headers,
  value: string,
  options: SerializeOptions,
) {
  setCookie(resHeaders, "Authorization", value, options);
}
