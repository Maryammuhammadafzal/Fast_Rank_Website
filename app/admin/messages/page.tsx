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
import { Textarea } from "@/components/ui/textarea"

// Mock data for messages
const mockMessages = [
  {
    id: "MSG-001",
    sender: "John Doe",
    email: "john@example.com",
    subject: "Question about guest post service",
    message: "Hi, I would like to know more about your guest post service. What are the requirements for content?",
    status: "unread",
    priority: "normal",
    createdAt: "2024-01-20 10:30",
    category: "inquiry",
  },
  {
    id: "MSG-002",
    sender: "Jane Smith",
    email: "jane@example.com",
    subject: "Issue with recent order",
    message: "I placed an order last week but haven't received any updates. Can you please check the status?",
    status: "replied",
    priority: "high",
    createdAt: "2024-01-19 14:15",
    category: "support",
  },
  {
    id: "MSG-003",
    sender: "Mike Johnson",
    email: "mike@example.com",
    subject: "Partnership opportunity",
    message: "We are interested in establishing a partnership with your company. Could we schedule a call?",
    status: "read",
    priority: "low",
    createdAt: "2024-01-18 09:45",
    category: "business",
  },
]

// Mock data for reviews
const mockReviews = [
  {
    id: "REV-001",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    service: "Guest Post",
    rating: 5,
    title: "Excellent service!",
    review: "The guest post was published quickly and the quality was outstanding. Highly recommend!",
    status: "approved",
    createdAt: "2024-01-20",
    website: "techblog.com",
  },
  {
    id: "REV-002",
    customer: "David Brown",
    email: "david@example.com",
    service: "Link Insertion",
    rating: 4,
    title: "Good results",
    review: "The link was inserted naturally and the process was smooth. Good communication throughout.",
    status: "pending",
    createdAt: "2024-01-19",
    website: "healthblog.net",
  },
  {
    id: "REV-003",
    customer: "Lisa Garcia",
    email: "lisa@example.com",
    service: "Article Writing",
    rating: 2,
    title: "Could be better",
    review: "The article quality was not what I expected. Had to request several revisions.",
    status: "flagged",
    createdAt: "2024-01-18",
    website: "businessblog.org",
  },
]

