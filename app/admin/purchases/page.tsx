"use client"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ServicePurchasesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const purchases = [
    {
      id: "SP001",
      customer: "John Doe",
      email: "john@example.com",
      service: "Premium SEO Package",
      amount: "$299.00",
      status: "completed",
      date: "2024-01-15",
      paymentMethod: "Credit Card",
    },
    {
      id: "SP002",
      customer: "Jane Smith",
      email: "jane@example.com",
      service: "Social Media Management",
      amount: "$199.00",
      status: "processing",
      date: "2024-01-14",
      paymentMethod: "PayPal",
    },
    {
      id: "SP003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      service: "Website Development",
      amount: "$1,299.00",
      status: "pending",
      date: "2024-01-13",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "SP004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      service: "Content Writing",
      amount: "$149.00",
      status: "completed",
      date: "2024-01-12",
      paymentMethod: "Credit Card",
    },
    {
      id: "SP005",
      customer: "David Brown",
      email: "david@example.com",
      service: "PPC Management",
      amount: "$399.00",
      status: "refunded",
      date: "2024-01-11",
      paymentMethod: "PayPal",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-red-100 text-red-800"
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
              <h1 className="text-3xl font-bold text-gray-900">Service Purchases</h1>
              <p className="text-gray-600 mt-2">Manage all service purchases and transactions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">$24,567</div>
                  <p className="text-xs text-green-600">+18% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">156</div>
                  <p className="text-xs text-blue-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <p className="text-xs text-yellow-600">Requires attention</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Refund Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">2.1%</div>
                  <p className="text-xs text-green-600">-0.5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Purchases Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">Recent Purchases</CardTitle>
                    <CardDescription className="text-gray-600">
                      Latest service purchases and transactions
                    </CardDescription>
                  </div>
                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent">
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Purchase ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase) => (
                        <tr key={purchase.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{purchase.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{purchase.customer}</div>
                              <div className="text-sm text-gray-600">{purchase.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-900">{purchase.service}</td>
                          <td className="py-3 px-4 font-medium text-gray-900">{purchase.amount}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(purchase.status)}>{purchase.status}</Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{purchase.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
