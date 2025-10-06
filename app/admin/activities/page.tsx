"use client"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ActivitiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "Created new product",
      target: "Premium SEO Package",
      timestamp: "2 hours ago",
      type: "create",
      status: "completed",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated user profile",
      target: "User ID: 1247",
      timestamp: "4 hours ago",
      type: "update",
      status: "completed",
    },
    {
      id: 3,
      user: "Admin",
      action: "Deleted blog post",
      target: "SEO Tips for 2024",
      timestamp: "6 hours ago",
      type: "delete",
      status: "completed",
    },
    {
      id: 4,
      user: "Mike Johnson",
      action: "Processed order",
      target: "Order #12345",
      timestamp: "8 hours ago",
      type: "process",
      status: "completed",
    },
    {
      id: 5,
      user: "Sarah Wilson",
      action: "Sent message",
      target: "Client Support",
      timestamp: "1 day ago",
      type: "message",
      status: "completed",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "create":
        return "➕"
      case "update":
        return "✏️"
      case "delete":
        return "🗑️"
      case "process":
        return "⚡"
      case "message":
        return "💬"
      default:
        return "📊"
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "create":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-blue-100 text-blue-800"
      case "delete":
        return "bg-red-100 text-red-800"
      case "process":
        return "bg-purple-100 text-purple-800"
      case "message":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
              <p className="text-gray-600 mt-2">Monitor all system activities and user actions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">1,247</div>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Today's Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">89</div>
                  <p className="text-xs text-blue-600">+5% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">23</div>
                  <p className="text-xs text-purple-600">Currently online</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-xs text-gray-600">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            {/* Activities List */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">Recent Activities</CardTitle>
                    <CardDescription className="text-gray-600">Latest system and user activities</CardDescription>
                  </div>
                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent">
                    Export Log
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            <span className="text-gray-600">{activity.action}</span>
                            <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Target: {activity.target}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{activity.timestamp}</div>
                        <Badge variant="outline" className="mt-1 border-green-200 text-green-700">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
