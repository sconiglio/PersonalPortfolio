import { google } from "googleapis";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface StoredTokens {
  access_token: string;
  refresh_token: string;
  scope?: string;
  token_type?: string;
  expiry_date?: number;
  updated_at: string;
}

class OAuth2CalendarClient {
  private oauth2Client: any;
  private tokenDocId: string;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"}/api/auth/callback`
    );
    this.tokenDocId = "google_calendar";
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const tokens = await this.loadTokens();
      return !!tokens?.refresh_token;
    } catch {
      return false;
    }
  }

  async loadTokens(): Promise<StoredTokens | null> {
    if (!db) return null;
    try {
      const tokenRef = doc(db, "oauth_tokens", this.tokenDocId);
      const tokenSnap = await getDoc(tokenRef);
      if (!tokenSnap.exists()) return null;
      return tokenSnap.data() as StoredTokens;
    } catch {
      return null;
    }
  }

  async saveTokens(tokens: any): Promise<void> {
    if (!db) throw new Error("Firestore not initialized");
    const tokenData: StoredTokens = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      scope: tokens.scope,
      token_type: tokens.token_type,
      expiry_date: tokens.expiry_date,
      updated_at: new Date().toISOString(),
    };
    const tokenRef = doc(db, "oauth_tokens", this.tokenDocId);
    await setDoc(tokenRef, tokenData, { merge: true });
  }

  async initializeClient(): Promise<boolean> {
    try {
      const tokens = await this.loadTokens();
      if (!tokens) {
        console.log("[OAUTH] No stored tokens found");
        return false;
      }

      this.oauth2Client.setCredentials(tokens);

      // Check if token is expired and refresh if needed
      if (tokens.expiry_date && tokens.expiry_date <= Date.now()) {
        console.log("[OAUTH] Token expired, refreshing...");
        try {
          const { credentials } = await this.oauth2Client.refreshAccessToken();
          await this.saveTokens(credentials);
          console.log("[OAUTH] Token refreshed successfully");
        } catch (refreshError) {
          console.error("[OAUTH] Token refresh failed:", refreshError);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("[OAUTH] Failed to initialize client:", error);
      return false;
    }
  }

  async createCalendarEvent(eventData: {
    summary: string;
    description: string;
    start: { dateTime: string; timeZone: string };
    end: { dateTime: string; timeZone: string };
    attendees?: Array<{ email: string }>;
    meetingDateTime?: string;
  }): Promise<{
    success: boolean;
    event?: any;
    meetLink?: string;
    error?: string;
  }> {
    try {
      const initialized = await this.initializeClient();
      if (!initialized) {
        return {
          success: false,
          error:
            "OAuth2 client not authenticated. Please complete authorization first.",
        };
      }

      const calendar = google.calendar({
        version: "v3",
        auth: this.oauth2Client,
      });

      const event = {
        summary: eventData.summary,
        description: eventData.description,
        start: eventData.start,
        end: eventData.end,
        attendees: eventData.attendees || [],
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}-${Math.random()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: { useDefault: true },
      };

      console.log("[OAUTH] Creating calendar event:", {
        summary: event.summary,
        start: event.start,
        attendees: event.attendees?.length || 0,
      });

      const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: "all", // Send email invites to all attendees
      });

      const createdEvent = response.data;
      const meetLink = createdEvent.hangoutLink || createdEvent.htmlLink;

      console.log("[OAUTH] Calendar event created successfully:", {
        id: createdEvent.id,
        meetLink: meetLink ? "present" : "missing",
      });

      return {
        success: true,
        event: createdEvent,
        meetLink,
      };
    } catch (error: any) {
      console.error("[OAUTH] Calendar event creation failed:", error);

      // Check if it's an authentication error
      if (error.code === 401 || error.message?.includes("invalid_grant")) {
        return {
          success: false,
          error: "Authentication expired. Please re-authorize the application.",
        };
      }

      return {
        success: false,
        error: error.message || "Failed to create calendar event",
      };
    }
  }

  getAuthorizationUrl(): string {
    return `/api/auth/authorize`;
  }
}

// Export a singleton instance
export const oauthCalendar = new OAuth2CalendarClient();
