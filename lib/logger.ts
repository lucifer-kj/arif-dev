export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  metadata?: Record<string, unknown>;
}

/**
 * Redacts PII patterns from text or metadata:
 * - Email addresses
 * - IPv4 and IPv6 addresses
 * - Full phone numbers (masks leading digits, keeps last 4)
 */
function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value
      // Redact email addresses
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]")
      // Redact IP addresses
      .replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, "[REDACTED_IP]")
      // Mask phone numbers (10 to 14 digits)
      .replace(/\b(\+?\d{1,4}[-.\s]?)?(\d{6,10})(\d{4})\b/g, "******$3");
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value !== null && typeof value === "object") {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      const lowerKey = key.toLowerCase();
      // Directly omit or flag sensitive keys
      if (
        lowerKey.includes("password") ||
        lowerKey.includes("secret") ||
        lowerKey.includes("token") ||
        lowerKey.includes("auth")
      ) {
        sanitizedObj[key] = "[REDACTED]";
      } else if (lowerKey.includes("email")) {
        sanitizedObj[key] = typeof val === "string" ? "[REDACTED_EMAIL]" : Boolean(val);
      } else if (lowerKey.includes("phone")) {
        if (typeof val === "string") {
          const digits = val.replace(/\D/g, "");
          sanitizedObj[key] = digits.length >= 4 ? `******${digits.slice(-4)}` : "[REDACTED_PHONE]";
        } else {
          sanitizedObj[key] = Boolean(val);
        }
      } else {
        sanitizedObj[key] = sanitizeValue(val);
      }
    }
    return sanitizedObj;
  }

  return value;
}

function outputLog(level: LogLevel, context: string, message: string, metadata?: Record<string, unknown>) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    context,
    message: sanitizeValue(message) as string,
    metadata: metadata ? (sanitizeValue(metadata) as Record<string, unknown>) : undefined,
  };

  const jsonString = JSON.stringify(entry);

  switch (level) {
    case "ERROR":
      console.error(jsonString);
      break;
    case "WARN":
      console.warn(jsonString);
      break;
    case "DEBUG":
      if (process.env.NODE_ENV === "development") {
        console.debug(jsonString);
      }
      break;
    case "INFO":
    default:
      console.info(jsonString);
      break;
  }
}

export const logger = {
  debug: (context: string, message: string, metadata?: Record<string, unknown>) =>
    outputLog("DEBUG", context, message, metadata),
  info: (context: string, message: string, metadata?: Record<string, unknown>) =>
    outputLog("INFO", context, message, metadata),
  warn: (context: string, message: string, metadata?: Record<string, unknown>) =>
    outputLog("WARN", context, message, metadata),
  error: (context: string, message: string, metadata?: Record<string, unknown>) =>
    outputLog("ERROR", context, message, metadata),
};
