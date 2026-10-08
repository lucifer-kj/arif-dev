export interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType?: string;
}

export function reportWebVitals(metric: WebVitalMetric) {
  if (!["FCP", "LCP", "CLS", "FID", "INP", "TTFB"].includes(metric.name)) {
    return;
  }

  // Respect Do Not Track
  if (
    typeof navigator !== "undefined" &&
    (navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1")
  ) {
    return;
  }

  const payload = {
    metric: metric.name,
    value: Math.round(metric.value * 100) / 100,
    rating: metric.rating,
    navigationType: metric.navigationType,
    id: metric.id,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "production") {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/telemetry/vitals", JSON.stringify(payload));
    }
  } else {
    if (typeof console !== "undefined") {
      console.debug("[Web Vital]", payload);
    }
  }
}
