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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    service: "Guest Post",
    website: "techblog.com",
    amount: 150,
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2024-01-15",
    deliveryDate: "2024-01-20",
    notes: "High-quality tech article required",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    service: "Link Insertion",
    website: "healthblog.net",
    amount: 75,
    status: "in-progress",
    paymentStatus: "paid",
    createdAt: "2024-01-18",
    deliveryDate: "2024-01-25",
    notes: "Health niche, natural anchor text",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    service: "Article Writing",
    website: "businessblog.org",
    amount: 200,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2024-01-20",
    deliveryDate: "2024-01-27",
    notes: "Business strategy article, 1500 words",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    service: "Package Deal",
    website: "fashionblog.com",
    amount: 500,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2024-01-12",
    deliveryDate: "2024-01-19",
    notes: "Customer requested cancellation",
  },
]

// Mock data for services
const mockServices = [
  {
    id: "SRV-001",
    name: "Guest Post Premium",
    category: "Content Marketing",
    price: 150,
    duration: "5-7 days",
    purchases: 45,
    revenue: 6750,
    status: "active",
  },
  {
    id: "SRV-002",
    name: "Link Insertion",
    category: "SEO",
    price: 75,
    duration: "3-5 days",
    purchases: 89,
    revenue: 6675,
    status: "active",
  },
  {
    id: "SRV-003",
    name: "Article Writing",
    category: "Content Creation",
    price: 200,
    duration: "7-10 days",
    purchases: 23,
    revenue: 4600,
    status: "active",
  },
  {
    id: "SRV-004",
    name: "Basic Package",
    category: "Package",
    price: 300,
    duration: "10-14 days",
    purchases: 12,
    revenue: 3600,
    status: "inactive",
  },
]

interface Orders {
  id: string,
  customer: string,
  email: string,
  service: string,
  website: string,
  amount: number,
  status: string,
  paymentStatus: string,
  createdAt: string,
  deliveryDate: string,
  notes: string,
}

