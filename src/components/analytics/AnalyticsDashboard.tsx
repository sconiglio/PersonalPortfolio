"use client";

import { useState, useEffect } from "react";
import {
  FiRefreshCw,
  FiBarChart,
  FiUsers,
  FiMousePointer,
  FiSmartphone,
  FiGlobe,
  FiMessageCircle,
  FiDownload,
  FiActivity,
  FiTarget,
  FiDatabase,
} from "react-icons/fi";
import { useAnalytics } from "./AnalyticsProvider";

// Import modular components
import OverviewSection from "./sections/OverviewSection";
import ChatSessionsSection from "./sections/ChatSessionsSection";
import ButtonClicksSection from "./sections/ButtonClicksSection";
import TourAnalyticsSection from "./sections/TourAnalyticsSection";
import GeoLocationSection from "./sections/GeoLocationSection";
import DeviceAnalyticsSection from "./sections/DeviceAnalyticsSection";
import GraphSection from "./sections/GraphSection";

// Enhanced scrolling styles
const scrollStyles = `
  .analytics-content {
    scrollbar-width: thin;
    scrollbar-color: #4a5568 #2d3748;
  }
  
  .analytics-content::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .analytics-content::-webkit-scrollbar-track {
    background: #2d3748;
    border-radius: 4px;
  }
  
  .analytics-content::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 4px;
  }
  
  .analytics-content::-webkit-scrollbar-thumb:hover {
    background: #718096;
  }
`;

