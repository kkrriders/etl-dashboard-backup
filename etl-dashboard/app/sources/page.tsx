"use client"

import Link from "next/link"
import { Database, FileJson, Plus, Server, UploadCloud } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for sources
const sources = [
  {
    id: "1",
    name: "Product Catalog API",
    type: "REST API",
    lastSync: "2 hours ago",
    status: "active",
    records: 1245,
    icon: <Server className="h-6 w-6" />
  },
  {
    id: "2",
    name: "Customer Database",
    type: "PostgreSQL",
    lastSync: "30 minutes ago",
    status: "active",
    records: 5872,
    icon: <Database className="h-6 w-6" />
  },
  {
    id: "3",
    name: "Sales Data CSV",
    type: "File Upload",
    lastSync: "1 day ago",
    status: "active",
    records: 3450,
    icon: <FileJson className="h-6 w-6" />
  },
  {
    id: "4",
    name: "Website Analytics",
    type: "Google Analytics API",
    lastSync: "3 hours ago",
    status: "active",
    records: 8760,
    icon: <UploadCloud className="h-6 w-6" />
  }
]

export default function SourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Data Sources</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Source
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sources.map((source) => (
              <Link href={`/sources/${source.id}`} key={source.id} className="block">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-muted rounded-md">
                        {source.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{source.name}</CardTitle>
                        <CardDescription>{source.type}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                        <p className="font-medium">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          {source.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Records</p>
                        <p className="font-medium">{source.records.toLocaleString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Last Synced</p>
                        <p className="font-medium">{source.lastSync}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <Card className="h-full border-dashed flex items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full p-3 bg-muted mb-3">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="text-xl font-medium mb-1">Add New Source</p>
                <p className="text-sm text-muted-foreground text-center">
                  Connect a new data source to use in your ETL pipelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 