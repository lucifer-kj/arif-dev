import { z } from "zod";

export const BriefSubmissionSchema = z.object({
  websiteUrl: z
    .string()
    .trim()
    .min(3, "Please provide a valid website URL or business name")
    .max(250, "URL exceeds maximum length"),
  challengeDescription: z
    .string()
    .trim()
    .min(5, "Please briefly describe what feels slow, broken, or needs building")
    .max(1000, "Description exceeds maximum length"),
  contactChannel: z
    .string()
    .trim()
    .min(5, "Please provide your WhatsApp number or email address")
    .max(100, "Contact detail exceeds maximum length"),
  // Honeypot field (hidden from genuine users)
  botTrap: z.string().max(0, "Spam submission detected").optional(),
  // Form submission timestamp (for velocity checking)
  formRenderTime: z.number().optional(),
});

export type BriefSubmission = z.infer<typeof BriefSubmissionSchema>;
