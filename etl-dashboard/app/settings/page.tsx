"use client"

import { useState } from "react"
import { Bell, ChevronRight, KeyRound, LayoutDashboard, Moon, Palette, Shield, Sun, User } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [apiKey, setApiKey] = useState("serverless-etl-dashboard-key-2024")
  const [notifications, setNotifications] = useState(true)
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-bold">Settings</h1>
          
          <Tabs defaultValue="appearance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                <span className="hidden sm:inline">API</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the appearance of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Theme</h3>
                      <p className="text-sm text-muted-foreground">
                        Select the theme for the dashboard
                      </p>
                    </div>
                    <RadioGroup 
                      defaultValue={theme} 
                      className="grid grid-cols-3 gap-4" 
                      onValueChange={setTheme}
                    >
                      <div>
                        <RadioGroupItem 
                          value="light" 
                          id="theme-light" 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor="theme-light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Sun className="mb-3 h-6 w-6" />
                          Light
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem
                          value="dark"
                          id="theme-dark"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="theme-dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Moon className="mb-3 h-6 w-6" />
                          Dark
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem
                          value="system"
                          id="theme-system"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="theme-system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Palette className="mb-3 h-6 w-6" />
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Animations</h3>
                        <p className="text-sm text-muted-foreground">Enable animations and transitions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Reduced Motion</h3>
                        <p className="text-sm text-muted-foreground">Respect reduced motion preferences</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>
                    Manage your API credentials and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="api-key" 
                        value={apiKey} 
                        onChange={(e) => setApiKey(e.target.value)} 
                        type="password"
                      />
                      <Button>
                        Generate New Key
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This API key provides access to all ETL operations
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Rate Limiting</h3>
                        <p className="text-sm text-muted-foreground">Limit API requests per minute (0 for unlimited)</p>
                      </div>
                      <Input 
                        type="number" 
                        className="w-20" 
                        defaultValue="60" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">API Access Log</h3>
                        <p className="text-sm text-muted-foreground">Save detailed logs of API access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Security</h3>
                    <div className="rounded-md bg-muted p-4 flex items-center gap-4">
                      <Shield className="h-8 w-8 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium">API is secure</p>
                        <p className="text-sm text-muted-foreground">
                          Your API is properly secured with authentication
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Security Settings <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Settings</CardTitle>
                  <CardDescription>
                    Customize your dashboard experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="refresh-interval">Auto-refresh interval (seconds)</Label>
                    <Input 
                      id="refresh-interval"
                      type="number" 
                      value={refreshInterval} 
                      onChange={(e) => setRefreshInterval(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 to disable auto-refresh
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Show Pipeline Status</h3>
                        <p className="text-sm text-muted-foreground">Display pipeline status on dashboard</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Show Recent Activity</h3>
                        <p className="text-sm text-muted-foreground">Display recent pipeline activity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Show Error Alerts</h3>
                        <p className="text-sm text-muted-foreground">Display error alerts on dashboard</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications for important events</p>
                    </div>
                    <Switch 
                      checked={notifications} 
                      onCheckedChange={setNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Pipeline Failures</h3>
                        <p className="text-sm text-muted-foreground">Notify when a pipeline fails</p>
                      </div>
                      <Switch defaultChecked disabled={!notifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Pipeline Completions</h3>
                        <p className="text-sm text-muted-foreground">Notify when a pipeline completes</p>
                      </div>
                      <Switch disabled={!notifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">API Errors</h3>
                        <p className="text-sm text-muted-foreground">Notify on API errors</p>
                      </div>
                      <Switch defaultChecked disabled={!notifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">System Updates</h3>
                        <p className="text-sm text-muted-foreground">Notify about system updates</p>
                      </div>
                      <Switch defaultChecked disabled={!notifications} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="Admin User" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@example.com" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
} 