export default function MessagesReviews() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("messages")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)
  const [replyText, setReplyText] = useState("")

  const getMessageStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800"
      case "read":
        return "bg-blue-100 text-blue-800"
      case "replied":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getReviewStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      case "rejected":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
        ⭐
      </span>
    ))
  }

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const unreadMessages = mockMessages.filter((msg) => msg.status === "unread").length
  const pendingReviews = mockReviews.filter((rev) => rev.status === "pending").length
  const averageRating = mockReviews.reduce((sum, rev) => sum + rev.rating, 0) / mockReviews.length
  const totalReviews = mockReviews.length

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
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Messages & Reviews</h1>
                <p className="text-gray-600">Manage customer communications and reviews</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Unread Messages</CardTitle>
                  <span className="text-gray-600">💬</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{unreadMessages}</div>
                  <p className="text-xs text-gray-600">Require attention</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Pending Reviews</CardTitle>
                  <span className="text-gray-600">⚠️</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{pendingReviews}</div>
                  <p className="text-xs text-gray-600">Awaiting approval</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Average Rating</CardTitle>
                  <span className="text-gray-600">⭐</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                  <p className="text-xs text-gray-600">Out of 5 stars</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Reviews</CardTitle>
                  <span className="text-gray-600">👍</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
                  <p className="text-xs text-gray-600">All time</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <Button
                variant={activeTab === "messages" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("messages")}
                className={activeTab === "messages" ? "bg-white text-gray-900" : "text-gray-600"}
              >
                Messages
              </Button>
              <Button
                variant={activeTab === "reviews" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("reviews")}
                className={activeTab === "reviews" ? "bg-white text-gray-900" : "text-gray-600"}
              >
                Client Reviews
              </Button>
            </div>

            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>View and reply to user messages</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <span className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground">🔍</span>
                        <Input
                          placeholder="Search messages..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <span className="h-4 w-4 mr-2 text-muted-foreground">⚙️</span>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Messages Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Message ID</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMessages.map((message) => (
                        <TableRow key={message.id}>
                          <TableCell className="font-medium">{message.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{message.sender}</div>
                              <div className="text-sm text-muted-foreground">{message.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{message.subject}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{message.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getMessageStatusColor(message.status)}>{message.status}</Badge>
                          </TableCell>
                          <TableCell>{message.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(message)}>
                                    <span className="h-4 w-4 text-gray-600">👀</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Message Details - {selectedMessage?.id}</DialogTitle>
                                    <DialogDescription>View and reply to customer message</DialogDescription>
                                  </DialogHeader>
                                  {selectedMessage && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>From</Label>
                                          <p className="text-sm">{selectedMessage.sender}</p>
                                        </div>
                                        <div>
                                          <Label>Email</Label>
                                          <p className="text-sm">{selectedMessage.email}</p>
                                        </div>
                                        <div>
                                          <Label>Subject</Label>
                                          <p className="text-sm">{selectedMessage.subject}</p>
                                        </div>
                                        <div>
                                          <Label>Date</Label>
                                          <p className="text-sm">{selectedMessage.createdAt}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Message</Label>
                                        <p className="text-sm bg-muted p-3 rounded-md">{selectedMessage.message}</p>
                                      </div>
                                      <div>
                                        <Label>Reply</Label>
                                        <Textarea
                                          placeholder="Type your reply..."
                                          value={replyText}
                                          onChange={(e) => setReplyText(e.target.value)}
                                          rows={4}
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <Button size="sm">
                                          <span className="h-4 w-4 mr-2 text-gray-600">✉️</span>
                                          Send Reply
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          <span className="h-4 w-4 mr-2 text-gray-600">👁️</span>
                                          Mark as Read
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm">
                                <span className="h-4 w-4 text-gray-600">✉️</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <span className="h-4 w-4 text-gray-600">🗑️</span>
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

            {activeTab === "reviews" && (
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                  <CardDescription>Approve, edit, or remove client reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <span className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground">🔍</span>
                        <Input
                          placeholder="Search reviews..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <span className="h-4 w-4 mr-2 text-muted-foreground">⚙️</span>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reviews Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Review ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReviews.map((review) => (
                        <TableRow key={review.id}>
                          <TableCell className="font-medium">{review.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{review.customer}</div>
                              <div className="text-sm text-muted-foreground">{review.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{review.service}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                              <span className="text-sm ml-1">({review.rating})</span>
                            </div>
                          </TableCell>
                          <TableCell>{review.title}</TableCell>
                          <TableCell>
                            <Badge className={getReviewStatusColor(review.status)}>{review.status}</Badge>
                          </TableCell>
                          <TableCell>{review.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedReview(review)}>
                                    <span className="h-4 w-4 text-gray-600">👀</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Review Details - {selectedReview?.id}</DialogTitle>
                                    <DialogDescription>Manage client review</DialogDescription>
                                  </DialogHeader>
                                  {selectedReview && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Customer</Label>
                                          <p className="text-sm">{selectedReview.customer}</p>
                                        </div>
                                        <div>
                                          <Label>Service</Label>
                                          <p className="text-sm">{selectedReview.service}</p>
                                        </div>
                                        <div>
                                          <Label>Rating</Label>
                                          <div className="flex items-center gap-1">
                                            {renderStars(selectedReview.rating)}
                                            <span className="text-sm ml-1">({selectedReview.rating}/5)</span>
                                          </div>
                                        </div>
                                        <div>
                                          <Label>Date</Label>
                                          <p className="text-sm">{selectedReview.createdAt}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Title</Label>
                                        <p className="text-sm font-medium">{selectedReview.title}</p>
                                      </div>
                                      <div>
                                        <Label>Review</Label>
                                        <p className="text-sm bg-muted p-3 rounded-md">{selectedReview.review}</p>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                          <span className="h-4 w-4 mr-2 text-white">✅</span>
                                          Approve
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          <span className="h-4 w-4 mr-2 text-gray-600">❌</span>
                                          Reject
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          <span className="h-4 w-4 mr-2 text-gray-600">✏️</span>
                                          Edit
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <span className="h-4 w-4 text-gray-600">✅</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <span className="h-4 w-4 text-gray-600">❌</span>
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