export default function AnalyticsDashboard() {
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState<"1d" | "7d" | "30d" | "all">("7d");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showCacheStats, setShowCacheStats] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: FiBarChart, color: "blue" },
    {
      id: "sessions",
      label: "Chat Sessions",
      icon: FiMessageCircle,
      color: "purple",
    },
    {
      id: "buttons",
      label: "Button Clicks",
      icon: FiMousePointer,
      color: "green",
    },
    { id: "tours", label: "Tour Analytics", icon: FiTarget, color: "orange" },
    { id: "geo", label: "Geo Location", icon: FiGlobe, color: "teal" },
    {
      id: "devices",
      label: "Device Analytics",
      icon: FiSmartphone,
      color: "indigo",
    },
    { id: "graph", label: "Graph", icon: FiActivity, color: "purple" },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive
        ? "bg-blue-600 text-white"
        : "text-blue-400 hover:bg-blue-900/30",
      purple: isActive
        ? "bg-purple-600 text-white"
        : "text-purple-400 hover:bg-purple-900/30",
      green: isActive
        ? "bg-green-600 text-white"
        : "text-green-400 hover:bg-green-900/30",
      orange: isActive
        ? "bg-orange-600 text-white"
        : "text-orange-400 hover:bg-orange-900/30",
      teal: isActive
        ? "bg-teal-600 text-white"
        : "text-teal-400 hover:bg-teal-900/30",
      indigo: isActive
        ? "bg-indigo-600 text-white"
        : "text-indigo-400 hover:bg-indigo-900/30",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Add enhanced scrolling styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = scrollStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Load data when component mounts (no auth needed)
  useEffect(() => {
    analytics.fetchAllData();
  }, []);

  console.log("DEBUG: Raw buttonClicks:", analytics.buttonClicks);
  console.log("DEBUG: Raw tourInteractions:", analytics.tourInteractions);
  console.log("DEBUG: Analytics loading state:", analytics.loading);
  console.log("DEBUG: Last updated:", analytics.lastUpdated);
  console.log("DEBUG: Current timeRange:", timeRange);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between gap-4">
          {/* Stats Summary */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FiUsers className="h-4 w-4 text-blue-400" />
              <span className="text-gray-400">Sessions:</span>
              <span className="font-bold text-blue-400">
                {analytics.totalSessions}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiMousePointer className="h-4 w-4 text-green-400" />
              <span className="text-gray-400">Clicks:</span>
              <span className="font-bold text-green-400">
                {analytics.totalButtonClicks}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiTarget className="h-4 w-4 text-orange-400" />
              <span className="text-gray-400">Tours:</span>
              <span className="font-bold text-orange-400">
                {analytics.totalTourInteractions}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm"
              >
                <FiDownload className="h-4 w-4" />
                Export
              </button>

              {showExportMenu && (
                <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 min-w-48">
                  <button
                    onClick={async () => {
                      // Get password from parent page session storage
                      const password = sessionStorage.getItem(
                        "analytics_v2_password"
                      );
                      if (!password) {
                        alert(
                          "Authentication error. Please refresh the page and log in again."
                        );
                        return;
                      }
                      // Store in the expected session storage key for the export function
                      sessionStorage.setItem("analytics_password", password);

                      console.log(
                        "🚀 Smart Export: Fetching latest data then exporting..."
                      );
                      await analytics.exportIncrementalAnalytics();
                      setShowExportMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FiRefreshCw className="h-4 w-4 text-blue-400" />
                    Smart Update & Export
                  </button>
                </div>
              )}
            </div>

            {/* Debug Button - Temporary */}
            <button
              onClick={() => {
                console.log("=== ANALYTICS DEBUG REPORT ===");
                console.log("Loading state:", analytics.loading);
                console.log("Last updated:", analytics.lastUpdated);
                console.log("Total data counts:", {
                  sessions: analytics.chatSessions.length,
                  buttonClicks: analytics.buttonClicks.length,
                  tourInteractions: analytics.tourInteractions.length,
                  deviceAnalytics: analytics.deviceAnalytics.length,
                  visitorLocations: analytics.visitorLocations.length,
                });
                console.log(
                  "Raw buttonClicks sample:",
                  analytics.buttonClicks.slice(0, 5)
                );
                console.log(
                  "Raw tourInteractions sample:",
                  analytics.tourInteractions.slice(0, 5)
                );
                console.log(
                  "Raw deviceAnalytics sample:",
                  analytics.deviceAnalytics.slice(0, 5)
                );
                console.log("Cache stats:", analytics.getCacheStats());

                // Show current status
                const cacheStats = analytics.getCacheStats();
                const deviceCacheInfo = cacheStats.deviceAnalytics || {
                  count: 0,
                  isValid: false,
                };
                alert(`🔍 Device Analytics Status:
                
📊 Current Count: ${analytics.deviceAnalytics.length} devices
🗄️ Cache Count: ${deviceCacheInfo.count} cached
⏰ Cache Status: ${deviceCacheInfo.isValid ? "Valid" : "Stale"}
🕒 Last Updated: ${deviceCacheInfo.lastUpdated || "Never"}

💡 If count is 0, device tracking is working but no visitors have hit the site since the fix was deployed.
Visit the main site to generate device analytics data!`);

                // Smart incremental refresh
                console.log(
                  "🔄 Debug: Triggering smart incremental refresh..."
                );
                analytics.forceRefresh();
              }}
              className="flex items-center gap-2 px-3 py-2 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors text-sm"
            >
              🐛 Debug
            </button>

            {/* Cache Stats Toggle */}
            <button
              onClick={() => setShowCacheStats(!showCacheStats)}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors text-sm"
            >
              <FiDatabase className="h-4 w-4" />
              Cache
            </button>

            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Cache Stats Panel */}
        {showCacheStats && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                <FiDatabase className="h-5 w-5" />
                Cache Statistics
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => analytics.forceRefresh()}
                  className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded transition-colors"
                >
                  Smart Refresh
                </button>
                <button
                  onClick={() => analytics.clearCache()}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                >
                  Clear Cache
                </button>
              </div>
            </div>

            <CacheStatsDisplay stats={analytics.getCacheStats()} />

            {/* Export Stats */}
            <div className="mt-4 pt-4 border-t border-gray-600">
              <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                <FiDownload className="h-4 w-4" />
                Export Status
              </h4>
              <ExportStatsDisplay stats={analytics.getExportStats()} />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-r border-gray-700 last:border-r-0 ${getColorClasses(
                tab.color,
                activeTab === tab.id
              )}`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Loading State */}
        {analytics.loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="text-lg">Loading analytics data...</span>
            </div>
          </div>
        )}

        {/* Content Sections */}
        {!analytics.loading && (
          <>
            {activeTab === "overview" && (
              <OverviewSection timeRange={timeRange} />
            )}
            {activeTab === "sessions" && (
              <ChatSessionsSection timeRange={timeRange} />
            )}
            {activeTab === "buttons" && (
              <ButtonClicksSection timeRange={timeRange} />
            )}
            {activeTab === "tours" && (
              <TourAnalyticsSection timeRange={timeRange} />
            )}
            {activeTab === "geo" && (
              <GeoLocationSection timeRange={timeRange} />
            )}
            {activeTab === "devices" && (
              <DeviceAnalyticsSection timeRange={timeRange} />
            )}
            {activeTab === "graph" && <GraphSection timeRange={timeRange} />}
          </>
        )}

        {/* Empty State */}
        {!analytics.loading && analytics.totalSessions === 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <FiBarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Analytics Data</h3>
              <p className="text-gray-400 mb-6">
                Analytics data will appear here once users interact with your
                portfolio.
              </p>
              <button
                onClick={() => analytics.refreshData()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export Stats Display Component
function ExportStatsDisplay({ stats }: { stats: any }) {
  if (!stats.hasExport) {
    return (
      <div className="text-gray-400 text-sm">
        No exports created yet. Use "Full Export" to create your first analytics
        file.
      </div>
    );
  }

  const daysSince = stats.daysSinceExport;
  const statusColor =
    daysSince <= 7
      ? "text-green-400"
      : daysSince <= 30
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="space-y-2">
      <div className="bg-gray-800 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Last Export</span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              daysSince <= 7
                ? "bg-green-600 text-green-100"
                : daysSince <= 30
                  ? "bg-yellow-600 text-yellow-100"
                  : "bg-red-600 text-red-100"
            }`}
          >
            {daysSince === 0 ? "Today" : `${daysSince} days ago`}
          </span>
        </div>
        <div className="text-lg font-bold text-blue-400 mb-1">
          {stats.totalRecords} records
        </div>
        <div className="text-xs text-gray-400">
          {new Date(stats.lastExportDate).toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 mt-1">File: {stats.filename}</div>
      </div>

      <div className="text-xs text-gray-400 p-2 bg-gray-800 rounded">
        💡 <strong>Cross-device access:</strong> Upload your export file to
        `/public/analytics-latest.json` for free access across all devices.
        <br />
        📱 <strong>Mobile tip:</strong> Use "Load from File" to access exports
        on different devices.
      </div>
    </div>
  );
}

// Cache Stats Display Component
function CacheStatsDisplay({ stats }: { stats: any }) {
  if (stats.status === "empty") {
    return <div className="text-gray-400 text-sm">No cache data available</div>;
  }

  const collections = Object.keys(stats).filter((key) => key !== "version");

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-400">
        Cache Version: {stats.version}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {collections.map((collection) => {
          const data = stats[collection];
          return (
            <div key={collection} className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white capitalize">
                  {collection.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    data.isValid
                      ? "bg-green-600 text-green-100"
                      : "bg-red-600 text-red-100"
                  }`}
                >
                  {data.isValid ? "Valid" : "Stale"}
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {data.count}
              </div>
              <div className="text-xs text-gray-400">
                Updated: {data.lastUpdated}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 mt-3 p-2 bg-gray-800 rounded">
        💡 Cache stores analytics data locally to improve performance and reduce
        Firebase reads. Force refresh fetches latest data. Clear cache removes
        all stored data.
        <br />
        📝 <strong>Note:</strong> Collections show "Valid" if data has been
        cached, "Stale" if no data exists or cache is empty.
      </div>
    </div>
  );
}
