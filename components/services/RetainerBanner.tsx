import React from "react";
import { retainerService } from "@/lib/services";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { ShieldCheck, Check } from "lucide-react";

export function RetainerBanner() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    retainerService.whatsappMessage
  )}`;

  return (
    <aside
      aria-label="Monthly Peace of Mind Retainer"
      className="mt-10 overflow-hidden rounded-xl border border-foreground/20 bg-foreground p-6 sm:p-8 lg:p-10 text-background shadow-paper-lift"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Information */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span className="label-xs text-background">Ongoing Defense</span>
          </div>

          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-background">
            {retainerService.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-background/80">
            {retainerService.description}
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 text-xs text-background/90">
            {retainerService.inclusions.map((inc) => (
              <li key={inc} className="flex items-start gap-2">
                <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span className="leading-snug">{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right CTA Box */}
        <div className="flex flex-col justify-center rounded-lg border border-background/15 bg-background/5 p-6 lg:col-span-5 text-center sm:text-left">
          <p className="label-xs text-accent">Monthly Investment</p>
          <p className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-background font-mono">
            {retainerService.price}
          </p>
          <p className="mt-1 text-xs text-background/60">
            {retainerService.timeline}
          </p>

          <div className="mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-paper transition-all hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Inquire for Retainer</span>
            </a>
          </div>

          <p className="mt-3 text-center text-[11px] text-background/50">
            Guaranteed 2-hour business day emergency response
          </p>
        </div>
      </div>
    </aside>
  );
}
