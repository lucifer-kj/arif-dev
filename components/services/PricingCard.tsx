"use client";

import React, { useState } from "react";
import type { ServiceTier } from "@/lib/services";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { Check, X, Clock, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export function PricingCard({ tier }: { tier: ServiceTier }) {
  const [expanded, setExpanded] = useState(false);

  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    tier.whatsappMessage
  )}`;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 sm:p-7 transition-all duration-300 ${
        tier.popular
          ? "ring-2 ring-accent shadow-paper-lift"
          : "shadow-paper hover:border-accent/40 hover:shadow-paper-lift"
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-6 rounded-sm bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground shadow-xs">
          Recommended Choice
        </div>
      )}

      <div>
        {/* Micro Badge */}
        <span className="label-xs text-accent font-semibold tracking-wider">
          {tier.badge}
        </span>

        {/* Title & Description */}
        <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          {tier.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {tier.description}
        </p>

        {/* Pricing Block */}
        <div className="mt-5 rounded-lg border border-border/70 bg-surface/60 p-4">
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
            {tier.priceNote}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground font-mono">
            <span>Range: <strong className="text-foreground">{tier.typicalRange}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1 text-accent font-sans">
              <Clock className="h-3.5 w-3.5" />
              <span>{tier.timeline}</span>
            </span>
          </div>
        </div>

        {/* Core Inclusions (Always Visible Bite-Sized Snapshot) */}
        <div className="mt-5">
          <p className="label-xs text-foreground font-semibold">Core Deliverables</p>
          <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-foreground/90">
            {tier.inclusions.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Drill-Down for Full Scope, Exclusions, & Terms */}
        {expanded && (
          <div className="mt-4 space-y-4 border-t border-border/70 pt-4 animate-in fade-in duration-200">
            {tier.inclusions.length > 3 && (
              <div>
                <p className="label-xs text-muted-foreground font-semibold">Additional Inclusions</p>
                <ul className="mt-2 space-y-1.5 text-xs text-foreground/80">
                  {tier.inclusions.slice(3).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tier.exclusions.length > 0 && (
              <div className="border-t border-border/60 pt-3">
                <p className="label-xs text-muted-foreground font-semibold">Explicit Exclusions</p>
                <ul className="mt-1.5 space-y-1.5 text-xs text-muted-foreground">
                  {tier.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <X className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-md border border-border/70 bg-surface/50 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>Revision &amp; Handover Policy</span>
              </div>
              <p className="mt-1">{tier.revisionPolicy}</p>
            </div>
          </div>
        )}

        {/* Toggle Scope Details Button */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-sm border border-border/80 bg-surface/40 py-2 text-xs font-medium text-muted-foreground hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
        >
          <span>{expanded ? "Show Less" : `View Full Scope (${tier.inclusions.length} items + Terms)`}</span>
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Direct WhatsApp CTA Button */}
      <div className="mt-6 border-t border-border/70 pt-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
            tier.popular
              ? "bg-accent text-accent-foreground shadow-paper hover:bg-accent/90"
              : "border border-border bg-surface text-foreground hover:bg-background"
          }`}
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span>Discuss on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
