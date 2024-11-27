import { AppRouterHighlight } from "@highlight-run/next/server";

// utils/edge-highlight.config.ts:
import { ENV } from "../env";

export const withServerTelemetry = AppRouterHighlight({
  projectID: ENV.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
  serviceName: "backend",
  environment: "development",
});
