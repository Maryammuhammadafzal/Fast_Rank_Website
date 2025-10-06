"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for activities
const mockActivities = [
  {
    id: "ACT-001",
    user: "Admin User",
    action: "Created new user",
    target: "john.doe@example.com",
    timestamp: "2024-01-20 15:30:25",
    type: "user_management",
    ip: "192.168.1.100",
    status: "success",
  },
  {
    id: "ACT-002",
    user: "Jane Smith",
    action: "Updated profile",
    target: "Profile settings",
    timestamp: "2024-01-20 14:15:10",
    type: "user_activity",
    ip: "192.168.1.101",
    status: "success",
  },
  {
    id: "ACT-003",
    user: "Admin User",
    action: "Approved review",
    target: "REV-001",
    timestamp: "2024-01-20 13:45:30",
    type: "content_management",
    ip: "192.168.1.100",
    status: "success",
  },
  {
    id: "ACT-004",
    user: "Mike Johnson",
    action: "Failed login attempt",
    target: "Login page",
    timestamp: "2024-01-20 12:20:15",
    type: "security",
    ip: "192.168.1.102",
    status: "failed",
  },
  {
    id: "ACT-005",
    user: "Admin User",
    action: "Updated site settings",
    target: "General settings",
    timestamp: "2024-01-20 11:10:45",
    type: "system",
    ip: "192.168.1.100",
    status: "success",
  },
]

