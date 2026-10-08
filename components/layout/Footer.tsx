import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { env } from "@/lib/env";

export function Footer() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I am interested in discussing a project for my business."
  )}`;

  return (
    <footer className="border-t border-foreground/20 bg-foreground pb-[calc(6rem+env(safe-area-inset-bottom))] pt-16 text-background/80 lg:pb-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Identity & Practice */}
          <div className="md:col-span-6 lg:col-span-7">
            <Link
              href="/"
              className="text-xl font-semibold tracking-[-0.04em] text-background transition-opacity hover:opacity-85"
            >
              Arif<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-background/70">
              Independent Web Engineering Practice. High-converting landing pages, complete
              business websites, and modern web applications built for Indian businesses, D2C
              brands, and tech founders.
            </p>
            <p className="mt-4 text-xs text-background/50">
              Direct engineering engagement • Zero agency middlemen • 100% source code ownership.
            </p>
          </div>

          {/* Navigation & Direct Links */}
          <div className="grid grid-cols-2 gap-6 md:col-span-6 lg:col-span-5">
            <div>
              <p className="label-xs text-accent">Index</p>
              <ul className="mt-4 space-y-2.5 text-xs text-background/70">
                <li>
                  <Link href="/work" className="hover:text-background transition-colors">
                    Selected Work
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-background transition-colors">
                    Service Tiers &amp; Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/problems" className="hover:text-background transition-colors">
                    Problem Taxonomy
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-background transition-colors">
                    Engineering Stance
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-background transition-colors">
                    Conversion Desk
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="label-xs text-accent">Direct Contact</p>
              <ul className="mt-4 space-y-2.5 text-xs text-background/70">
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors"
                  >
                    WhatsApp Hotline
                  </a>
                </li>
                <li>
                  <a
                    href={env.NEXT_PUBLIC_CALCOM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors"
                  >
                    Cal.com Meeting
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:arif@arif.work"
                    className="hover:text-background transition-colors"
                  >
                    arif@arif.work
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors"
                  >
                    GitHub Architecture
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Provenance & Performance Micro-Label */}
        <div className="mt-12 flex flex-col gap-3 border-t border-background/15 pt-8 text-xs text-background/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Built with Next.js App Router (Static SSG) • Zero Database Overhead • Styled with OKLCH Tokens</span>
          </p>
          <p>© {new Date().getFullYear()} Arif. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
