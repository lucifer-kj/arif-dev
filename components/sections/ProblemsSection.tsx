import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { Smartphone, Zap, AlertTriangle, FileCode2, ArrowRight } from "lucide-react";

const problems = [
  {
    icon: Smartphone,
    title: "Sluggish Mobile Rendering on Cellular Networks (6+ Second Wait)",
    body: "Uncompressed media, unbundled web fonts, and heavy render-blocking scripts force mobile visitors on Jio/Airtel 4G/5G connections to bounce before seeing your product or pricing.",
  },
  {
    icon: Zap,
    title: "Mobile Viewport Rupture & Horizontal Layout Blowout",
    body: "Unconstrained tables, oversized elements, and fixed CSS containers break responsive layouts on smaller Android screens, hiding critical WhatsApp and inquiry CTA buttons off-screen.",
  },
  {
    icon: AlertTriangle,
    title: "Silent Lead Loss & Unhandled Form Errors",
    body: "API timeouts and unhandled CORS errors cause contact forms to spin indefinitely without alerting either the visitor or the business owner, quietly leaking high-intent revenue.",
  },
  {
    icon: FileCode2,
    title: "Fragmented Codebases & WordPress Plugin Vulnerabilities",
    body: "Heavy reliance on 30+ visual builder plugins creates severe technical debt, security patch vulnerabilities, and costly recurring monthly maintenance hostage fees.",
  },
];

export function ProblemsSection() {
  return (
    <Section
      id="problems"
      label="Problem Taxonomy"
      title="Common failure modes I diagnose and eliminate"
      description="Most website redesigns fail not because of aesthetics, but because of poor mobile rendering, fragile plugin architectures, and multi-layered agency communication breakdowns."
      tone="surface"
      layout="stacked"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {problems.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="flex flex-col justify-between rounded-xl border border-border bg-background p-6 sm:p-7 shadow-paper transition-all hover:border-accent/40 hover:shadow-paper-lift"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explore Matrix Link Bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-border/80 bg-background p-5 text-xs text-muted-foreground sm:flex-row shadow-paper">
        <p className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span>See how solo engineering compares structurally against traditional agency overhead.</span>
        </p>

        <Link
          href="/problems"
          className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-foreground transition-colors group cursor-pointer"
        >
          <span>Explore Agency Comparison Matrix</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}
