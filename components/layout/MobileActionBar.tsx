"use client";

import Link from "next/link";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";

export function MobileActionBar() {
  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I am interested in discussing a project for my business."
  )}`;

  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-paper-lift backdrop-blur-lg lg:hidden"
    >
      <div className="grid grid-cols-2 gap-2.5">
        <Link
          href="/contact"
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-xs transition-colors duration-200 ease-out active:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer text-center"
        >
          Discuss Project
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:bg-surface active:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer text-center"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span>WhatsApp Arif</span>
        </a>
      </div>
    </aside>
  );
}
