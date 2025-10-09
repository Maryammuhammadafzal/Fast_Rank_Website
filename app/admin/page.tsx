"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for admin dashboard
const adminStats = {
  totalUsers: 1247,
  totalWebsites: 89,
  totalOrders: 342,
  totalRevenue: 45780,
  pendingOrders: 23,
  activeUsers: 156,
  newMessages: 12,
  pendingReviews: 8,
}

const recentActivities = [
  { id: 1, type: "user", message: "New user registered: john.doe@example.com", time: "2 minutes ago" },
  { id: 2, type: "order", message: "Order #ORD-345 completed by TechContent Pro", time: "15 minutes ago" },
  { id: 3, type: "website", message: "New website added: techblog.com (DA: 65)", time: "1 hour ago" },
  { id: 4, type: "review", message: "New review submitted for Order #ORD-342", time: "2 hours ago" },
  { id: 5, type: "message", message: "Support ticket created by user@example.com", time: "3 hours ago" },
]

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* lg:ml-46 */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Overview of your platform's performance and activity</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground font-bold text-lg">👥</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-accent-foreground">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Websites</p>
                      <p className="text-2xl font-bold">{adminStats.totalWebsites}</p>
                    </div>
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground font-bold text-lg">🌐</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-accent-foreground">+5</span> added this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{adminStats.totalOrders}</p>
                    </div>
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground font-bold text-lg">🛍️</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-destructive">{adminStats.pendingOrders}</span> pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground font-bold text-lg">💰</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-accent-foreground">+18%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used admin actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">

                  <Link href='/admin/users'>
                    <Button className="w-full justify-start h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                      <span className="mr-3">👥</span>
                      Manage Users
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <span className="mr-3">🌐</span>
                    Add New Website
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <span className="mr-3">📝</span>
                    Create Blog Post
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <span className="mr-3">💬</span>
                    View Messages ({adminStats.newMessages})
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === "user" && <span className="text-sm">👤</span>}
                          {activity.type === "order" && <span className="text-sm">📦</span>}
                          {activity.type === "website" && <span className="text-sm">🌐</span>}
                          {activity.type === "review" && <span className="text-sm">⭐</span>}
                          {activity.type === "message" && <span className="text-sm">💬</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Activities
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-card border border-destructive/20 rounded-lg">
                    <span className="text-destructive text-lg">⚠️</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Pending Reviews</p>
                      <p className="text-xs text-muted-foreground">
                        {adminStats.pendingReviews} reviews are waiting for approval
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-destructive/20 text-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      Review
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-card border border-primary/20 rounded-lg">
                    <span className="text-primary text-lg">📈</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">High Activity</p>
                      <p className="text-xs text-muted-foreground">
                        {adminStats.activeUsers} users are currently active on the platform
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <span className="mr-1">👁️</span>
                      Monitor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
