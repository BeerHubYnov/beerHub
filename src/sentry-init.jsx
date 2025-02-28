import * as Sentry from "@sentry/react";

// Initialisation de Sentry
Sentry.init({
  dsn: "https://110cfa5a6d34b74dce126be5c901db31@o4508879998353408.ingest.de.sentry.io/4508890774306896",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
