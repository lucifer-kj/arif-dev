"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { env } from "@/lib/env";
import { ArrowUpRight, Calendar, X } from "lucide-react";

const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-border/80 bg-surface/50 p-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
        </span>
        <p className="label-xs text-muted-foreground">Initializing Cal.com Calendar...</p>
      </div>
    </div>
  ),
});

export function CalScheduler({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-background shadow-paper-lift">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="h-4 w-4 text-accent" />
            <h3 id="cal-modal-title" className="text-sm font-semibold tracking-tight text-foreground">
              Schedule a 20-Min Architecture Discussion
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            aria-label="Close scheduler"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cal Content */}
        <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 min-h-[460px]">
          {loadError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-sm text-foreground font-semibold">Calendar embed blocked or offline.</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                Your browser privacy settings or network may be blocking third-party embeds. You can open Cal.com directly in a new tab:
              </p>
              <a
                href={env.NEXT_PUBLIC_CALCOM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-xs hover:bg-accent/90"
              >
                <span>Open Cal.com in New Tab</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <Cal
              calLink={env.NEXT_PUBLIC_CALCOM_LINK}
              namespace={env.NEXT_PUBLIC_CALCOM_NAMESPACE}
              style={{ width: "100%", height: "100%", minHeight: "450px", overflow: "scroll" }}
              config={{ layout: "month_view" }}
            />
          )}
        </div>

        {/* Fallback footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface/60 px-6 py-3 text-xs text-muted-foreground">
          <span>Direct screen-share with Arif · 1-on-1 technical review</span>
          <a
            href={env.NEXT_PUBLIC_CALCOM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
          >
            <span>Direct Cal.com Link</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
