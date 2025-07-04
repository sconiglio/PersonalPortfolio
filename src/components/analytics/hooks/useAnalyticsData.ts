"use client";

import { useState, useCallback } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { analyticsCacheManager } from "../../../lib/analytics-cache";
import { ANALYTICS_COLLECTIONS } from "../AnalyticsProvider";

/**
 * Analytics data types
 */
export interface ChatSession {
  id: string;
  sessionId: string;
  messages: ChatMessage[];
  startTime: Date;
  endTime: Date;
  messageCount: number;
  totalDuration: number;
  userAgent: string;
  deviceType: "Mobile" | "Desktop" | "Tablet" | "Unknown";
  location: {
    country: string;
    region: string;
    city: string;
    ip?: string;
  };
  engagementScore: number;
  isRecruiterSession: boolean;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  messageLength: number;
  hasFiles: boolean;
  fileTypes?: string[];
}

export interface ButtonClick {
  id: string;
  buttonType: string;
  buttonText: string;
  page: string;
  sessionId: string;
  timestamp: Date;
  location: {
    country: string;
    region: string;
    city: string;
  };
  userAgent: string;
}

export interface TourInteraction {
  id: string;
  tourStep: string;
  action: "viewed" | "clicked" | "skipped" | "completed";
  sessionId: string;
  timestamp: Date;
  timeOnStep: number;
  location: {
    country: string;
    region: string;
    city: string;
  };
}

export interface DeviceAnalytic {
  id: string;
  sessionId: string;
  deviceType: string;
  browser: string;
  os: string;
  screenSize: string;
  userAgent: string;
  timestamp: Date;
}

export interface VisitorLocation {
  id: string;
  sessionId: string;
  userAgent: string;
  referrer?: string;
  pathname: string;
  timestamp: Date;
  location: {
    country: string;
    region: string;
    city: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
  ip: string;
  fresh: boolean;
}

/**
 * Analytics data hook return type
 */
export interface UseAnalyticsDataReturn {
  // Data
  chatSessions: ChatSession[];
  buttonClicks: ButtonClick[];
  tourInteractions: TourInteraction[];
  deviceAnalytics: DeviceAnalytic[];
  visitorLocations: VisitorLocation[];

  // Loading states
  loading: boolean;
  lastUpdated: Date | null;

  // Statistics
  totalSessions: number;
  totalButtonClicks: number;
  totalTourInteractions: number;
  uniqueVisitors: number;

  // Functions
  fetchAllData: () => Promise<void>;
  refreshData: () => Promise<void>;
  clearCache: () => void;
  getCacheStats: () => any;
  forceRefresh: () => void;
  fetchIncrementalDataOnly: () => Promise<void>;
}

/**
 * Use Analytics Data Hook
 *
 * Custom hook for managing analytics data fetching and caching.
 * Provides data, loading states, statistics, and data management functions.
 *
 * @param db - Firebase database instance
 * @returns UseAnalyticsDataReturn
 */
export function useAnalyticsData(db: any): UseAnalyticsDataReturn {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [buttonClicks, setButtonClicks] = useState<ButtonClick[]>([]);
  const [tourInteractions, setTourInteractions] = useState<TourInteraction[]>(
    []
  );
  const [deviceAnalytics, setDeviceAnalytics] = useState<DeviceAnalytic[]>([]);
  const [visitorLocations, setVisitorLocations] = useState<VisitorLocation[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /**
   * Fetch new data only (incremental)
   */
  const fetchNewDataOnly = useCallback(
    async (
      collectionName: string,
      cacheKey:
        | "sessions"
        | "messages"
        | "buttonClicks"
        | "tourInteractions"
        | "deviceAnalytics"
        | "visitorLocations",
      timestampField: string = "timestamp"
    ) => {
      try {
        const lastDocId = analyticsCacheManager.getLastDocId(cacheKey);
        const cachedData = analyticsCacheManager.getCachedData(cacheKey);
        const lastUpdated = cachedData[0]?.timestamp;

        let q = query(
          collection(db, collectionName),
          orderBy(timestampField, "desc"),
          limit(100)
        );

        if (lastUpdated) {
          q = query(
            collection(db, collectionName),
            where(timestampField, ">", new Date(lastUpdated)),
            orderBy(timestampField, "desc"),
            limit(100)
          );
        }

        const snapshot = await getDocs(q);
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));

        return newData;
      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
        return [];
      }
    },
    [db]
  );

