"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Server, Cloud, CloudOff, HardDrive } from "lucide-react"

type SourceType = "azure-blob" | "database" | "api" | "file-system"
type ConnectionStatus = "connected" | "disconnected" | "warning"

interface DataSource {
  id: string
  name: string
  type: SourceType
  status: ConnectionStatus
  lastSync?: Date
  details?: string
}

interface PipelineDataSourcesProps {
  sources: DataSource[]
  className?: string
}

export function PipelineDataSources({ sources, className }: PipelineDataSourcesProps) {
  const getSourceIcon = (type: SourceType) => {
    switch (type) {
      case "azure-blob":
        return <Cloud className="h-5 w-5" />
      case "database":
        return <Database className="h-5 w-5" />
      case "api":
        return <Server className="h-5 w-5" />
      case "file-system":
        return <HardDrive className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Connected
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Disconnected
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Warning
          </Badge>
        )
    }
  }

  const formatSourceType = (type: SourceType) => {
    switch (type) {
      case "azure-blob":
        return "Azure Blob Storage"
      case "database":
        return "Database"
      case "api":
        return "API"
      case "file-system":
        return "File System"
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Data Sources</CardTitle>
        <CardDescription>Connected data sources and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sources.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-6">
              No data sources configured
            </p>
          ) : (
            sources.map((source) => (
              <div key={source.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${source.status === "disconnected" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"}`}>
                    {source.status === "disconnected" ? <CloudOff className="h-5 w-5" /> : getSourceIcon(source.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{source.name}</h4>
                    <p className="text-xs text-muted-foreground">{formatSourceType(source.type)}</p>
                    {source.details && (
                      <p className="text-xs text-muted-foreground mt-1">{source.details}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getStatusBadge(source.status)}
                  {source.lastSync && (
                    <span className="text-xs text-muted-foreground">
                      Last synced: {source.lastSync.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 