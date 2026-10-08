import Link from "next/link";
import Image from "next/image";
import { Container, WhatsAppIcon } from "@/components/ui/primitives";
import { env } from "@/lib/env";

export function HeroSection() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I'd like to discuss a web engineering project for my business."
  )}`;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24 border-b border-border bg-background">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Positioning & Action Rails */}
          <div className="lg:col-span-7">
            <p className="label-xs text-accent">
              INDEPENDENT SOFTWARE ENGINEER · AI AUTOMATION · WEB
            </p>

            <h1 className="mt-3.5 sm:mt-4 text-balance text-fluid-hero font-semibold text-foreground tracking-tight">
              I build digital systems that turn ideas into working businesses.
            </h1>

            <p className="mt-4 sm:mt-5 max-w-2xl text-fluid-subheading text-muted-foreground leading-relaxed">
              Websites, automations, AI systems, and digital products engineered for speed, clarity, and growth.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-xs transition-opacity hover:opacity-90"
              >
                <span>Let&apos;s Work Together</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:bg-background"
              >
                <span>See My Work</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Quiet tertiary direct link */}
            <div className="mt-3.5 sm:mt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 text-accent" />
                <span>WhatsApp me directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Hero Visual Anchor */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-none">
              <Image
                src="/hero.png"
                alt="Arif — Independent Software Engineer & Web Architect"
                width={936}
                height={739}
                priority
                className="h-auto w-full object-contain select-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