export default function OrdersManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedService, setSelectedService] = useState(null)

  const getStatusColor = (status: any) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: any) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.amount, 0)
  const completedOrders = mockOrders.filter((order) => order.status === "completed").length
  const pendingOrders = mockOrders.filter((order) => order.status === "pending").length
  const totalServices = mockServices.length

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders & Services</h1>
                <p className="text-gray-600">Manage orders and track service performance</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                  <span className="mr-2">📥</span>
                  Export
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                  <span className="mr-2">🔄</span>
                  Refresh
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
                  <span className="text-gray-600">💰</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Completed Orders</CardTitle>
                  <span className="text-gray-600">✅</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{completedOrders}</div>
                  <p className="text-xs text-gray-600">+8% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Pending Orders</CardTitle>
                  <span className="text-gray-600">⏰</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{pendingOrders}</div>
                  <p className="text-xs text-gray-600">-2% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Active Services</CardTitle>
                  <span className="text-gray-600">📦</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{totalServices}</div>
                  <p className="text-xs text-gray-600">+1 new this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("orders")}
                className={activeTab === "orders" ? "bg-white text-gray-900" : "text-gray-600"}
              >
                Orders Management
              </Button>
              <Button
                variant={activeTab === "services" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("services")}
                className={activeTab === "services" ? "bg-white text-gray-900" : "text-gray-600"}
              >
                Service Purchases
              </Button>
            </div>

            {activeTab === "orders" && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Orders Management</CardTitle>
                  <CardDescription className="text-gray-600">View and manage all customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
                        <Input
                          placeholder="Search orders..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px] bg-white border-gray-300">
                        <span className="mr-2">🔽</span>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Orders Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-700">Order ID</TableHead>
                        <TableHead className="text-gray-700">Customer</TableHead>
                        <TableHead className="text-gray-700">Service</TableHead>
                        <TableHead className="text-gray-700">Website</TableHead>
                        <TableHead className="text-gray-700">Amount</TableHead>
                        <TableHead className="text-gray-700">Status</TableHead>
                        <TableHead className="text-gray-700">Payment</TableHead>
                        <TableHead className="text-gray-700">Delivery Date</TableHead>
                        <TableHead className="text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{order.customer}</div>
                              <div className="text-sm text-gray-600">{order.email}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-900">{order.service}</TableCell>
                          <TableCell className="text-gray-900">{order.website}</TableCell>
                          <TableCell className="text-gray-900">${order.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>{order.status.replace("-", " ")}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                          </TableCell>
                          <TableCell className="text-gray-900">{order.deliveryDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedOrder(order)}
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    👁️
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl bg-white">
                                  <DialogHeader>
                                    <DialogTitle className="text-gray-900">
                                      Order Details - {selectedOrder?.id}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                      Complete order information and management
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedOrder && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-gray-700">Customer</Label>
                                          <p className="text-sm text-gray-900">{selectedOrder.customer}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Email</Label>
                                          <p className="text-sm text-gray-900">{selectedOrder.email}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Service</Label>
                                          <p className="text-sm text-gray-900">{selectedOrder.service}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Website</Label>
                                          <p className="text-sm text-gray-900">{selectedOrder.website}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Amount</Label>
                                          <p className="text-sm text-gray-900">${selectedOrder.amount}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Status</Label>
                                          <Badge className={getStatusColor(selectedOrder.status)}>
                                            {selectedOrder.status.replace("-", " ")}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label className="text-gray-700">Notes</Label>
                                        <p className="text-sm text-gray-900">{selectedOrder.notes}</p>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                                          Update Status
                                        </Button>
                                        <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                                          Send Message
                                        </Button>
                                        <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                                          Download Invoice
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                ✏️
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                🗑️
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeTab === "services" && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Service Purchases</CardTitle>
                  <CardDescription className="text-gray-600">Track service performance and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-700">Service ID</TableHead>
                        <TableHead className="text-gray-700">Service Name</TableHead>
                        <TableHead className="text-gray-700">Category</TableHead>
                        <TableHead className="text-gray-700">Price</TableHead>
                        <TableHead className="text-gray-700">Duration</TableHead>
                        <TableHead className="text-gray-700">Purchases</TableHead>
                        <TableHead className="text-gray-700">Revenue</TableHead>
                        <TableHead className="text-gray-700">Status</TableHead>
                        <TableHead className="text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium text-gray-900">{service.id}</TableCell>
                          <TableCell className="text-gray-900">{service.name}</TableCell>
                          <TableCell className="text-gray-900">{service.category}</TableCell>
                          <TableCell className="text-gray-900">${service.price}</TableCell>
                          <TableCell className="text-gray-900">{service.duration}</TableCell>
                          <TableCell className="text-gray-900">{service.purchases}</TableCell>
                          <TableCell className="text-gray-900">${service.revenue.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                service.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {service.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedService(service)}
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    👁️
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white">
                                  <DialogHeader>
                                    <DialogTitle className="text-gray-900">
                                      Service Details - {selectedService?.name}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                      Service performance and management
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedService && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-gray-700">Service Name</Label>
                                          <p className="text-sm text-gray-900">{selectedService.name}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Category</Label>
                                          <p className="text-sm text-gray-900">{selectedService.category}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Price</Label>
                                          <p className="text-sm text-gray-900">${selectedService.price}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Duration</Label>
                                          <p className="text-sm text-gray-900">{selectedService.duration}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Total Purchases</Label>
                                          <p className="text-sm text-gray-900">{selectedService.purchases}</p>
                                        </div>
                                        <div>
                                          <Label className="text-gray-700">Total Revenue</Label>
                                          <p className="text-sm text-gray-900">
                                            ${selectedService.revenue.toLocaleString()}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                                          Edit Service
                                        </Button>
                                        <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                                          View Analytics
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                ✏️
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
