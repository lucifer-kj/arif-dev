"use client";

import { useRef, useState, useEffect } from "react";
import { serviceTiers } from "@/lib/services";
import { PricingCard } from "@/components/services/PricingCard";

export function HorizontalPricingRail() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Default to popular tier (index 1)

  const scrollToTier = (index: number) => {
    setActiveIndex(index);
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < serviceTiers.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div>
      {/* Mobile-Only Tier Switcher Tabs */}
      <div className="mb-6 flex items-center justify-between lg:hidden">
        <div className="flex w-full items-center gap-1.5 rounded-lg border border-border/80 bg-surface p-1">
          {serviceTiers.map((tier, idx) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => scrollToTier(idx)}
              className={`flex-1 rounded-md py-2 text-center text-xs font-medium transition-all ${
                activeIndex === idx
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {idx === 0 ? "Landing Page" : idx === 1 ? "Business Site" : "Custom App"}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="mb-3 flex items-center justify-between text-[11px] text-muted-foreground lg:hidden">
        <span className="font-mono">Tier {activeIndex + 1} of {serviceTiers.length}</span>
        <span className="text-accent flex items-center gap-1">
          <span>Swipe cards</span> &rarr;
        </span>
      </div>

      {/* Horizontal Draggable/Swipeable Rail on Mobile -> 3-Col Grid on Desktop */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {serviceTiers.map((tier) => (
          <div
            key={tier.id}
            className="w-[86vw] max-w-[360px] shrink-0 snap-center mr-4 last:mr-0 sm:w-[380px] lg:w-auto lg:max-w-none lg:shrink lg:mr-0"
          >
            <PricingCard tier={tier} />
          </div>
        ))}
      </div>

      {/* Mobile Position Indicator Dots */}
      <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
        {serviceTiers.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Jump to tier ${idx + 1}`}
            onClick={() => scrollToTier(idx)}
            className={`h-2 transition-all rounded-full ${
              activeIndex === idx ? "w-6 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
