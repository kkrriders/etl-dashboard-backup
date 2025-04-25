"use client"

import { Shield, Wrench, Zap } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import ApiDiagnostics from "@/components/api/api-diagnostics"

export default function ApiDiagnosticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-500" />
              API Diagnostics
            </h1>
            <p className="text-muted-foreground mt-1">
              Test your API connections, validate authentication, and diagnose issues
            </p>
          </div>

          <div className="mb-6 grid gap-6 grid-cols-1 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-yellow-500" />
                <h3 className="font-medium">API Health</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Test connectivity to the backend API and verify your authentication credentials.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="h-4 w-4 text-purple-500" />
                <h3 className="font-medium">Endpoint Testing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Try different endpoints and view detailed responses for debugging.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-green-500" />
                <h3 className="font-medium">Auth Validation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Confirm your API keys and credentials are properly configured.
              </p>
            </div>
          </div>

          <ApiDiagnostics />
        </div>
      </main>
    </div>
  )
} 