import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
    
    if (!apiBaseUrl) {
      return NextResponse.json({ 
        success: false, 
        error: "API_BASE_URL is not configured" 
      }, { status: 500 });
    }
    
    // Test a direct call to backend metrics endpoint
    const response = await fetch(`${apiBaseUrl}/metrics`, {
      headers: {
        'X-API-Key': apiKey
      },
      cache: 'no-store'
    });
    
    // Get response
    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      return NextResponse.json({
        success: false,
        status: response.status,
        error: "Invalid JSON response",
        text: responseText.substring(0, 200)
      });
    }
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        error: responseData || "Unknown error",
        apiKeyProvided: !!apiKey
      });
    }
    
    return NextResponse.json({
      success: true,
      status: response.status,
      data: responseData,
      message: "Auth test successful",
      apiBaseUrl,
      apiKeyProvided: !!apiKey
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
} 