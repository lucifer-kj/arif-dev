import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { HorizontalPricingRail } from "@/components/services/HorizontalPricingRail";
import { RetainerBanner } from "@/components/services/RetainerBanner";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function ServicesSection() {
  return (
    <Section
      id="services"
      label="Transparent Service Tiers"
      title="Clear deliverables, upfront pricing, zero surprises"
      description="Real pricing for Indian businesses, D2C brands, and tech founders. Direct engagement with a senior software engineer. No sales middlemen, no junior handoffs, and no hidden retainer markups."
      layout="stacked"
    >
      {/* Horizontal Swipeable Rail on Mobile -> Full 1200px 3-Column Grid on Desktop */}
      <div className="mt-2">
        <HorizontalPricingRail />
      </div>

      {/* Code Ownership Assurance Box */}
      <div className="mt-10 flex flex-col gap-3 rounded-lg border border-border/80 bg-surface p-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between shadow-paper">
        <div className="flex items-center gap-2.5 text-foreground font-medium">
          <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
          <span>100% Client Code &amp; Asset Ownership</span>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1 font-semibold text-accent hover:text-foreground transition-colors group cursor-pointer"
        >
          <span>Compare All Tiers &amp; Retainer Breakdown</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Monthly Peace of Mind Retainer Banner */}
      <div className="mt-12">
        <RetainerBanner />
      </div>
    </Section>
  );
}
