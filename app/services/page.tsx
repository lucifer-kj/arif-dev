import type { Metadata } from "next";
import { Container } from "@/components/ui/primitives";
import { retainerService } from "@/lib/services";
import { HorizontalPricingRail } from "@/components/services/HorizontalPricingRail";
import { RetainerBanner } from "@/components/services/RetainerBanner";
import Link from "next/link";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { ShieldCheck, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Tiers & Freelance Pricing | Arif — Web Architect",
  description:
    "Transparent freelance pricing starting at ₹18,000 for landing pages, ₹45,000 for business websites, and ₹90,000 for custom web apps. 100% client code ownership.",
};

export default function ServicesPage() {
  const whatsappRetainerUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    retainerService.whatsappMessage
  )}`;

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="label-xs text-accent">Commercial Architecture</p>
          <h1 className="mt-3 text-fluid-heading font-semibold text-foreground text-balance">
            Transparent Freelance Tiers &amp; Pricing
          </h1>
          <p className="mt-4 text-fluid-body text-muted-foreground leading-relaxed">
            Honest, predictable commercial models for Indian business owners, D2C brands, and tech founders.
            Zero agency middleman markups, zero proprietary platform lock-in, and 100% intellectual property transfer upon delivery.
          </p>
        </div>

        {/* 3-Tier Horizontal Rail on Mobile -> 3-Col Grid on Desktop */}
        <div className="mt-12">
          <HorizontalPricingRail />
        </div>

        {/* Client Code Ownership Assurance */}
        <div className="mt-12 rounded-xl border border-border/80 bg-surface p-6 sm:p-8 shadow-paper">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  The Zero-Hostage Client Ownership Policy
                </h2>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Most agencies lock your site inside proprietary platforms or withhold admin rights to force continuous retainer fees.
                With Arif, upon final project settlement, you receive 100% ownership: GitHub source code repository, Vercel/Cloudflare DNS credentials, domain rights, and asset exports.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-foreground/80 sm:flex-row sm:items-center sm:gap-4 font-mono">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> Full Git Repository
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> DNS &amp; Domain Handoff
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> Zero Agency Markup
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated Monthly Peace of Mind Retainer Section */}
        <div className="mt-16">
          <div className="mb-6">
            <p className="label-xs text-accent">Ongoing Engineering Defense</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Monthly Peace of Mind Retainer
            </h2>
          </div>
          <RetainerBanner />
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Need a custom quote tailored to specific enterprise requirements?
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-foreground px-5 text-xs font-medium uppercase tracking-wider text-background shadow-xs transition-opacity hover:opacity-90"
            >
              Submit Project Brief
            </Link>
            <a
              href={whatsappRetainerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-border bg-background px-5 text-xs font-semibold text-foreground transition-colors hover:bg-surface"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Ask a Pricing Question</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
