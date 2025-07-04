"use client";

import { useMemo } from "react";
import {
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiTrendingUp,
} from "react-icons/fi";
import { useAnalytics } from "../AnalyticsProvider";

interface DeviceAnalyticsSectionProps {
  timeRange: "1d" | "7d" | "30d" | "all";
}

export default function DeviceAnalyticsSection({
  timeRange,
}: DeviceAnalyticsSectionProps) {
  const analytics = useAnalytics();

  const deviceData = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "1d":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0);
    }

    // Use the dedicated device analytics data instead of chat sessions
    const filteredDevices = analytics.deviceAnalytics.filter((device) => {
      const deviceDate =
        device.timestamp instanceof Date
          ? device.timestamp
          : new Date(device.timestamp);
      return deviceDate >= startDate;
    });

    console.log(
      `DEBUG DeviceAnalytics: Raw device data count: ${analytics.deviceAnalytics.length}`
    );
    console.log(
      `DEBUG DeviceAnalytics: Filtered device data count: ${filteredDevices.length}`
    );
    console.log(
      `DEBUG DeviceAnalytics: Time range: ${timeRange}, Start date: ${startDate.toISOString()}`
    );
    console.log(
      `DEBUG DeviceAnalytics: Sample device data:`,
      filteredDevices.slice(0, 3)
    );

    // Device type breakdown from dedicated device analytics
    const deviceTypes = filteredDevices.reduce(
      (acc, device) => {
        const deviceType = device.deviceType || "Unknown";
        acc[deviceType] = (acc[deviceType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Browser breakdown from dedicated device analytics
    const browsers = filteredDevices.reduce(
      (acc, device) => {
        const browser = device.browser || "Unknown";
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Operating system breakdown
    const operatingSystems = filteredDevices.reduce(
      (acc, device) => {
        const os = device.os || "Unknown";
        acc[os] = (acc[os] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Screen size breakdown
    const screenSizes = filteredDevices.reduce(
      (acc, device) => {
        const screenSize = device.screenSize || "Unknown";
        acc[screenSize] = (acc[screenSize] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const totalDevices = filteredDevices.length;

    return {
      deviceTypes,
      browsers,
      operatingSystems,
      screenSizes,
      totalDevices,
      totalSessions: totalDevices, // Keep for backwards compatibility
    };
  }, [analytics.deviceAnalytics, timeRange]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case "mobile":
        return FiSmartphone;
      case "tablet":
        return FiTablet;
      case "desktop":
      default:
        return FiMonitor;
    }
  };

  return (
    <div className="h-full overflow-y-auto space-y-3">
      {/* Header - Compact */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Device Analytics</h2>
          <p className="text-gray-400 text-xs">
            Device and browser usage • {deviceData.totalDevices} devices tracked
          </p>
        </div>
      </div>

      {/* Key Metric */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-white/80 text-xs font-medium">Total Devices</p>
            <p className="text-lg font-bold text-white">
              {deviceData.totalDevices}
            </p>
          </div>
          <FiSmartphone className="h-5 w-5 text-white/80" />
        </div>
      </div>

      {/* Empty State */}
      {deviceData.totalDevices === 0 && (
        <div className="flex items-center justify-center h-32">
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <FiSmartphone className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold mb-2">No Device Data</h3>
            <p className="text-gray-400 text-xs">
              Device analytics will appear here once users visit your site.
            </p>
          </div>
        </div>
      )}

      {/* Device & Browser Breakdown - Compact */}
      {deviceData.totalDevices > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Device Types */}
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <FiSmartphone className="h-4 w-4 text-indigo-400" />
              Device Types
            </h3>
            <div className="space-y-1">
              {Object.entries(deviceData.deviceTypes)
                .sort(([, a], [, b]) => b - a)
                .map(([device, count]) => {
                  const Icon = getDeviceIcon(device);
                  return (
                    <div
                      key={device}
                      className="flex justify-between items-center text-xs"
                    >
                      <div className="flex items-center gap-1">
                        <Icon className="h-3 w-3 text-indigo-400" />
                        <span className="capitalize">{device}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="bg-gray-600 rounded-full h-1 w-8 overflow-hidden">
                          <div
                            className="bg-indigo-500 h-full rounded-full"
                            style={{
                              width: `${(count / deviceData.totalDevices) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-bold text-indigo-400 min-w-[1rem]">
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Browsers */}
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <FiMonitor className="h-4 w-4 text-purple-400" />
              Browsers
            </h3>
            <div className="space-y-1">
              {Object.entries(deviceData.browsers)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([browser, count]) => (
                  <div
                    key={browser}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="truncate">{browser}</span>
                    <div className="flex items-center gap-1">
                      <div className="bg-gray-600 rounded-full h-1 w-8 overflow-hidden">
                        <div
                          className="bg-purple-500 h-full rounded-full"
                          style={{
                            width: `${(count / deviceData.totalDevices) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-bold text-purple-400 min-w-[1rem]">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Operating Systems */}
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <FiTrendingUp className="h-4 w-4 text-green-400" />
              Operating Systems
            </h3>
            <div className="space-y-1">
              {Object.entries(deviceData.operatingSystems)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([os, count]) => (
                  <div
                    key={os}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="truncate">{os}</span>
                    <div className="flex items-center gap-1">
                      <div className="bg-gray-600 rounded-full h-1 w-8 overflow-hidden">
                        <div
                          className="bg-green-500 h-full rounded-full"
                          style={{
                            width: `${(count / deviceData.totalDevices) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-bold text-green-400 min-w-[1rem]">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Screen Sizes */}
          <div className="bg-gray-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <FiMonitor className="h-4 w-4 text-yellow-400" />
              Screen Sizes
            </h3>
            <div className="space-y-1">
              {Object.entries(deviceData.screenSizes)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([screenSize, count]) => (
                  <div
                    key={screenSize}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="truncate">{screenSize}</span>
                    <div className="flex items-center gap-1">
                      <div className="bg-gray-600 rounded-full h-1 w-8 overflow-hidden">
                        <div
                          className="bg-yellow-500 h-full rounded-full"
                          style={{
                            width: `${(count / deviceData.totalDevices) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-bold text-yellow-400 min-w-[1rem]">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
