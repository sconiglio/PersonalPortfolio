/**
 * Analytics Hooks
 *
 * Custom hooks for analytics functionality.
 * Provides data management, caching, and analytics operations.
 */

export { useAnalyticsData } from "./useAnalyticsData";

// Re-export types for external use
export type {
  ChatSession,
  ChatMessage,
  ButtonClick,
  TourInteraction,
  DeviceAnalytic,
  VisitorLocation,
  UseAnalyticsDataReturn,
} from "./useAnalyticsData";
