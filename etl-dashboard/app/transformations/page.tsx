"use client"

import Link from "next/link"
import { Code, FileCode, FilterX, Plus, RefreshCw, Sparkles, Wand2 } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample transformations data
const transformations = [
  {
    id: "1",
    name: "Product Description Enrichment",
    type: "AI",
    description: "Enhance product descriptions with AI-generated content",
    created: "2023-11-10",
    usedIn: 3,
    icon: <Sparkles className="h-6 w-6" />
  },
  {
    id: "2",
    name: "Data Cleaning Filter",
    type: "Filter",
    description: "Remove invalid entries and normalize field formats",
    created: "2023-10-28",
    usedIn: 5,
    icon: <FilterX className="h-6 w-6" />
  },
  {
    id: "3",
    name: "JSON to CSV Converter",
    type: "Convert",
    description: "Transform JSON data to CSV format",
    created: "2023-11-05",
    usedIn: 2,
    icon: <RefreshCw className="h-6 w-6" />
  },
  {
    id: "4",
    name: "Customer Data Anonymizer",
    type: "Script",
    description: "Anonymize sensitive customer information using JavaScript",
    created: "2023-11-12",
    usedIn: 1,
    icon: <Code className="h-6 w-6" />
  }
]

// Sample templates
const templates = [
  {
    id: "t1",
    name: "Text Sentiment Analysis",
    description: "Analyze text sentiment (positive, negative, neutral)",
    type: "AI",
    complexity: "Low",
    icon: <Sparkles className="h-6 w-6" />
  },
  {
    id: "t2",
    name: "Data Validation",
    description: "Validate data against schema and filter invalid entries",
    type: "Filter",
    complexity: "Medium",
    icon: <FilterX className="h-6 w-6" />
  },
  {
    id: "t3",
    name: "JavaScript Transform",
    description: "Custom JavaScript transformation with full access to data",
    type: "Script",
    complexity: "High",
    icon: <FileCode className="h-6 w-6" />
  },
  {
    id: "t4",
    name: "Entity Extraction",
    description: "Extract entities (people, places, etc.) from text",
    type: "AI",
    complexity: "Medium",
    icon: <Wand2 className="h-6 w-6" />
  }
]

export default function TransformationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Transformations</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Transformation
            </Button>
          </div>
          
          <Tabs defaultValue="transformations" className="space-y-6">
            <TabsList>
              <TabsTrigger value="transformations">My Transformations</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transformations">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {transformations.map((transform) => (
                  <Link href={`/transformations/${transform.id}`} key={transform.id} className="block">
                    <Card className="h-full transition-all hover:shadow-md">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-muted rounded-md">
                            {transform.icon}
                          </div>
                          <div>
                            <CardTitle>{transform.name}</CardTitle>
                            <CardDescription>{transform.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{transform.type}</Badge>
                          <span className="text-sm text-muted-foreground">Created: {transform.created}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-muted-foreground">
                          Used in {transform.usedIn} pipeline{transform.usedIn !== 1 ? "s" : ""}
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
                
                <Card className="h-full border-dashed flex items-center justify-center">
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <div className="rounded-full p-3 bg-muted mb-3">
                      <Plus className="h-6 w-6" />
                    </div>
                    <p className="text-xl font-medium mb-1">Create Transformation</p>
                    <p className="text-sm text-muted-foreground text-center">
                      Create a custom transformation to process your data.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="templates">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id} className="h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-md">
                          {template.icon}
                        </div>
                        <div>
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{template.type}</Badge>
                        <Badge variant="secondary">Complexity: {template.complexity}</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
} 