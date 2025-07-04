// Secure Analytics Export System
// Addresses privacy and security concerns while maintaining functionality

import { AnalyticsExporter, type ExportedAnalytics } from "./analytics-export";
import { Firestore } from "firebase/firestore";

interface SecureExportOptions {
  includePersonalData: boolean;
  encryptData: boolean;
  password?: string;
  sanitizationLevel: "minimal" | "moderate" | "aggressive";
}

// Extended type for secure exports with additional metadata
interface SecureExportedAnalytics extends ExportedAnalytics {
  metadata: ExportedAnalytics["metadata"] & {
    sanitized?: boolean;
    sanitizationLevel?: "minimal" | "moderate" | "aggressive";
    includesPersonalData?: boolean;
    encrypted?: boolean;
    encryptionMethod?: string;
  };
}

class SecureAnalyticsExporter extends AnalyticsExporter {
  // Generate a sanitized export safe for public hosting
  async exportSanitizedData(
    options: SecureExportOptions = {
      includePersonalData: false,
      encryptData: false,
      sanitizationLevel: "moderate",
    }
  ): Promise<SecureExportedAnalytics> {
    console.log("🔒 Starting secure analytics export...");

    // Get full data first
    const fullExport = await this.exportAllData();

    // Apply sanitization
    const sanitizedData = this.sanitizeExportData(fullExport, options);

    // Encrypt if requested
    if (options.encryptData && options.password) {
      return this.encryptExportData(sanitizedData, options.password);
    }

    return sanitizedData;
  }

  private sanitizeExportData(
    exportData: ExportedAnalytics,
    options: SecureExportOptions
  ): SecureExportedAnalytics {
    const { sanitizationLevel, includePersonalData } = options;

    console.log(`🧹 Applying ${sanitizationLevel} sanitization...`);

    return {
      metadata: {
        ...exportData.metadata,
        sanitized: true,
        sanitizationLevel,
        includesPersonalData: includePersonalData,
      },
      data: {
        sessions: this.sanitizeSessions(
          exportData.data.sessions,
          sanitizationLevel
        ),
        messages: this.sanitizeMessages(
          exportData.data.messages,
          sanitizationLevel
        ),
        buttonClicks: this.sanitizeButtonClicks(
          exportData.data.buttonClicks,
          sanitizationLevel
        ),
        tourInteractions: this.sanitizeTourInteractions(
          exportData.data.tourInteractions,
          sanitizationLevel
        ),
        deviceAnalytics: this.sanitizeDeviceAnalytics(
          exportData.data.deviceAnalytics,
          sanitizationLevel
        ),
        visitorLocations: this.sanitizeVisitorLocations(
          exportData.data.visitorLocations,
          sanitizationLevel
        ),
      },
      summary: this.sanitizeSummary(exportData.summary, sanitizationLevel),
    };
  }

  private sanitizeSessions(sessions: any[], level: string): any[] {
    return sessions.map((session) => {
      const base = {
        id: this.hashId(session.id),
        startTime: session.startTime,
        endTime: session.endTime,
        messageCount: session.messageCount,
        totalDuration: session.totalDuration,
      };

      switch (level) {
        case "minimal":
          return {
            ...base,
            location: {
              country: session.location?.country,
              region: session.location?.region,
            },
            deviceInfo: {
              type: session.deviceInfo?.type,
              os: session.deviceInfo?.os,
            },
          };

        case "moderate":
          return {
            ...base,
            location: {
              country: session.location?.country,
            },
            deviceInfo: {
              type: session.deviceInfo?.type,
            },
          };

        case "aggressive":
          return base;

        default:
          return base;
      }
    });
  }

  private sanitizeMessages(messages: any[], level: string): any[] {
    return messages.map((message) => ({
      id: this.hashId(message.id),
      sessionId: this.hashId(message.sessionId),
      timestamp: message.timestamp,
      type: message.type,
      // Remove actual message content for privacy
      hasContent: !!message.content,
      contentLength: message.content?.length || 0,
    }));
  }

  private sanitizeButtonClicks(clicks: any[], level: string): any[] {
    return clicks.map((click) => ({
      id: this.hashId(click.id),
      sessionId: this.hashId(click.sessionId),
      timestamp: click.timestamp,
      buttonType: click.buttonType,
      // Keep button text as it's not personally identifiable
      buttonText: click.buttonText,
      page: click.page,
    }));
  }

  private sanitizeTourInteractions(tours: any[], level: string): any[] {
    return tours.map((tour) => ({
      id: this.hashId(tour.id),
      sessionId: this.hashId(tour.sessionId),
      timestamp: tour.timestamp,
      action: tour.action,
      step: tour.step,
      stepName: tour.stepName,
    }));
  }

  private sanitizeDeviceAnalytics(devices: any[], level: string): any[] {
    return devices.map((device) => {
      const base = {
        id: this.hashId(device.id),
        timestamp: device.timestamp,
        deviceType: device.deviceType,
        os: device.os,
        browser: device.browser,
      };

      if (level === "aggressive") {
        return {
          ...base,
          // Remove specific versions and details
          os: device.os?.split(" ")[0], // Just OS name, not version
          browser: device.browser?.split(" ")[0], // Just browser name
        };
      }

      return base;
    });
  }

  private sanitizeVisitorLocations(locations: any[], level: string): any[] {
    return locations.map((location) => {
      const base = {
        id: this.hashId(location.id),
        timestamp: location.timestamp,
      };

      switch (level) {
        case "minimal":
          return {
            ...base,
            country: location.country,
            region: location.region,
            city: location.city,
          };

        case "moderate":
          return {
            ...base,
            country: location.country,
            region: location.region,
          };

        case "aggressive":
          return {
            ...base,
            country: location.country,
          };

        default:
          return base;
      }
    });
  }

  private sanitizeSummary(summary: any, level: string): any {
    // Summary stats are generally safe as they're aggregated
    return {
      ...summary,
      // Remove specific location names in aggressive mode
      topLocations:
        level === "aggressive"
          ? summary.topLocations.map((loc: any) => ({
              location: loc.location.split(",")[1] || "Unknown", // Country only
              count: loc.count,
            }))
          : summary.topLocations,
    };
  }

  private hashId(id: string): string {
    // Simple hash for IDs to maintain referential integrity while removing PII
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  private async encryptExportData(
    data: SecureExportedAnalytics,
    password: string
  ): Promise<SecureExportedAnalytics> {
    // Simple encryption for demonstration
    // In production, use proper encryption libraries
    const jsonString = JSON.stringify(data);
    const encrypted = btoa(jsonString); // Base64 encoding (not real encryption!)

    return {
      ...data,
      metadata: {
        ...data.metadata,
        encrypted: true,
        encryptionMethod: "base64", // In production: use AES-256
      },
      data: encrypted as any, // Replace data with encrypted string
    };
  }
}

// Authentication helper for protected endpoints
export function validateAnalyticsAccess(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const expectedAuth = `Bearer ${process.env.ANALYTICS_SECRET}`;

  return authHeader === expectedAuth;
}

// Middleware for protected analytics routes
export function withAnalyticsAuth(
  handler: (request: Request, ...args: any[]) => Promise<Response> | Response
) {
  return async (request: Request, ...args: any[]) => {
    if (!validateAnalyticsAccess(request)) {
      return new Response("Unauthorized", { status: 401 });
    }

    return handler(request, ...args);
  };
}

export { SecureAnalyticsExporter };
export type { SecureExportOptions };
