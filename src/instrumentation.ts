import { SeverityNumber } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let loggerProvider: LoggerProvider | undefined;

if (!projectToken) {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
    );
  }
} else if (!host) {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      "NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured",
    );
  }
} else {
  loggerProvider = new LoggerProvider({
    resource: resourceFromAttributes({
      "service.name": "1manuelcdev-portfolio",
    }),
    processors: [
      new BatchLogRecordProcessor({
        exporter: new OTLPLogExporter({
          url: `${host.replace(/\/$/, "")}/i/v1/logs`,
          headers: {
            Authorization: `Bearer ${projectToken}`,
            "Content-Type": "application/json",
          },
        }),
      }),
    ],
  });
}

const posthogDashboardLogger = loggerProvider?.getLogger(
  "posthog-dashboard-mutations",
);

export type DashboardMutation =
  | "feature_flag_toggled"
  | "hero_content_saved"
  | "project_created";

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
}

export function logDashboardMutation(action: DashboardMutation) {
  posthogDashboardLogger?.emit({
    body: "dashboard mutation completed",
    severityNumber: SeverityNumber.INFO,
    attributes: { action },
  });
}

export async function flushPostHogLogs() {
  await loggerProvider?.forceFlush();
}
