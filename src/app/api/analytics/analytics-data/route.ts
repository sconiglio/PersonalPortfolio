import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get password from request
    const { password } = await request.json();

    // Verify password
    const ANALYTICS_PASSWORD =
      process.env.NEXT_PUBLIC_SECRET_PASS || process.env.ANALYTICS_PASSWORD;
    if (password !== ANALYTICS_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Return mock data for now - in a real implementation you'd load from file
    const mockData = {
      metadata: {
        exportDate: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        totalRecords: 0,
        version: "2.0",
      },
      data: {
        sessions: [],
        messages: [],
        buttonClicks: [],
        tourInteractions: [],
        deviceAnalytics: [],
        visitorLocations: [],
      },
    };

    return NextResponse.json({
      success: true,
      data: mockData,
    });
  } catch (error) {
    console.error("Failed to load analytics data:", error);
    return NextResponse.json(
      { error: "Failed to load analytics data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Analytics Data API",
    description: "Serves analytics data only with valid password",
    endpoints: {
      "POST /api/analytics-data": "Get analytics data",
      Body: { password: "string" },
    },
  });
}
