import { env } from "@/lib/env";

export function buildWhatsAppUrl(message: string): string {
  const phone = env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917439611032";
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function buildBriefWhatsAppFallback(url: string, challenge: string, contact?: string): string {
  const contactPart = contact ? ` (My contact: ${contact})` : "";
  const text = `Hi Arif, I am submitting a project brief for: ${url}${contactPart}. Our core goal / bottleneck: ${challenge}. Let's discuss scope.`;
  return buildWhatsAppUrl(text);
}
