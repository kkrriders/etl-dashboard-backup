import { NextResponse } from 'next/server';

// Ensure we get fresh data each time
export const dynamic = 'force-dynamic';

// Sample metrics endpoint for monitoring
export async function GET() {
  // Create some basic metrics
  const metrics = {
    status: 'ok',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    requests: {
      total: Math.floor(Math.random() * 1000), // Simulated metrics
      success: Math.floor(Math.random() * 900),
      error: Math.floor(Math.random() * 100)
    },
    performance: {
      avgResponseTime: Math.floor(Math.random() * 200) + 50 + 'ms'
    }
  };

  return NextResponse.json(metrics);
} 