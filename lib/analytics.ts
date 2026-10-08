import { logger } from "@/lib/logger";

export type AnalyticsEventType =
  | "cta_whatsapp_click"
  | "brief_drawer_opened"
  | "brief_submitted"
  | "cal_scheduler_opened"
  | "case_study_expanded";

export interface AnalyticsEventPayload {
  source?: string;
  tierId?: string;
  trigger?: string;
  channel?: string;
  caseStudyId?: string;
  submissionSuccess?: boolean;
  timeToFillMs?: number;
}

export function trackEvent(event: AnalyticsEventType, payload?: AnalyticsEventPayload) {
  if (typeof window === "undefined") return;

  // Respect user's Do Not Track preference
  if (navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1") {
    return;
  }

  const sanitizedPayload = {
    event,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "production") {
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/telemetry/events", JSON.stringify(sanitizedPayload));
      }
    } catch {
      // Non-blocking telemetry failure is quietly ignored
    }
  } else {
    logger.debug("Analytics", `Event: ${event}`, sanitizedPayload);
  }
}
