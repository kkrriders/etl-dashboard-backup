"use client"

import Link from "next/link"
import { Database, FolderArchive, Plus, Share2, TableProperties } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for destinations
const destinations = [
  {
    id: "1",
    name: "Product Database",
    type: "MongoDB",
    lastWrite: "1 hour ago",
    status: "active",
    recordsStored: 12456,
    icon: <Database className="h-6 w-6" />
  },
  {
    id: "2",
    name: "Analytics Data Warehouse",
    type: "Snowflake",
    lastWrite: "45 minutes ago",
    status: "active",
    recordsStored: 54281,
    icon: <TableProperties className="h-6 w-6" />
  },
  {
    id: "3",
    name: "Archive Storage",
    type: "Azure Blob Storage",
    lastWrite: "1 day ago",
    status: "active",
    recordsStored: 142780,
    icon: <FolderArchive className="h-6 w-6" />
  },
  {
    id: "4",
    name: "API Endpoint",
    type: "Webhook",
    lastWrite: "30 minutes ago",
    status: "active",
    recordsStored: 9823,
    icon: <Share2 className="h-6 w-6" />
  }
]

export default function DestinationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Data Destinations</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Destination
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link href={`/destinations/${destination.id}`} key={destination.id} className="block">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-muted rounded-md">
                        {destination.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{destination.name}</CardTitle>
                        <CardDescription>{destination.type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {destination.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Records Stored</p>
                        <p className="font-medium">{destination.recordsStored.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Last Write</p>
                        <p className="font-medium">{destination.lastWrite}</p>
                      </div>
                      <div className="col-span-2">
                        <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                          <div 
                            className="h-full bg-primary" 
                            style={{ 
                              width: `${Math.min(destination.recordsStored / 2000, 100)}%` 
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Usage</span>
                          <span>{Math.min(Math.round(destination.recordsStored / 2000), 100)}%</span>
                        </div>
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
                <p className="text-xl font-medium mb-1">Add New Destination</p>
                <p className="text-sm text-muted-foreground text-center">
                  Configure a new destination for your processed data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 