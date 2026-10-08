"use server";

import { BriefSubmissionSchema } from "@/lib/validations/brief";
import { logger } from "@/lib/logger";

export interface SubmitBriefResult {
  success: boolean;
  error?: string;
}

export async function submitBrief(formData: FormData): Promise<SubmitBriefResult> {
  try {
    const rawData = {
      websiteUrl: formData.get("websiteUrl") as string,
      challengeDescription: formData.get("challengeDescription") as string,
      contactChannel: formData.get("contactChannel") as string,
      botTrap: (formData.get("botTrap") as string) || "",
      formRenderTime: Number(formData.get("formRenderTime") || 0),
    };

    // Honeypot trap inspection
    if (rawData.botTrap && rawData.botTrap.trim().length > 0) {
      logger.warn("submitBrief", "Spam submission trapped by honeypot", {
        hasTrapContent: true,
      });
      // Silently accept to avoid alerting bot operators
      return { success: true };
    }

    // Velocity inspection (prevent instant automated bot submissions < 2.5s)
    const now = Date.now();
    if (rawData.formRenderTime && now - rawData.formRenderTime < 2500) {
      logger.warn("submitBrief", "Rapid submission detected (velocity threshold breached)", {
        elapsedMs: now - rawData.formRenderTime,
      });
      return {
        success: false,
        error: "Submission rejected due to high automated velocity. Please review your brief and resubmit.",
      };
    }

    // Zod schema validation
    const parsed = BriefSubmissionSchema.safeParse(rawData);
    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message || "Invalid submission parameters";
      return {
        success: false,
        error: issue,
      };
    }

    // Zero-PII Structured Logging
    logger.info("submitBrief", "Valid brief submission received", {
      hasUrl: Boolean(parsed.data.websiteUrl),
      challengeLength: parsed.data.challengeDescription.length,
      contactChannelLength: parsed.data.contactChannel.length,
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    logger.error("submitBrief", "Unexpected exception during brief submission", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Temporary server transmission error. Please use WhatsApp fallback below.",
    };
  }
}
