"use client";

import { useMemo, useCallback } from "react";
import {
  FiUsers,
  FiMousePointer,
  FiMessageCircle,
  FiGlobe,
  FiSmartphone,
  FiTarget,
  FiTrendingUp,
  FiActivity,
  FiDownload,
  FiClock,
  FiHelpCircle,
} from "react-icons/fi";
import { useAnalytics } from "../AnalyticsProvider";
import { SharedTooltip } from "../SharedTooltip";

interface OverviewSectionProps {
  timeRange: "1d" | "7d" | "30d" | "all";
}

export default function OverviewSection({ timeRange }: OverviewSectionProps) {
  const analytics = useAnalytics();

  console.log(`DEBUG OverviewSection: Raw data counts:`, {
    sessions: analytics.chatSessions.length,
    buttonClicks: analytics.buttonClicks.length,
    tourInteractions: analytics.tourInteractions.length,
    timeRange,
    loading: analytics.loading,
    lastUpdated: analytics.lastUpdated,
  });

  // Filter data based on time range
  const filterDataByTimeRange = useCallback(
    (data: any[], timestampField: string = "timestamp") => {
      if (timeRange === "all") return data;

      const now = new Date();
      let cutoffDate: Date;

      switch (timeRange) {
        case "1d":
          cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7d":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          return data;
      }

      console.log(
        `DEBUG OverviewSection: Filtering ${data.length} items for ${timeRange}, cutoff: ${cutoffDate.toISOString()}`
      );

      // Sample a few items to check their timestamps
      if (data.length > 0) {
        console.log(
          `DEBUG OverviewSection: Sample items (${timestampField}):`,
          data.slice(0, 3).map((item) => ({
            id: item.id,
            [timestampField]: item[timestampField],
            timestampType: typeof item[timestampField],
            isDate: item[timestampField] instanceof Date,
            converted:
              item[timestampField] instanceof Date
                ? item[timestampField].toISOString()
                : new Date(item[timestampField]).toISOString(),
          }))
        );
      }

      const filtered = data.filter((item) => {
        const itemDate =
          item[timestampField] instanceof Date
            ? item[timestampField]
            : new Date(item[timestampField]);
        const isWithinRange = itemDate >= cutoffDate;

        return isWithinRange;
      });

      console.log(
        `DEBUG OverviewSection: Filtered ${data.length} → ${filtered.length} items for ${timeRange}`
      );
      return filtered;
    },
    [timeRange]
  );

  // Apply filters
  const filteredSessions = useMemo(
    () => filterDataByTimeRange(analytics.chatSessions, "startTime"),
    [analytics.chatSessions, filterDataByTimeRange]
  );

  const filteredButtonClicks = useMemo(
    () => filterDataByTimeRange(analytics.buttonClicks),
    [analytics.buttonClicks, filterDataByTimeRange]
  );

  const filteredTourInteractions = useMemo(
    () => filterDataByTimeRange(analytics.tourInteractions),
    [analytics.tourInteractions, filterDataByTimeRange]
  );

  // Calculate filtered metrics
  const totalSessions = filteredSessions.length;
  const totalButtonClicks = filteredButtonClicks.length;
  const totalTourInteractions = filteredTourInteractions.length;
  const qualitySessions = filteredSessions.filter(
    (s) => s.messageCount >= 3
  ).length;

  console.log(`DEBUG: Overview metrics for ${timeRange}:`, {
    totalSessions,
    totalButtonClicks,
    totalTourInteractions,
    qualitySessions,
    rawSessionsCount: analytics.chatSessions.length,
  });

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalSessions = filteredSessions.length;
    const totalClicks = totalButtonClicks;
    const totalTours = totalTourInteractions;
    const uniqueVisitors = new Set(filteredSessions.map((s) => s.sessionId))
      .size;

    // Resume download clicks
    const resumeDownloads = filteredButtonClicks.filter(
      (c) =>
        c.buttonType === "download_resume" ||
        c.buttonText?.toLowerCase().includes("resume") ||
        c.buttonText?.toLowerCase().includes("cv")
    ).length;

    // Chat button clicks
    const chatClicks = filteredButtonClicks.filter(
      (c) =>
        c.buttonType === "chatbot_open" ||
        c.buttonText?.toLowerCase().includes("chat")
    ).length;

    // Device breakdown
    const deviceBreakdown = filteredSessions.reduce(
      (acc, session) => {
        acc[session.deviceType] = (acc[session.deviceType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Location breakdown
    const locationBreakdown = filteredSessions.reduce(
      (acc, session) => {
        const key = `${session.location.city}, ${session.location.country}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Engagement metrics - fix totalDuration calculation
    const avgSessionDuration =
      totalSessions > 0
        ? filteredSessions.reduce((sum, s) => {
            // Ensure we have valid start and end times
            const startTime =
              s.startTime instanceof Date ? s.startTime : new Date(s.startTime);
            const endTime =
              s.endTime instanceof Date ? s.endTime : new Date(s.endTime);

            // Calculate duration in milliseconds, with fallback to stored totalDuration
            const calculatedDuration = endTime.getTime() - startTime.getTime();
            const duration = s.totalDuration || calculatedDuration;

            // Only include reasonable durations (between 10 seconds and 24 hours)
            const minDuration = 1 * 1000; // 1 second - include short sessions to avoid 0 avg
            const maxDuration = 24 * 60 * 60 * 1000; // 24 hours

            if (duration >= minDuration && duration <= maxDuration) {
              return sum + duration;
            }

            return sum;
          }, 0) /
          totalSessions /
          60000 // Convert to minutes
        : 0;

    const highEngagementSessions = filteredSessions.filter(
      (s) => s.engagementScore > 7 || s.messageCount > 5
    ).length;

    return {
      totalSessions,
      totalClicks,
      totalTours,
      uniqueVisitors,
      resumeDownloads,
      chatClicks,
      deviceBreakdown,
      locationBreakdown,
      avgSessionDuration,
      highEngagementSessions,
    };
  }, [filteredSessions, totalButtonClicks, totalTourInteractions]);

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <div className={`bg-gradient-to-br ${color} p-3 rounded-lg`}>
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-white/80 text-xs font-medium">{title}</p>
          <p className="text-lg font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-white/70 text-xs mt-0.5">{subtitle}</p>
          )}
        </div>
        <Icon className="h-5 w-5 text-white/80" />
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto space-y-3">
      {/* Header - Compact */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Analytics Overview</h2>
          <p className="text-gray-400 text-xs">
            {timeRange === "all" ? "All time" : `Last ${timeRange}`} •{" "}
            {totalSessions + totalButtonClicks + totalTourInteractions} events
          </p>
        </div>
      </div>

      {/* Key Metrics Grid - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <SharedTooltip tooltip="SESSIONS: Total chat conversations started||Tracks:|• New visitor sessions|• Chatbot conversations|• User engagement starts|• Unique interactions with portfolio">
          <MetricCard
            title="Sessions"
            value={totalSessions}
            icon={FiUsers}
            color="from-blue-600 to-blue-700"
            subtitle={`${new Set(filteredSessions.map((s) => s.sessionId)).size} unique`}
          />
        </SharedTooltip>

        <SharedTooltip tooltip="CLICKS: All button and interaction clicks||Includes:|• Navigation clicks|• Download buttons|• Contact buttons|• Project links|• Social media links">
          <MetricCard
            title="Clicks"
            value={totalButtonClicks}
            icon={FiMousePointer}
            color="from-green-600 to-green-700"
            subtitle="All interactions"
          />
        </SharedTooltip>

        <SharedTooltip tooltip="TOURS: Product tour engagement metrics||Measures:|• Tour invitations accepted|• Tour steps completed|• Tour abandonment|• User onboarding success">
          <MetricCard
            title="Tours"
            value={totalTourInteractions}
            icon={FiTarget}
            color="from-orange-600 to-orange-700"
            subtitle="Product tours"
          />
        </SharedTooltip>

        <SharedTooltip tooltip="HIGH ENGAGEMENT: Quality user sessions||Criteria:|• 3+ chat messages|• 5+ interactions|• Engagement score > 7|• Deep portfolio exploration">
          <MetricCard
            title="High Engage"
            value={metrics.highEngagementSessions}
            icon={FiTrendingUp}
            color="from-purple-600 to-purple-700"
            subtitle="Quality sessions"
          />
        </SharedTooltip>
      </div>

      {/* Empty State for New System */}
      {totalSessions === 0 && (
        <div className="flex items-center justify-center h-32">
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <FiActivity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold mb-2">
              Clean Slate - New Analytics System
            </h3>
            <p className="text-gray-400 text-xs">
              Data will appear here as users interact with your portfolio.
            </p>
          </div>
        </div>
      )}

      {/* Action Metrics - Compact */}
      <div className="grid grid-cols-3 gap-2">
        <SharedTooltip tooltip="RESUME DOWNLOADS: Career interest indicator||Tracks:|• PDF resume downloads|• CV button clicks|• Recruiter engagement|• Job opportunity signals">
          <MetricCard
            title="Resume Downloads"
            value={metrics.resumeDownloads}
            icon={FiDownload}
            color="from-emerald-600 to-emerald-700"
            subtitle="Career interest"
          />
        </SharedTooltip>

        <SharedTooltip tooltip="CHAT CLICKS: Chatbot engagement||Measures:|• Chatbot open clicks|• AI assistant usage|• Interactive conversations|• User help-seeking behavior">
          <MetricCard
            title="Chat Clicks"
            value={metrics.chatClicks}
            icon={FiMessageCircle}
            color="from-violet-600 to-violet-700"
            subtitle="Bot engagement"
          />
        </SharedTooltip>

        <SharedTooltip tooltip="AVERAGE TIME: Session duration||Calculates:|• Time spent on portfolio|• User engagement depth|• Content consumption time|• Interest level indicator">
          <MetricCard
            title="Avg Time"
            value={`${Math.round(metrics.avgSessionDuration)}m`}
            icon={FiClock}
            color="from-teal-600 to-teal-700"
            subtitle="Session depth"
          />
        </SharedTooltip>
      </div>

      {/* Breakdowns - Side by side, compact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Device Breakdown */}
        <SharedTooltip tooltip="DEVICE BREAKDOWN: Visitor device types||Shows:|• Desktop vs Mobile usage|• Device preferences|• User access patterns|• Platform optimization insights">
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <FiSmartphone className="h-4 w-4 text-indigo-400" />
              Devices
              <FiHelpCircle className="h-3 w-3 text-gray-400 opacity-50" />
            </h3>
            <div className="space-y-1">
              {Object.entries(metrics.deviceBreakdown)
                .slice(0, 3)
                .map(([device, count]) => (
                  <div
                    key={device}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="truncate">{device}</span>
                    <div className="flex items-center gap-1">
                      <div className="bg-gray-600 rounded-full h-1 w-8 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{
                            width: `${((count as number) / metrics.totalSessions) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-bold text-indigo-400 min-w-[1rem]">
                        {count as number}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </SharedTooltip>

        {/* Top Locations */}
        <SharedTooltip tooltip="TOP LOCATIONS: Geographic visitor distribution||Displays:|• Most active cities/countries|• Global reach metrics|• Geographic engagement patterns|• Market interest indicators">
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <FiGlobe className="h-4 w-4 text-teal-400" />
              Locations
              <FiHelpCircle className="h-3 w-3 text-gray-400 opacity-50" />
            </h3>
            <div className="space-y-1">
              {Object.entries(metrics.locationBreakdown)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 3)
                .map(([location, count]) => (
                  <div
                    key={location}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="truncate">{location.split(",")[0]}</span>
                    <div className="flex items-center gap-1">
                      <div className="bg-gray-600 rounded-full h-1 w-8 overflow-hidden">
                        <div
                          className="bg-teal-500 h-full rounded-full"
                          style={{
                            width: `${((count as number) / metrics.totalSessions) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-bold text-teal-400 min-w-[1rem]">
                        {count as number}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </SharedTooltip>

        {/* Quick Insights */}
        <SharedTooltip tooltip="CONVERSION PERCENTAGES: Action success rates||Calculates:|• Resume download conversion|• Chat engagement rate|• High engagement percentage|• Portfolio effectiveness metrics">
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <FiActivity className="h-4 w-4 text-blue-400" />
              Conversion %
              <FiHelpCircle className="h-3 w-3 text-gray-400 opacity-50" />
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span>Resume</span>
                <span className="font-bold text-blue-400">
                  {(
                    (metrics.resumeDownloads / metrics.totalSessions) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Chat</span>
                <span className="font-bold text-green-400">
                  {((metrics.chatClicks / metrics.totalSessions) * 100).toFixed(
                    1
                  )}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>High Eng</span>
                <span className="font-bold text-purple-400">
                  {(
                    (metrics.highEngagementSessions / metrics.totalSessions) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </SharedTooltip>
      </div>
    </div>
  );
}
