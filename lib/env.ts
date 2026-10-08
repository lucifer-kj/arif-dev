import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://arif.work"),
  NEXT_PUBLIC_CALCOM_URL: z
    .string()
    .url()
    .default("https://app.cal.com/arif-ali-0nu0b0/name-appointment"),
  NEXT_PUBLIC_CALCOM_LINK: z.string().default("arif-ali-0nu0b0/name-appointment"),
  NEXT_PUBLIC_CALCOM_NAMESPACE: z.string().default("name-appointment"),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d{10,14}$/, "Must be valid international phone number without spaces or +")
    .default("917439611032"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://arif.work",
  NEXT_PUBLIC_CALCOM_URL:
    process.env.NEXT_PUBLIC_CALCOM_URL ||
    "https://app.cal.com/arif-ali-0nu0b0/name-appointment",
  NEXT_PUBLIC_CALCOM_LINK:
    process.env.NEXT_PUBLIC_CALCOM_LINK || "arif-ali-0nu0b0/name-appointment",
  NEXT_PUBLIC_CALCOM_NAMESPACE:
    process.env.NEXT_PUBLIC_CALCOM_NAMESPACE || "name-appointment",
  NEXT_PUBLIC_WHATSAPP_NUMBER:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917439611032",
});
