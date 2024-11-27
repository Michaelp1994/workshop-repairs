import { HighlightInit } from "@highlight-run/next/client";

import { ENV } from "~/env";
export function ClientTelemetry() {
  return (
    <HighlightInit
      excludedHostnames={["localhost", "staging"]}
      networkRecording={{
        enabled: true,
        recordHeadersAndBody: true,
        urlBlocklist: [],
      }}
      projectId={ENV.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID}
      serviceName="frontend"
      tracingOrigins={["localhost", "api.workshop-repairs.link"]}
    />
  );
}