export default function SettingsActivities() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [searchTerm, setSearchTerm] = useState("")
  const [activityFilter, setActivityFilter] = useState("all")

  // Settings state
  const [settings, setSettings] = useState({
    siteName: "Marketplace Website",
    siteDescription: "Your trusted marketplace for digital services",
    siteUrl: "https://marketplace.com",
    adminEmail: "admin@marketplace.com",
    supportEmail: "support@marketplace.com",
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    autoApproveReviews: false,
    requireEmailVerification: true,
    maxFileSize: "10",
    allowedFileTypes: "jpg,png,pdf,doc,docx",
    sessionTimeout: "30",
    passwordMinLength: "8",
    enableTwoFactor: false,
    backupFrequency: "daily",
    logRetention: "30",
  })

  const getActivityTypeColor = (type) => {
    switch (type) {
      case "user_management":
        return "bg-blue-100 text-blue-800"
      case "user_activity":
        return "bg-green-100 text-green-800"
      case "content_management":
        return "bg-purple-100 text-purple-800"
      case "security":
        return "bg-red-100 text-red-800"
      case "system":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activityFilter === "all" || activity.type === activityFilter
    return matchesSearch && matchesFilter
  })

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings)
    // Show success message
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings & Activities</h1>
                <p className="text-gray-600">Manage site settings and track system activities</p>
              </div>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger
                  value="general"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  <span>⚙️</span>
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  <span>📊</span>
                  Activities
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <div className="grid gap-6">
                  {/* General Settings */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span>🌐</span>
                        General Settings
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Basic site configuration and information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="siteName" className="text-gray-700">
                            Site Name
                          </Label>
                          <Input
                            id="siteName"
                            value={settings.siteName}
                            onChange={(e) => handleSettingChange("siteName", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="siteUrl" className="text-gray-700">
                            Site URL
                          </Label>
                          <Input
                            id="siteUrl"
                            value={settings.siteUrl}
                            onChange={(e) => handleSettingChange("siteUrl", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="siteDescription" className="text-gray-700">
                          Site Description
                        </Label>
                        <Textarea
                          id="siteDescription"
                          value={settings.siteDescription}
                          onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                          rows={3}
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="adminEmail" className="text-gray-700">
                            Admin Email
                          </Label>
                          <Input
                            id="adminEmail"
                            type="email"
                            value={settings.adminEmail}
                            onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="supportEmail" className="text-gray-700">
                            Support Email
                          </Label>
                          <Input
                            id="supportEmail"
                            type="email"
                            value={settings.supportEmail}
                            onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User & Registration Settings */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span>👥</span>
                        User & Registration
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Control user registration and account settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>User Registration</Label>
                          <p className="text-sm text-gray-600">Allow new users to register</p>
                        </div>
                        <Switch
                          checked={settings.userRegistration}
                          onCheckedChange={(checked) => handleSettingChange("userRegistration", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Email Verification</Label>
                          <p className="text-sm text-gray-600">Users must verify email before access</p>
                        </div>
                        <Switch
                          checked={settings.requireEmailVerification}
                          onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="passwordMinLength" className="text-gray-700">
                            Minimum Password Length
                          </Label>
                          <Input
                            id="passwordMinLength"
                            type="number"
                            value={settings.passwordMinLength}
                            onChange={(e) => handleSettingChange("passwordMinLength", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sessionTimeout" className="text-gray-700">
                            Session Timeout (minutes)
                          </Label>
                          <Input
                            id="sessionTimeout"
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notification Settings */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span>🔔</span>
                        Notifications
                      </CardTitle>
                      <CardDescription className="text-gray-600">Configure notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-600">Send notifications via email</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-gray-600">Send notifications via SMS</p>
                        </div>
                        <Switch
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Management */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span>📝</span>
                        Content Management
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Configure content and file upload settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto-approve Reviews</Label>
                          <p className="text-sm text-gray-600">Automatically approve new reviews</p>
                        </div>
                        <Switch
                          checked={settings.autoApproveReviews}
                          onCheckedChange={(checked) => handleSettingChange("autoApproveReviews", checked)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="maxFileSize" className="text-gray-700">
                            Max File Size (MB)
                          </Label>
                          <Input
                            id="maxFileSize"
                            type="number"
                            value={settings.maxFileSize}
                            onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="allowedFileTypes" className="text-gray-700">
                            Allowed File Types
                          </Label>
                          <Input
                            id="allowedFileTypes"
                            value={settings.allowedFileTypes}
                            onChange={(e) => handleSettingChange("allowedFileTypes", e.target.value)}
                            placeholder="jpg,png,pdf,doc"
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Settings */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span>🔒</span>
                        Security
                      </CardTitle>
                      <CardDescription className="text-gray-600">Security and authentication settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Maintenance Mode</Label>
                          <p className="text-sm text-gray-600">Put site in maintenance mode</p>
                        </div>
                        <Switch
                          checked={settings.maintenanceMode}
                          onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-600">Enable 2FA for admin accounts</p>
                        </div>
                        <Switch
                          checked={settings.enableTwoFactor}
                          onCheckedChange={(checked) => handleSettingChange("enableTwoFactor", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Settings */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <span>🖥️</span>
                        System
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        System maintenance and backup settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="backupFrequency" className="text-gray-700">
                            Backup Frequency
                          </Label>
                          <Select
                            value={settings.backupFrequency}
                            onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                          >
                            <SelectTrigger className="bg-white border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="logRetention" className="text-gray-700">
                            Log Retention (days)
                          </Label>
                          <Input
                            id="logRetention"
                            type="number"
                            value={settings.logRetention}
                            onChange={(e) => handleSettingChange("logRetention", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveSettings}
                      className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800"
                    >
                      <span>💾</span>
                      Save Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <span>📊</span>
                      Activity Log
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Track user and admin activities across the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Activity Filters */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <Input
                          placeholder="Search activities..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <Select value={activityFilter} onValueChange={setActivityFilter}>
                        <SelectTrigger className="w-[200px] bg-white border-gray-300">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">All Activities</SelectItem>
                          <SelectItem value="user_management">User Management</SelectItem>
                          <SelectItem value="user_activity">User Activity</SelectItem>
                          <SelectItem value="content_management">Content Management</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                        <span className="mr-2">🔄</span>
                        Refresh
                      </Button>
                    </div>

                    {/* Activities Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-700">Activity ID</TableHead>
                          <TableHead className="text-gray-700">User</TableHead>
                          <TableHead className="text-gray-700">Action</TableHead>
                          <TableHead className="text-gray-700">Target</TableHead>
                          <TableHead className="text-gray-700">Type</TableHead>
                          <TableHead className="text-gray-700">Status</TableHead>
                          <TableHead className="text-gray-700">IP Address</TableHead>
                          <TableHead className="text-gray-700">Timestamp</TableHead>
                          <TableHead className="text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredActivities.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell className="font-medium text-gray-900">{activity.id}</TableCell>
                            <TableCell className="text-gray-900">{activity.user}</TableCell>
                            <TableCell className="text-gray-900">{activity.action}</TableCell>
                            <TableCell className="text-gray-900">{activity.target}</TableCell>
                            <TableCell>
                              <Badge className={getActivityTypeColor(activity.type)}>
                                {activity.type.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm text-gray-900">{activity.ip}</TableCell>
                            <TableCell className="text-gray-900">{activity.timestamp}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                  👁️
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