  /**
   * Fetch all data from a collection
   */
  const fetchCollection = useCallback(
    async (
      collectionName: string,
      cacheKey: keyof Omit<any, "version">,
      timestampField: string = "timestamp"
    ) => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy(timestampField, "desc"),
          limit(100)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));

        return data;
      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
        return [];
      }
    },
    [db]
  );

  /**
   * Fetch all analytics data
   */
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [sessionsData, clicksData, tourData, deviceData, locationData] =
        await Promise.all([
          fetchCollection(ANALYTICS_COLLECTIONS.SESSIONS_V2, "sessions"),
          fetchCollection(
            ANALYTICS_COLLECTIONS.BUTTON_CLICKS_V2,
            "buttonClicks"
          ),
          fetchCollection(
            ANALYTICS_COLLECTIONS.TOUR_INTERACTIONS_V2,
            "tourInteractions"
          ),
          fetchCollection(
            ANALYTICS_COLLECTIONS.DEVICE_ANALYTICS_V2,
            "deviceAnalytics"
          ),
          fetchCollection(
            ANALYTICS_COLLECTIONS.VISITOR_LOCATIONS_V2,
            "visitorLocations"
          ),
        ]);

      setChatSessions(sessionsData as unknown as ChatSession[]);
      setButtonClicks(clicksData as unknown as ButtonClick[]);
      setTourInteractions(tourData as unknown as TourInteraction[]);
      setDeviceAnalytics(deviceData as unknown as DeviceAnalytic[]);
      setVisitorLocations(locationData as unknown as VisitorLocation[]);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchCollection]);

  /**
   * Refresh data (force reload)
   */
  const refreshData = useCallback(async () => {
    analyticsCacheManager.clearCache();
    await fetchAllData();
  }, [fetchAllData]);

  /**
   * Clear cache
   */
  const clearCache = useCallback(() => {
    analyticsCacheManager.clearCache();
  }, []);

  /**
   * Get cache statistics
   */
  const getCacheStats = useCallback(() => {
    return analyticsCacheManager.getCacheStats();
  }, []);

  /**
   * Force refresh
   */
  const forceRefresh = useCallback(() => {
    analyticsCacheManager.clearCache();
    fetchAllData();
  }, [fetchAllData]);

  /**
   * Fetch incremental data only
   */
  const fetchIncrementalDataOnly = useCallback(async () => {
    setLoading(true);
    try {
      const [sessionsData, clicksData, tourData, deviceData, locationData] =
        await Promise.all([
          fetchNewDataOnly(ANALYTICS_COLLECTIONS.SESSIONS_V2, "sessions"),
          fetchNewDataOnly(
            ANALYTICS_COLLECTIONS.BUTTON_CLICKS_V2,
            "buttonClicks"
          ),
          fetchNewDataOnly(
            ANALYTICS_COLLECTIONS.TOUR_INTERACTIONS_V2,
            "tourInteractions"
          ),
          fetchNewDataOnly(
            ANALYTICS_COLLECTIONS.DEVICE_ANALYTICS_V2,
            "deviceAnalytics"
          ),
          fetchNewDataOnly(
            ANALYTICS_COLLECTIONS.VISITOR_LOCATIONS_V2,
            "visitorLocations"
          ),
        ]);

      setChatSessions((prev) => [
        ...(sessionsData as unknown as ChatSession[]),
        ...prev,
      ]);
      setButtonClicks((prev) => [
        ...(clicksData as unknown as ButtonClick[]),
        ...prev,
      ]);
      setTourInteractions((prev) => [
        ...(tourData as unknown as TourInteraction[]),
        ...prev,
      ]);
      setDeviceAnalytics((prev) => [
        ...(deviceData as unknown as DeviceAnalytic[]),
        ...prev,
      ]);
      setVisitorLocations((prev) => [
        ...(locationData as unknown as VisitorLocation[]),
        ...prev,
      ]);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching incremental data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchNewDataOnly]);

  // Calculate statistics
  const totalSessions = chatSessions.length;
  const totalButtonClicks = buttonClicks.length;
  const totalTourInteractions = tourInteractions.length;
  const uniqueVisitors = new Set(visitorLocations.map((v) => v.sessionId)).size;

  return {
    chatSessions,
    buttonClicks,
    tourInteractions,
    deviceAnalytics,
    visitorLocations,
    loading,
    lastUpdated,
    totalSessions,
    totalButtonClicks,
    totalTourInteractions,
    uniqueVisitors,
    fetchAllData,
    refreshData,
    clearCache,
    getCacheStats,
    forceRefresh,
    fetchIncrementalDataOnly,
  };
}
