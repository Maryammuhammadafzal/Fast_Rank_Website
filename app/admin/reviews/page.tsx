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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ClientReviewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const reviews = [
    {
      id: 1,
      client: "John Doe",
      email: "john@example.com",
      service: "Premium SEO Package",
      rating: 5,
      title: "Excellent service and results!",
      comment:
        "The SEO team delivered outstanding results. Our website traffic increased by 150% in just 3 months. Highly recommended!",
      date: "2024-01-15",
      status: "published",
      helpful: 12,
    },
    {
      id: 2,
      client: "Jane Smith",
      email: "jane@example.com",
      service: "Social Media Management",
      rating: 4,
      title: "Great social media strategy",
      comment:
        "Professional team with creative ideas. Our social media engagement improved significantly. Minor delays in communication but overall satisfied.",
      date: "2024-01-14",
      status: "published",
      helpful: 8,
    },
    {
      id: 3,
      client: "Mike Johnson",
      email: "mike@example.com",
      service: "Website Development",
      rating: 5,
      title: "Amazing website design",
      comment:
        "They created a beautiful, responsive website that perfectly represents our brand. The development process was smooth and professional.",
      date: "2024-01-13",
      status: "pending",
      helpful: 0,
    },
    {
      id: 4,
      client: "Sarah Wilson",
      email: "sarah@example.com",
      service: "Content Writing",
      rating: 3,
      title: "Good content but room for improvement",
      comment:
        "The content quality was decent but took longer than expected. Some revisions were needed to match our brand voice.",
      date: "2024-01-12",
      status: "published",
      helpful: 5,
    },
    {
      id: 5,
      client: "David Brown",
      email: "david@example.com",
      service: "PPC Management",
      rating: 2,
      title: "Disappointing results",
      comment:
        "The PPC campaign didn't deliver the expected ROI. Communication was poor and reporting was inconsistent.",
      date: "2024-01-11",
      status: "hidden",
      helpful: 2,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "hidden":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600"
    if (rating >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Client Reviews</h1>
              <p className="text-gray-600 mt-2">Manage and moderate client feedback and reviews</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <p className="text-xs text-blue-600">+8 this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">4.2</div>
                  <p className="text-xs text-green-600">⭐⭐⭐⭐☆</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">5-Star Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">78</div>
                  <p className="text-xs text-green-600">61% of total</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <p className="text-xs text-yellow-600">Needs moderation</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">94%</div>
                  <p className="text-xs text-green-600">Excellent</p>
                </CardContent>
              </Card>
            </div>

            {/* Reviews List */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">Recent Reviews</CardTitle>
                    <CardDescription className="text-gray-600">Latest client feedback and reviews</CardDescription>
                  </div>
                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent">
                    Export Reviews
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {review.client
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{review.client}</h3>
                            <p className="text-sm text-gray-600">{review.email}</p>
                            <p className="text-sm text-gray-600">{review.service}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`text-lg ${getRatingColor(review.rating)}`}>
                              {getRatingStars(review.rating)}
                            </span>
                            <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{review.date}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">👍 {review.helpful} people found this helpful</span>
                        </div>
                        <div className="flex space-x-2">
                          {review.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                              >
                                Reply
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white border-gray-200">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900">Reply to Review</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                  Respond to {review.client}'s review
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Write your response..."
                                  className="border-gray-200 min-h-[100px]"
                                />
                                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">Send Reply</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            Edit
                          </Button>
                        </div>
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
