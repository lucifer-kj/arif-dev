"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { submitBrief } from "@/app/actions/submit-brief";
import { buildBriefWhatsAppFallback } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { X, CheckCircle2, AlertTriangle, Send } from "lucide-react";

interface AsyncBriefDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AsyncBriefDrawer({ isOpen, onClose }: AsyncBriefDrawerProps) {
  const [isPending, startTransition] = useTransition();
  const [formRenderTime, setFormRenderTime] = useState<number>(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form field state (preserved across errors)
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [contactChannel, setContactChannel] = useState("");
  const [botTrap, setBotTrap] = useState("");

  const drawerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormRenderTime(Date.now());
      setIsSuccess(false);
      setServerError(null);
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const formData = new FormData();
    formData.append("websiteUrl", websiteUrl);
    formData.append("challengeDescription", challengeDescription);
    formData.append("contactChannel", contactChannel);
    formData.append("botTrap", botTrap);
    formData.append("formRenderTime", String(formRenderTime));

    startTransition(async () => {
      try {
        const res = await submitBrief(formData);
        if (res.success) {
          setIsSuccess(true);
        } else {
          setServerError(res.error || "Submission could not be completed.");
        }
      } catch {
        setServerError("Network connection issue. Please use direct WhatsApp fallback.");
      }
    });
  };

  if (!isOpen) return null;

  const fallbackWhatsAppUrl = buildBriefWhatsAppFallback(
    websiteUrl,
    challengeDescription,
    contactChannel
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brief-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
    >
      <div
        ref={drawerRef}
        className="relative flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto border-l border-border bg-background p-6 sm:p-8 shadow-paper-lift transition-transform"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="label-xs text-accent">Async Project Brief</span>
              <h3 id="brief-drawer-title" className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                Request a Free 3-Minute Speed &amp; UX Teardown
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              aria-label="Close brief drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Send your website URL or project concept. I&rsquo;ll review your mobile performance,
            layout stability, and conversion funnel on video and send you direct feedback.
          </p>

          {isSuccess ? (
            <div className="mt-8 rounded-lg border border-emerald-300 bg-emerald-50/50 p-6 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
              <h4 className="mt-3 text-base font-semibold text-emerald-900">
                Brief Received Successfully
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                Thank you! I will review your site architecture and respond via your contact channel
                within 2 business hours.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex rounded-sm bg-foreground px-4 py-2 text-xs font-semibold text-background hover:bg-foreground/90 cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Honeypot field (hidden from screen & tab stop) */}
              <input
                type="text"
                name="botTrap"
                value={botTrap}
                onChange={(e) => setBotTrap(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              {/* Website URL or Business Name */}
              <div>
                <label htmlFor="websiteUrl" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                  Website URL / Brand Name <span className="text-accent">*</span>
                </label>
                <input
                  id="websiteUrl"
                  ref={firstInputRef}
                  type="text"
                  required
                  placeholder="e.g. https://yourbusiness.com or Brand Name"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="mt-1.5 w-full rounded-sm border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              {/* Challenge / Goal */}
              <div>
                <label htmlFor="challengeDescription" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                  What feels slow, broken, or needs building? <span className="text-accent">*</span>
                </label>
                <textarea
                  id="challengeDescription"
                  rows={4}
                  required
                  placeholder="e.g. High mobile bounce rates from Instagram ads, slow mobile checkout, or need a fresh ground-up rebuild..."
                  value={challengeDescription}
                  onChange={(e) => setChallengeDescription(e.target.value)}
                  className="mt-1.5 w-full rounded-sm border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              {/* WhatsApp or Email */}
              <div>
                <label htmlFor="contactChannel" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                  Your WhatsApp Number or Email <span className="text-accent">*</span>
                </label>
                <input
                  id="contactChannel"
                  type="text"
                  required
                  placeholder="e.g. +91 98765 43210 or founder@brand.in"
                  value={contactChannel}
                  onChange={(e) => setContactChannel(e.target.value)}
                  className="mt-1.5 w-full rounded-sm border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              {/* Error notice + Data-Preserving WhatsApp fallback */}
              {serverError && (
                <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 space-y-3">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Your brief information is safe. You can forward it directly to Arif on WhatsApp with one click:
                  </p>
                  <a
                    href={fallbackWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-4 py-2 font-semibold text-accent-foreground shadow-xs hover:bg-accent/90"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Send this Brief via WhatsApp</span>
                  </a>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-paper transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{isPending ? "Submitting Brief..." : "Submit for Free Teardown"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 border-t border-border pt-4 text-center">
          <p className="text-[11px] text-muted-foreground">
            Zero sales pressure · 100% confidential technical evaluation by Arif.
          </p>
        </div>
      </div>
    </div>
  );
}
