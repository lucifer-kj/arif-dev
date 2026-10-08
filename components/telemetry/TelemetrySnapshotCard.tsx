import { heroTelemetryMetrics, type TelemetryMetric } from "@/lib/telemetry-data";

export function TelemetrySnapshotCard() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-paper">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4">
        <div>
          <span className="label-xs text-accent">Engineering Benchmark</span>
          <h2 className="mt-1 text-sm font-semibold tracking-tight text-foreground uppercase">
            Site Target Profile &amp; Performance Bounds
          </h2>
        </div>
        <span className="label-xs self-start sm:self-auto rounded-sm border border-accent/30 bg-accent/10 px-2 py-1 text-accent font-semibold">
          Architectural Budget
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
        {heroTelemetryMetrics.map((metric: TelemetryMetric) => (
          <div
            key={metric.id}
            className="flex flex-col justify-between rounded-md border border-border/70 bg-background p-4 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                  {metric.statusLabel}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-mono">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {metric.unit}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs font-semibold text-foreground">
                {metric.label}
              </p>
            </div>

            <div className="mt-3 border-t border-border/60 pt-2.5">
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                {metric.businessOutcome}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-1 border-t border-border/80 pt-4 sm:flex-row sm:items-center sm:justify-between text-[11px] text-muted-foreground">
        <span>Audited build targets based on Next.js Static SSG and lightweight asset discipline.</span>
        <span className="font-mono text-[10px]">Zero fake telemetry · Truth in engineering</span>
      </div>
    </div>
  );
}
