// Analytics Export System
// Exports analytics data to static JSON files for cost-free access

import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where,
  Firestore,
  Timestamp 
} from "firebase/firestore";

interface ExportedAnalytics {
  metadata: {
    exportDate: string;
    lastUpdate: string;
    totalRecords: number;
    version: string;
    collections: string[];
  };
  data: {
    sessions: any[];
    messages: any[];
    buttonClicks: any[];
    tourInteractions: any[];
    deviceAnalytics: any[];
    visitorLocations: any[];
  };
  summary: {
    totalSessions: number;
    totalClicks: number;
    totalTours: number;
    uniqueVisitors: number;
    dateRange: {
      earliest: string;
      latest: string;
    };
    topLocations: Array<{ location: string; count: number }>;
    topButtons: Array<{ button: string; count: number }>;
  };
}

class AnalyticsExporter {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  // Export all analytics data to a JSON object
  async exportAllData(): Promise<ExportedAnalytics> {
    console.log("📊 Starting full analytics export...");

    const collections = {
      sessions: "analytics_sessions_v2",
      messages: "analytics_chat_messages_v2", 
      buttonClicks: "analytics_button_clicks_v2",
      tourInteractions: "analytics_tour_interactions_v2",
      deviceAnalytics: "analytics_device_info_v2",
      visitorLocations: "analytics_visitor_locations_v2"
    };

    const data: any = {};
    let totalRecords = 0;

    // Fetch all collections
    for (const [key, collectionName] of Object.entries(collections)) {
      console.log(`📦 Fetching ${key}...`);
      
      const collectionQuery = query(
        collection(this.db, collectionName),
        orderBy("timestamp", "desc") // Use "startTime" for sessions
      );
      
      // Special case for sessions (uses startTime instead of timestamp)
      const sessionsQuery = query(
        collection(this.db, collections.sessions),
        orderBy("startTime", "desc")
      );

      const finalQuery = key === 'sessions' ? sessionsQuery : collectionQuery;
      const snapshot = await getDocs(finalQuery);
      
      data[key] = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          // Convert Firestore timestamps to ISO strings
          timestamp: docData.timestamp?.toDate?.()?.toISOString() || docData.timestamp,
          startTime: docData.startTime?.toDate?.()?.toISOString() || docData.startTime,
          endTime: docData.endTime?.toDate?.()?.toISOString() || docData.endTime,
        };
      });

      totalRecords += data[key].length;
      console.log(`✅ ${key}: ${data[key].length} records`);
    }

    // Generate summary statistics
    const summary = this.generateSummary(data);

    const exportData: ExportedAnalytics = {
      metadata: {
        exportDate: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        totalRecords,
        version: "v2.1",
        collections: Object.keys(collections)
      },
      data,
      summary
    };

    console.log(`🎉 Export complete: ${totalRecords} total records`);
    return exportData;
  }

  // Export only new data since last export
  async exportIncrementalData(lastExportFile: ExportedAnalytics): Promise<ExportedAnalytics> {
    console.log("🔄 Starting incremental analytics export...");

    const lastUpdate = new Date(lastExportFile.metadata.lastUpdate);
    const collections = {
      sessions: "analytics_sessions_v2",
      messages: "analytics_chat_messages_v2",
      buttonClicks: "analytics_button_clicks_v2", 
      tourInteractions: "analytics_tour_interactions_v2",
      deviceAnalytics: "analytics_device_info_v2",
      visitorLocations: "analytics_visitor_locations_v2"
    };

    const newData: any = {};
    let totalNewRecords = 0;

    // Fetch only new records since last export
    for (const [key, collectionName] of Object.entries(collections)) {
      console.log(`🔍 Checking ${key} for new records...`);

      // Build query for new data only
      const timestampField = key === 'sessions' ? 'startTime' : 'timestamp';
      const incrementalQuery = query(
        collection(this.db, collectionName),
        where(timestampField, ">", Timestamp.fromDate(lastUpdate)),
        orderBy(timestampField, "desc")
      );

      const snapshot = await getDocs(incrementalQuery);
      
      newData[key] = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          timestamp: docData.timestamp?.toDate?.()?.toISOString() || docData.timestamp,
          startTime: docData.startTime?.toDate?.()?.toISOString() || docData.startTime,
          endTime: docData.endTime?.toDate?.()?.toISOString() || docData.endTime,
        };
      });

      totalNewRecords += newData[key].length;
      console.log(`📥 ${key}: ${newData[key].length} new records`);
    }

    // Merge new data with existing data
    const mergedData: any = {};
    for (const key of Object.keys(collections)) {
      // Combine existing + new data, remove duplicates by ID
      const existingData = lastExportFile.data[key as keyof typeof lastExportFile.data] || [];
      const combinedData = [...existingData, ...newData[key]];
      
      // Remove duplicates by ID
      const uniqueData = combinedData.filter((item, index, array) => 
        array.findIndex(other => other.id === item.id) === index
      );

      // Sort by timestamp (newest first)
      mergedData[key] = uniqueData.sort((a, b) => {
        const timeA = new Date(a.timestamp || a.startTime).getTime();
        const timeB = new Date(b.timestamp || b.startTime).getTime();
        return timeB - timeA;
      });
    }

    // Generate updated summary
    const summary = this.generateSummary(mergedData);

    const exportData: ExportedAnalytics = {
      metadata: {
        exportDate: lastExportFile.metadata.exportDate, // Keep original export date
        lastUpdate: new Date().toISOString(),
        totalRecords: Object.values(mergedData).flat().length,
        version: "v2.1",
        collections: Object.keys(collections)
      },
      data: mergedData,
      summary
    };

    console.log(`🎉 Incremental update complete: ${totalNewRecords} new records added`);
    return exportData;
  }

  // Generate summary statistics
  private generateSummary(data: any) {
    const sessions = data.sessions || [];
    const buttonClicks = data.buttonClicks || [];
    const tourInteractions = data.tourInteractions || [];

    // Basic counts
    const totalSessions = sessions.length;
    const totalClicks = buttonClicks.length;
    const totalTours = tourInteractions.length;
    const uniqueVisitors = new Set(sessions.map((s: any) => s.sessionId)).size;

    // Date range
    const allDates = [
      ...sessions.map((s: any) => new Date(s.startTime)),
      ...buttonClicks.map((c: any) => new Date(c.timestamp)),
      ...tourInteractions.map((t: any) => new Date(t.timestamp))
    ].filter(d => !isNaN(d.getTime()));

    const earliest = allDates.length > 0 ? new Date(Math.min(...allDates.map(d => d.getTime()))).toISOString() : "";
    const latest = allDates.length > 0 ? new Date(Math.max(...allDates.map(d => d.getTime()))).toISOString() : "";

    // Top locations
    const locationCounts: Record<string, number> = {};
    sessions.forEach((session: any) => {
      const location = `${session.location?.city || 'Unknown'}, ${session.location?.country || 'Unknown'}`;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });

    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top buttons
    const buttonCounts: Record<string, number> = {};
    buttonClicks.forEach((click: any) => {
      const button = click.buttonText || click.buttonType || 'Unknown';
      buttonCounts[button] = (buttonCounts[button] || 0) + 1;
    });

    const topButtons = Object.entries(buttonCounts)
      .map(([button, count]) => ({ button, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalSessions,
      totalClicks,
      totalTours,
      uniqueVisitors,
      dateRange: { earliest, latest },
      topLocations,
      topButtons
    };
  }

  // Download the export as a JSON file
  downloadAsFile(exportData: ExportedAnalytics, filename?: string) {
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`💾 Downloaded: ${link.download}`);
  }

  // Save to a hosted file (for cross-device access)
  async saveToHostedFile(exportData: ExportedAnalytics): Promise<boolean> {
    try {
      // This would save to your hosting service (Vercel, etc.)
      // For now, we'll use the download method and you can manually upload
      console.log("💡 Saving to hosted location...");
      
      // Option 1: Save to public folder (you'd need to commit/deploy)
      // Option 2: Save to GitHub Gist (free hosting)
      // Option 3: Save to your server endpoint
      
      this.downloadAsFile(exportData, 'analytics-latest.json');
      
      console.log("📁 File ready for upload to public hosting");
      return true;
    } catch (error) {
      console.error("❌ Error saving hosted file:", error);
      return false;
    }
  }
}

// Helper function to load analytics from hosted file
export async function loadAnalyticsFromFile(fileUrl: string): Promise<ExportedAnalytics | null> {
  try {
    console.log(`📥 Loading analytics from: ${fileUrl}`);
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data: ExportedAnalytics = await response.json();
    console.log(`✅ Loaded analytics: ${data.metadata.totalRecords} records`);
    return data;
  } catch (error) {
    console.error("❌ Error loading analytics file:", error);
    return null;
  }
}

export { AnalyticsExporter };
export type { ExportedAnalytics }; 