import type { Metadata } from "next";
import { Container } from "@/components/ui/primitives";
import { StructuralComparisonTable } from "@/components/comparison/StructuralComparisonTable";
import { Smartphone, Zap, AlertTriangle, FileCode2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Problem Taxonomy & Agency Comparison | Arif — Web Architect",
  description:
    "Why traditional agencies and bloated WordPress templates fail Indian businesses on mobile cellular connections, and how direct senior engineering solves it.",
};

const failureModes = [
  {
    icon: Smartphone,
    title: "Sluggish Mobile Rendering on Cellular Networks (6+ Second Wait)",
    body: "Uncompressed media, unbundled web fonts, and heavy render-blocking scripts force mobile visitors on Jio/Airtel 4G/5G connections to bounce before seeing your product or pricing.",
    solution: "Sub-second Next.js SSG rendering with zero client-side database calls and optimized AVIF/WebP assets.",
  },
  {
    icon: Zap,
    title: "Mobile Viewport Rupture & Horizontal Layout Blowout",
    body: "Unconstrained tables, oversized elements, and fixed CSS containers break responsive layouts on smaller Android screens (360px–390px), pushing critical WhatsApp and inquiry CTA buttons off-screen.",
    solution: "Strict WCAG 2.2 AA mobile-first layout testing from 320px to 1920px with zero horizontal overflow.",
  },
  {
    icon: AlertTriangle,
    title: "Silent Lead Loss & Unhandled Form Errors",
    body: "API timeouts and unhandled CORS errors cause contact forms to spin indefinitely without alerting either the visitor or the business owner, quietly leaking high-intent revenue.",
    solution: "Defensive server actions with honeypot security, zero-PII logging, and direct WhatsApp instant fallback.",
  },
  {
    icon: FileCode2,
    title: "Fragmented Codebases & WordPress Plugin Vulnerabilities",
    body: "Heavy reliance on 30+ visual builder plugins creates severe technical debt, security patch vulnerabilities, and costly recurring monthly maintenance hostage fees.",
    solution: "Clean-slate Next.js with strict TypeScript and Tailwind CSS v4. No visual page-builder runtime overhead.",
  },
];

export default function ProblemsPage() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I saw your breakdown of agency failure modes and want to discuss auditing or rebuilding my current website."
  )}`;

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="label-xs text-accent">Problem Taxonomy</p>
          <h1 className="mt-3 text-fluid-heading font-semibold text-foreground text-balance">
            Why Traditional Agencies &amp; Bloated CMS Sites Fail Indian Businesses
          </h1>
          <p className="mt-4 text-fluid-body text-muted-foreground leading-relaxed">
            Most website redesigns fail not because of visual aesthetic issues, but because of slow mobile cellular rendering, fragile plugin stacks, and bureaucratic agency communication layers.
          </p>
        </div>

        {/* 4 Failure Modes Breakdown */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            The 4 Critical Engineering Failure Modes
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {failureModes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col justify-between rounded-xl border border-border/80 bg-background p-6 sm:p-7 shadow-paper transition-all hover:border-accent/40 hover:shadow-paper-lift"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base sm:text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>

                  <div className="mt-5 rounded-lg border border-border/70 bg-surface/70 p-3.5">
                    <p className="label-xs text-accent font-semibold">The Arif Engineering Standard</p>
                    <p className="mt-1 text-xs text-foreground/90 font-medium">
                      {item.solution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Structural Comparison Matrix */}
        <div className="mt-16">
          <StructuralComparisonTable />
        </div>

        {/* Bottom CTA Rail */}
        <div className="mt-16 rounded-xl border border-border/80 bg-surface p-8 text-center sm:p-10 shadow-paper">
          <p className="label-xs text-accent">Ready for a Better Approach?</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Get a direct engineering evaluation for your web presence
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Send your current website URL. Arif will evaluate your cellular load speed, mobile UX, and conversion barriers with zero sales pressure.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-xs transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Send URL on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[46px] items-center gap-1.5 rounded-sm border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              <span>Schedule Architecture Call</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
