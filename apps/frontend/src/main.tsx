import { initializeFaro } from "@grafana/faro-react";
import "@repo/ui/globals.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Failed to find the root element");

initializeFaro({
  // required: the URL of the Grafana collector
  url: "https://faro-collector-prod-au-southeast-1.grafana.net/collect/3a69e997df504d8f2dbceffee8e29392",

  // required: the identification label of your application
  app: {
    name: "workshop-repairs-browser (dev)",
    version: "1.0.0",
    environment: "production",
  },
});

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
