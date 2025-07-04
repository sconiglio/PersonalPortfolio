// API endpoint to export analytics with TRUE incremental updates – dramatically reduces Firebase reads by fetching only new data
// Path: src/app/api/analytics-export/route.ts (Next.js App Router)

import { NextRequest, NextResponse } from "next/server";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../../../../lib/firebase";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";

// Initialize Firebase if not already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

// Use /tmp for all runtime file writes (Vercel/serverless safe)
const TMP_DIR = "/tmp";

/********************
 * CONFIG & TYPES   *
 ********************/

const ANALYTICS_COLLECTIONS = {
  SESSIONS_V2: "analytics_sessions_v2",
  MESSAGES_V2: "analytics_chat_messages_v2",
  BUTTON_CLICKS_V2: "analytics_button_clicks_v2",
  TOUR_INTERACTIONS_V2: "analytics_tour_interactions_v2",
  DEVICE_INFO_V2: "analytics_device_info_v2",
  VISITOR_LOCATIONS_V2: "analytics_visitor_locations_v2",
} as const;

type CollectionKeys = keyof typeof ANALYTICS_COLLECTIONS;

interface ExportedAnalytics {
  metadata: {
    exportDate: string;
    lastUpdate: string;
    totalRecords: number;
    version: string;
    collections: string[];
    isIncremental?: boolean;
    newRecordsAdded?: number;
  };
  data: Record<CollectionKeys, any[]>;
  summary: {
    totalSessions: number;
    totalClicks: number;
    totalTours: number;
    uniqueVisitors: number;
    dateRange: { earliest: string; latest: string };
  };
}

/********************
 * ROUTE HANDLERS   *
 ********************/

