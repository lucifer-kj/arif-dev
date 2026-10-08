export type TelemetryStatus = 'MEASURED' | 'TARGET' | 'REFERENCE' | 'UNAVAILABLE';

export interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  status: TelemetryStatus;
  statusLabel: string;
  source: string;
  businessOutcome: string;
}

export const heroTelemetryMetrics: TelemetryMetric[] = [
  {
    id: 'mobile-lcp',
    label: 'Mobile LCP Target',
    value: '< 1.0s',
    status: 'TARGET',
    statusLabel: 'Engineering Target',
    source: 'Emulated 4G Cellular Profile',
    businessOutcome: 'Mobile visitors do not abandon while waiting for your page to render.',
  },
  {
    id: 'pagespeed-score',
    label: 'PageSpeed Target',
    value: '95+',
    unit: '/ 100',
    status: 'TARGET',
    statusLabel: 'Audited Standard',
    source: 'Google Lighthouse Mobile Core Web Vitals',
    businessOutcome: 'Higher Google organic ranking potential and lower ad bounce rates.',
  },
  {
    id: 'js-payload',
    label: 'Initial JS Budget',
    value: '< 80',
    unit: 'KB',
    status: 'TARGET',
    statusLabel: 'Asset Budget',
    source: 'Next.js Production Bundle Analyzer',
    businessOutcome: 'Smooth responsiveness on standard cellular smartphones.',
  },
  {
    id: 'edge-ttfb',
    label: 'Edge TTFB Target',
    value: '< 50',
    unit: 'ms',
    status: 'TARGET',
    statusLabel: 'Static Delivery Target',
    source: 'Global CDN Static Edge Cache',
    businessOutcome: 'Near-instant first-byte response time from the first millisecond.',
  },
];
