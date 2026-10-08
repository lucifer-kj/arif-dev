"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/primitives";
import { env } from "@/lib/env";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { AsyncBriefDrawer } from "@/components/contact/AsyncBriefDrawer";
import { CalScheduler } from "@/components/contact/CalScheduler";
import { Calendar, Video, Mail, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Arif, I am interested in discussing a website / engineering project for my business."
  )}`;

  return (
    <>
      <section
        id="contact"
        className="border-t border-border bg-foreground py-20 text-background sm:py-24 lg:py-32"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Header Copy */}
            <div className="lg:col-span-6">
              <span className="label-xs text-accent">Direct Senior Collaboration</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-background sm:text-5xl lg:text-6xl leading-[1.06]">
                Let&rsquo;s build a website that delivers measurable commercial results.
              </h2>
              <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-background/70">
                Have an upcoming launch or a sluggish website costing you ad conversions?
                Reach out directly to Arif. Zero account managers, zero sales pitches.
                Typical response time is under 2 business hours.
              </p>

              <div className="mt-8 flex flex-col gap-3 text-xs text-background/60">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <a
                    href="mailto:arif@arif.work"
                    className="hover:text-background transition-colors"
                  >
                    arif@arif.work
                  </a>
                </div>
                <p>Location: Kolkata, India · Working with businesses worldwide</p>
              </div>
            </div>

            {/* Right 3 Conversion Rails Stack */}
            <div className="flex flex-col gap-4 lg:col-span-6">
              {/* Rail 1: WhatsApp Hotline (Primary) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-background/20 bg-background/5 p-6 transition-all duration-300 hover:border-accent hover:bg-background/10 shadow-paper cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground shadow-xs">
                      <WhatsAppIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-background">
                        Message Arif Directly on WhatsApp
                      </p>
                      <p className="text-xs text-background/60">
                        Fastest response · Send your URL or project notes directly
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-accent transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </a>

              {/* Rail 2: Async Brief Drawer (High Intent Free Teardown) */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="group flex flex-col justify-between rounded-xl border border-background/20 bg-background/5 p-6 text-left transition-all duration-300 hover:border-accent hover:bg-background/10 shadow-paper cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-background/20 bg-background/10 text-accent shadow-xs">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-background">
                        Request a Free 3-Minute Video Teardown
                      </p>
                      <p className="text-xs text-background/60">
                        I&rsquo;ll audit your mobile speed &amp; UX on video for free
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-accent transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </button>

              {/* Rail 3: Cal.com Consultation (Scheduled Discussion) */}
              <button
                type="button"
                onClick={() => setCalOpen(true)}
                className="group flex flex-col justify-between rounded-xl border border-background/20 bg-background/5 p-6 text-left transition-all duration-300 hover:border-accent hover:bg-background/10 shadow-paper cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-background/20 bg-background/10 text-accent shadow-xs">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-background">
                        Schedule a 20-Min Screen-Share (Cal.com)
                      </p>
                      <p className="text-xs text-background/60">
                        Open DevTools together on a live 1-on-1 technical review
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-accent transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Async Brief Drawer Modal */}
      <AsyncBriefDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Cal.com Scheduler Modal */}
      <CalScheduler isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