export async function POST(request: NextRequest) {
  try {
    const { password, exportType } = await request.json();

    // Password-protect the endpoint (matches dashboard expectation)
    const ANALYTICS_PASSWORD =
      process.env.NEXT_PUBLIC_SECRET_PASS || process.env.ANALYTICS_PASSWORD;
    if (password !== ANALYTICS_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json(
        { error: "Database not initialised" },
        { status: 500 }
      );
    }

    console.log(`🚀 [Analytics Export] Starting ${exportType} export…`);

    const exportData =
      exportType === "incremental"
        ? await performIncrementalExport()
        : await performFullExport();

    const filenameBase =
      exportType === "incremental" ? "analytics-updated" : "analytics-full";
    const filename = `${filenameBase}-${
      new Date().toISOString().split("T")[0]
    }.json`;

    await saveExportFiles(exportData, filename);

    const message = exportData.metadata.isIncremental
      ? `Incremental update: ${exportData.metadata.newRecordsAdded} new records added`
      : `Full export: ${exportData.metadata.totalRecords} total records`;

    console.log(`✅ [Analytics Export] ${message}`);

    return NextResponse.json({
      success: true,
      message,
      exportInfo: {
        date: exportData.metadata.lastUpdate,
        totalRecords: exportData.metadata.totalRecords,
        filename,
        hostedUrl: "/analytics-latest.json",
        isIncremental: !!exportData.metadata.isIncremental,
        newRecordsAdded: exportData.metadata.newRecordsAdded || 0,
      },
    });
  } catch (err) {
    console.error("❌ [Analytics Export] Failed:", err);
    return NextResponse.json(
      {
        error: "Export failed",
        details: err instanceof Error ? err.message : "Unknown",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "True Incremental Analytics Export API",
    description:
      "Reduces Firebase costs by only fetching new records since the last export.",
    usage: {
      endpoint: "/api/analytics-export",
      method: "POST",
      body: {
        password: "string",
        exportType: '"full" | "incremental"',
      },
    },
  });
}

/********************
 * CORE FUNCTIONS   *
 ********************/

async function performFullExport(): Promise<ExportedAnalytics> {
  console.log("📊 Performing FULL export from Firebase…");

  const data: Record<CollectionKeys, any[]> = {} as any;
  let totalRecords = 0;

  for (const [key, collectionName] of Object.entries(ANALYTICS_COLLECTIONS)) {
    const timestampField = key === "SESSIONS_V2" ? "startTime" : "timestamp";
    const q = query(
      collection(db, collectionName),
      orderBy(timestampField, "desc")
    );
    const snapshot = await getDocs(q);

    // Normalise Firestore timestamps → ISO strings
    (data as any)[key] = snapshot.docs.map((d) => normaliseDoc(d.data(), d.id));
    totalRecords += (data as any)[key].length;

    console.log(`✅ ${key}: ${(data as any)[key].length} records`);
  }

  return {
    metadata: baseMetadata({ totalRecords, isIncremental: false }),
    data,
    summary: generateSummary(data),
  };
}

async function performIncrementalExport(): Promise<ExportedAnalytics> {
  console.log("🔄 Performing INCREMENTAL export…");

  const existing = await loadExistingData();
  if (!existing) {
    console.log("📝 No existing export found → falling back to FULL export");
    return performFullExport();
  }

  const lastUpdate = new Date(existing.metadata.lastUpdate);
  const newData: Record<CollectionKeys, any[]> = {} as any;
  let totalNew = 0;

  for (const [key, collectionName] of Object.entries(ANALYTICS_COLLECTIONS)) {
    const timestampField = key === "SESSIONS_V2" ? "startTime" : "timestamp";
    const q = query(
      collection(db, collectionName),
      where(timestampField, ">", Timestamp.fromDate(lastUpdate)),
      orderBy(timestampField, "desc")
    );

    const snapshot = await getDocs(q);
    (newData as any)[key] = snapshot.docs.map((d) =>
      normaliseDoc(d.data(), d.id)
    );
    totalNew += (newData as any)[key].length;

    console.log(`📥 ${key}: ${(newData as any)[key].length} new records`);
  }

  // Merge & deduplicate with existing data
  const merged: Record<CollectionKeys, any[]> = {} as any;
  for (const key of Object.keys(ANALYTICS_COLLECTIONS) as CollectionKeys[]) {
    const combined = [
      ...(existing.data[key] || []),
      ...((newData as any)[key] || []),
    ];
    merged[key] = dedupeById(combined).sort(
      (a, b) =>
        new Date(b.timestamp || b.startTime).getTime() -
        new Date(a.timestamp || a.startTime).getTime()
    );
  }

  const totalRecords = Object.values(merged).flat().length;

  return {
    metadata: baseMetadata({
      exportDate: existing.metadata.exportDate,
      totalRecords,
      isIncremental: true,
      newRecordsAdded: totalNew,
    }),
    data: merged,
    summary: generateSummary(merged),
  };
}

/********************
 * HELPER UTILITIES *
 ********************/

function normaliseDoc(docData: any, id: string) {
  return {
    id,
    ...docData,
    timestamp:
      docData.timestamp?.toDate?.()?.toISOString() || docData.timestamp,
    startTime:
      docData.startTime?.toDate?.()?.toISOString() || docData.startTime,
    endTime: docData.endTime?.toDate?.()?.toISOString() || docData.endTime,
  };
}

function dedupeById(arr: any[]) {
  return arr.filter(
    (item, idx, self) => self.findIndex((o) => o.id === item.id) === idx
  );
}

function baseMetadata({
  totalRecords,
  isIncremental,
  newRecordsAdded,
  exportDate,
}: {
  totalRecords: number;
  isIncremental: boolean;
  newRecordsAdded?: number;
  exportDate?: string;
}) {
  return {
    exportDate: exportDate || new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    totalRecords,
    version: "v2.1",
    collections: Object.keys(ANALYTICS_COLLECTIONS),
    isIncremental,
    newRecordsAdded,
  };
}

async function loadExistingData(): Promise<ExportedAnalytics | null> {
  try {
    // Try /tmp/public/analytics-latest.json first (if previously exported in this session)
    let p = join(TMP_DIR, "public", "analytics-latest.json");
    try {
      const txt = await readFile(p, "utf8");
      return JSON.parse(txt);
    } catch {}
    // Fallback to portfolio/public/analytics-latest.json (read-only)
    p = join(process.cwd(), "portfolio", "public", "analytics-latest.json");
    const txt = await readFile(p, "utf8");
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

async function saveExportFiles(data: ExportedAnalytics, filename: string) {
  const json = JSON.stringify(data, null, 2);
  const privateDataPath = join(TMP_DIR, "analytics-data.json");
  const backupDir = join(TMP_DIR, "analytics-backups");
  const timestampedPath = join(backupDir, filename);
  const publicDir = join(TMP_DIR, "public");
  const publicLatestPath = join(publicDir, "analytics-latest.json");

  // Ensure backup and public directories exist
  await mkdir(backupDir, { recursive: true });
  await mkdir(publicDir, { recursive: true });

  // Save current data & timestamped backup
  await Promise.all([
    writeFile(privateDataPath, json, "utf8"),
    writeFile(publicLatestPath, json, "utf8"),
    writeFile(timestampedPath, json, "utf8"),
  ]);

  console.log(
    `📁 Files saved: /tmp/analytics-data.json, /tmp/public/analytics-latest.json and /tmp/analytics-backups/${filename}`
  );
}

function generateSummary(data: Record<CollectionKeys, any[]>) {
  const sessions = data.SESSIONS_V2 || [];
  const buttonClicks = data.BUTTON_CLICKS_V2 || [];
  const tourInteractions = data.TOUR_INTERACTIONS_V2 || [];

  return {
    totalSessions: sessions.length,
    totalClicks: buttonClicks.length,
    totalTours: tourInteractions.length,
    uniqueVisitors: new Set(sessions.map((s: any) => s.sessionId)).size,
    dateRange: {
      earliest: sessions.at(-1)?.startTime || "",
      latest: sessions[0]?.startTime || "",
    },
  };
}
