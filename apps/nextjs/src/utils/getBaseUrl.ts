export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return (
    process.env.NEXT_PUBLIC_URL ||
    `http://localhost:${process.env.PORT ?? 3000}`
  );
}
