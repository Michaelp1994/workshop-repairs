import { ENV } from "./env";

export async function register() {
  const { registerHighlight } = await import("@highlight-run/next/server");

  registerHighlight({
    projectID: ENV.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
    serviceName: "my-nextjs-backend",
  });
}
