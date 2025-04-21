import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Simple health check endpoint for the frontend
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
  });
} 