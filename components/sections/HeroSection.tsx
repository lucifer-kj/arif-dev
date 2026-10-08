import Link from "next/link";
import { Container, WhatsAppIcon } from "@/components/ui/primitives";
import { env } from "@/lib/env";

export function HeroSection() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I'd like to discuss a web engineering project for my business."
  )}`;

  return (
    <section className="py-12 sm:py-16 lg:py-20 border-b border-border bg-background">
      <Container>
        <div className="max-w-4xl">
          <p className="label-xs text-accent">
            Independent Senior Software Engineer &amp; Web Architect
          </p>

          <h1 className="mt-4 text-balance text-fluid-hero font-semibold text-foreground tracking-tight">
            Fast mobile websites that turn traffic into real business inquiries.
          </h1>

          <p className="mt-5 max-w-2xl text-fluid-subheading text-muted-foreground leading-relaxed">
            Direct senior engineering craft for Indian businesses, D2C brands, and tech founders.
            Zero agency middlemen, sub-second cellular performance, and 100% client code ownership.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-xs transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>WhatsApp Arif Directly</span>
            </a>
            <Link
              href="/work"
              className="inline-flex min-h-[46px] items-center rounded-sm border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:bg-background"
            >
              Selected Work (7)
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[46px] items-center rounded-sm border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:bg-background"
            >
              Commercial Tiers &amp; Pricing
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
