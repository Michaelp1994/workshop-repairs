import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

import { env } from "./env";

const token = Buffer.from(`${env.otlpClientId}:${env.otlpToken}`).toString(
  "base64",
);

const traceExporter = new OTLPTraceExporter({
  url: `${env.otlpEndpoint}/v1/traces`,

  headers: {
    Authorization: `Basic ${token}`,
  },
});

const metricExporter = new OTLPMetricExporter({
  url: `${env.otlpEndpoint}/v1/metrics`,
  headers: {
    Authorization: `Basic ${token}`,
  },
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
});

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: "workshop-repairs (dev)",
});

export const sdk = new NodeSDK({
  resource,
  traceExporter,
  metricReader,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
