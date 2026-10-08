import type { Metadata } from "next";
import { Container } from "@/components/ui/primitives";
import { WorkShowcase } from "@/components/work/WorkShowcase";
import Link from "next/link";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Selected Work & Technical Evidence | Arif — Web Architect",
  description:
    "Explore verified client deliverables across E-Commerce, D2C brands, SaaS applications, and corporate platforms built by Arif with Next.js.",
};

export default function WorkPage() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I reviewed your selected work and would like to discuss building a project for my business."
  )}`;

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="label-xs text-accent">Portfolio Evidence</p>
          <h1 className="mt-3 text-fluid-heading font-semibold text-foreground text-balance">
            Selected Work &amp; Technical Outcomes
          </h1>
          <p className="mt-4 text-fluid-body text-muted-foreground leading-relaxed">
            Real client deliverables across E-Commerce, D2C storefronts, SaaS tools, and B2B corporate platforms.
            Every project was built directly by Arif with zero junior handoffs, sub-second mobile performance, and 100% client code ownership.
          </p>
        </div>

        {/* Interactive Filtered & Paginated Showcase */}
        <div className="mt-12">
          <WorkShowcase />
        </div>

        {/* Bottom Conversion Rail */}
        <div className="mt-16 rounded-xl border border-border/80 bg-foreground p-8 text-background sm:p-10 shadow-paper-lift">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="label-xs text-accent">Start Your Project</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-background">
                Need a fast, high-converting web storefront?
              </h2>
              <p className="mt-2 text-sm text-background/70 leading-relaxed">
                Skip the agency overhead. Direct communication, predictable timelines, and clean engineering.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-xs transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center rounded-sm border border-background/25 bg-background/10 px-5 text-sm font-semibold text-background transition-colors hover:bg-background/20"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
