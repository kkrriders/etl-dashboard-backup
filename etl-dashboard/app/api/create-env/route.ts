import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Get the current environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
    
    // Create the content for .env.local file
    const envContent = `# Generated by create-env endpoint
# Backend API URL (no trailing slash)
NEXT_PUBLIC_API_BASE_URL=${apiUrl}

# API Key for authentication
NEXT_PUBLIC_API_KEY=${apiKey}

# Generated at: ${new Date().toISOString()}
`;

    // Generate the file path
    const workspacePath = process.cwd();
    const filePath = path.join(workspacePath, '.env.local.generated');
    
    // Write the file
    fs.writeFileSync(filePath, envContent, 'utf8');
    
    // Return success message with instructions
    return NextResponse.json({
      success: true,
      message: "Generated .env.local.generated file",
      instructions: "1. Copy this file to .env.local\n2. Ensure API key is correct\n3. Restart Next.js server",
      path: filePath,
      content: envContent,
    });
  } catch (error) {
    console.error("Error generating .env file:", error);
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 });
  }
} 