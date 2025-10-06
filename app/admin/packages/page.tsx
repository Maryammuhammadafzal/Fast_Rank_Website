"use client"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function PackageManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const packages = [
    {
      id: 1,
      name: "Basic SEO Package",
      description: "Essential SEO services for small businesses",
      price: "$99",
      duration: "1 month",
      features: ["Keyword Research", "On-page SEO", "Basic Analytics"],
      status: "active",
      sales: 45,
    },
    {
      id: 2,
      name: "Premium SEO Package",
      description: "Comprehensive SEO solution for growing businesses",
      price: "$299",
      duration: "3 months",
      features: ["Advanced Keyword Research", "Technical SEO", "Link Building", "Monthly Reports"],
      status: "active",
      sales: 23,
    },
    {
      id: 3,
      name: "Enterprise SEO Package",
      description: "Full-scale SEO management for large organizations",
      price: "$799",
      duration: "6 months",
      features: ["Complete SEO Audit", "Custom Strategy", "Dedicated Manager", "24/7 Support"],
      status: "active",
      sales: 8,
    },
    {
      id: 4,
      name: "Social Media Starter",
      description: "Basic social media management package",
      price: "$149",
      duration: "1 month",
      features: ["Content Creation", "Post Scheduling", "Basic Analytics"],
      status: "draft",
      sales: 0,
    },
    {
      id: 5,
      name: "Website Maintenance",
      description: "Monthly website maintenance and updates",
      price: "$199",
      duration: "1 month",
      features: ["Security Updates", "Content Updates", "Performance Monitoring"],
      status: "paused",
      sales: 12,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "paused":
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
                  <p className="text-gray-600 mt-2">Create and manage service packages</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-900 text-white hover:bg-gray-800">Create Package</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border-gray-200">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900">Create New Package</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Add a new service package to your offerings
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">
                          Package Name
                        </Label>
                        <Input id="name" placeholder="Enter package name" className="border-gray-200" />
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-gray-700">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Enter package description"
                          className="border-gray-200"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price" className="text-gray-700">
                            Price
                          </Label>
                          <Input id="price" placeholder="$0.00" className="border-gray-200" />
                        </div>
                        <div>
                          <Label htmlFor="duration" className="text-gray-700">
                            Duration
                          </Label>
                          <Input id="duration" placeholder="1 month" className="border-gray-200" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="features" className="text-gray-700">
                          Features
                        </Label>
                        <Textarea
                          id="features"
                          placeholder="List package features (one per line)"
                          className="border-gray-200"
                        />
                      </div>
                      <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">Create Package</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <p className="text-xs text-blue-600">3 active packages</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">88</div>
                  <p className="text-xs text-green-600">+15% this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">$18,456</div>
                  <p className="text-xs text-green-600">+22% this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Best Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">Basic SEO</div>
                  <p className="text-xs text-purple-600">45 sales</p>
                </CardContent>
              </Card>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-900">{pkg.name}</CardTitle>
                      <Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge>
                    </div>
                    <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{pkg.price}</span>
                        <span className="text-sm text-gray-600">{pkg.duration}</span>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">Sales:</span>
                          <span className="font-medium text-gray-900">{pkg.sales}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
