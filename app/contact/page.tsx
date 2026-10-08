import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Arif — Direct WhatsApp & Consultation Scheduling",
  description:
    "Direct engineering consultation desk for Arif. Reach out directly on WhatsApp (+91 74396 11032) or book a Cal.com strategy meeting.",
};

export default function ContactPage() {
  return (
    <div className="min-h-[80vh]">
      <ContactSection />
    </div>
  );
}
