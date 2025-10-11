"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Mock blog data
const mockBlogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Guest Posting in 2024",
    slug: "ultimate-guide-guest-posting-2024",
    excerpt:
      "Learn the latest strategies and best practices for successful guest posting campaigns that drive real results.",
    content:
      "Guest posting remains one of the most effective ways to build high-quality backlinks and establish authority in your niche. In this comprehensive guide, we'll explore the latest strategies and best practices for successful guest posting campaigns in 2024...",
    author: "Sarah Wilson",
    category: "SEO",
    status: "published",
    publishDate: "2024-01-20",
    post_modified: "2024-01-22",
    views: 2847,
    featured: true,
    tags: ["guest posting", "seo", "link building", "content marketing"],
  },
  {
    id: 2,
    title: "How to Measure Domain Authority: A Complete Analysis",
    slug: "measure-domain-authority-complete-analysis",
    excerpt: "Understanding domain authority metrics and how they impact your SEO strategy and link building efforts.",
    content:
      "Domain Authority (DA) is a crucial metric for understanding the strength and credibility of a website. In this detailed analysis, we'll break down everything you need to know about measuring and improving domain authority...",
    author: "Mike Johnson",
    category: "Analytics",
    status: "published",
    publishDate: "2024-01-18",
    post_modified: "2024-01-18",
    views: 1923,
    featured: false,
    tags: ["domain authority", "seo metrics", "analytics"],
  },
  {
    id: 3,
    title: "Link Building Strategies That Actually Work",
    slug: "link-building-strategies-that-work",
    excerpt: "Discover proven link building techniques that deliver sustainable results and avoid common pitfalls.",
    content:
      "Link building is both an art and a science. In this comprehensive guide, we'll explore proven strategies that have consistently delivered results for our clients...",
    author: "David Brown",
    category: "Link Building",
    status: "draft",
    publishDate: null,
    post_modified: "2024-01-25",
    views: 0,
    featured: false,
    tags: ["link building", "seo", "digital marketing"],
  },
  {
    id: 4,
    title: "Content Marketing ROI: How to Track and Improve Results",
    slug: "content-marketing-roi-track-improve",
    excerpt:
      "Learn how to measure the return on investment of your content marketing efforts and optimize for better results.",
    content:
      "Measuring content marketing ROI can be challenging, but it's essential for proving the value of your efforts and optimizing your strategy...",
    author: "Jane Smith",
    category: "Content Marketing",
    status: "scheduled",
    publishDate: "2024-01-30",
    post_modified: "2024-01-24",
    views: 0,
    featured: true,
    tags: ["content marketing", "roi", "analytics", "measurement"],
  },
]

interface Blogs {
  id: number,
  post_title: string,
  slug: string,
  post_excerpt: string,
  post_content: string,
  post_author: string,
  post_type: string,
  post_status: string,
  post_date : string,
  publishDate: string,
  post_modified: string,
  views: number,
  featured: string,
  tags: string[],
}

export default function BlogManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [blogPosts, setBlogPosts] = useState<Blogs[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)


  const loadPosts = async () => {
    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/posts.php", {
        method: "GET"
      });
      const storedPosts = await res.json();
      if (storedPosts) {
        const reversedPosts = storedPosts.sort((a: any, b: any) => {
          return new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
        })

        setBlogPosts(reversedPosts);

      } else {
        setBlogPosts(null)
      }
    } catch (error) {
      toast.error(`Error loading posts: ${error}`);
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  // Filter blog posts based on search and filters
  const filteredPosts = blogPosts?.filter((post: any) => {
    const matchesSearch =
      post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.post_excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.post_author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.split(',').some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || post.post_type === filterCategory
    const matchesStatus = filterStatus === "all" || post.post_status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleDeletePost = async (postId: number) => {
    if (postId) {
      try {
        const res = await fetch('http://localhost:8080/fast-rank-backend/posts-delete.php', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id : postId
          }),
        })
        const text = await res.text();
        const data = JSON.parse(text);
        if (data.status === 'success') {
          toast.success('Post Deleted Successfully');
          loadPosts();
          // window.location.reload();
        }
      } catch (error) {
        toast.error('Failed to delete this post');
      }
    }
  }

  const handleAddPost = async (formData: FormData) => {
    const post_title = formData.get("title") as string
    console.log(formData.get("featured"));
    
    const newPost = {
      post_title,
      slug: generateSlug(post_title),
      post_excerpt: formData.get("excerpt") as string,
      post_content: formData.get("content") as string,
      post_author: formData.get("author") as string,
      post_type: formData.get("category") as string,
      post_status: formData.get("status") as string,
      publishDate: formData.get("status") === "published" ? new Date().toISOString().split("T")[0] : null,
      post_date: new Date().toISOString().split("T")[0],
      post_modified: new Date().toISOString().split("T")[0],
      views: 0,
      featured: formData.get("featured") === "on" ? "on " : "off",
      tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
    }

    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/posts-add.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const text = await res.text();
      const data = JSON.parse(text);
      
      if (data.status === 'success') {
        setIsAddDialogOpen(false)
        toast.success('Post Added Successfully');
        // window.location.reload();
        loadPosts()
      } else {
        toast.error('Failed to add Post');
      }

    } catch (error) {
      toast.error(`Failed Post Adding`);
      console.error(`Failed Post Adding: ${error}`);

    }
  }

  const handleEditPost = async (formData: FormData) => {
    if (!selectedPost) return

    const post_title = formData.get("title") as string
    const updatedPosts = {
      id: selectedPost.id,
      post_title,
      slug: generateSlug(post_title),
      post_excerpt: formData.get("excerpt") as string,
      post_content: formData.get("content") as string,
      post_author: formData.get("author") as string,
      post_type: formData.get("category") as string,
      post_status: formData.get("status") as string,
      publishDate:
        formData.get("status") === "published" && !selectedPost?.publishDate
          ? new Date().toISOString().split("T")[0]
          : selectedPost.publishDate,
      post_modified: new Date().toISOString().split("T")[0],
      post_date: new Date().toISOString().split("T")[0],
      featured: formData.get("featured") === "on" ? "on" : "off",
      tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
    }
    console.log(updatedPosts);
    

    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/posts-update.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPosts),
      });


      const text = await res.text();
      console.log(text);
      
      const data = JSON.parse(text);
      console.log(data);
      if (data.status === "success") {
        toast.success('Post Updated Successfully');
        setIsEditDialogOpen(false)
        setSelectedPost(null)
        loadPosts();
      }
    } catch (error) {
      toast.error(`Error Updating Post ${error}`);

    }
  }

  const categories = ["SEO", "Link Building", "Content Marketing", "Analytics", "Digital Marketing", "Guest Posting"]

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                <p className="text-gray-600">Post, edit, and delete blog articles</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    <span className="mr-2">➕</span>
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Create New Blog Post</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Write and publish a new blog article
                    </DialogDescription>
                  </DialogHeader>
                  <form action={handleAddPost} className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-gray-700">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter blog post title"
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="excerpt" className="text-gray-700">
                        Excerpt
                      </Label>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        placeholder="Brief description of the blog post..."
                        rows={2}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content" className="text-gray-700">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Write your blog post content here..."
                        rows={8}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="author" className="text-gray-700">
                          Author
                        </Label>
                        <Input
                          id="author"
                          name="author"
                          placeholder="Author name"
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-gray-700">
                          Category
                        </Label>
                        <Select name="category" required>
                          <SelectTrigger className="bg-white border-gray-300">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="status" className="text-gray-700">
                          Status
                        </Label>
                        <Select name="status" required>
                          <SelectTrigger className="bg-white border-gray-300">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tags" className="text-gray-700">
                          Tags (comma-separated)
                        </Label>
                        <Input
                          id="tags"
                          name="tags"
                          placeholder="seo, link building, content marketing"
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="featured" name="featured" className="rounded" />
                      <Label htmlFor="featured" className="text-gray-700">
                        Featured post
                      </Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800">
                        Create Post
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Posts</p>
                      <p className="text-2xl font-bold text-gray-900">{blogPosts?.length}</p>
                    </div>
                    <span className="text-2xl">📄</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Published</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {blogPosts?.filter((p) => p.post_status === "published").length}
                      </p>
                    </div>
                    <span className="text-2xl">✅</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Drafts</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {blogPosts?.filter((p) => p.post_status === "draft").length}
                      </p>
                    </div>
                    <span className="text-2xl">📝</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {blogPosts?.reduce((acc, p) => acc + Number(p.views), 0).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-2xl">📈</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6 bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                      <Input
                        placeholder="Search posts by title, author, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-40 bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32 bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog Posts Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Blog Posts ({filteredPosts?.length})</CardTitle>
                <CardDescription className="text-gray-600">Manage all blog articles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-700">Post</TableHead>
                      <TableHead className="text-gray-700">Author</TableHead>
                      <TableHead className="text-gray-700">Category</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-gray-700">Views</TableHead>
                      <TableHead className="text-gray-700">Date</TableHead>
                      <TableHead className="text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts?.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{post.post_title}</p>
                              {post.featured == "on" || post.featured == "1" ? (
                                <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                                  Featured
                                </Badge>
                              ): ""}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.post_excerpt}</p>
                            <div className="flex flex-wrap gap-1">
                              {/* {post.tags.slice(0, 3).map((tag, index) => ( */}
                              {post.tags?.toString().split(',').slice(0, 3).map((tag: any, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              
                              {post.tags.toString().split(',').length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.toString().split(',').length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">👤</span>
                            <span className="text-sm text-gray-900">{post.post_author}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{post.post_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(post.post_status)}>{post.post_status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">📈</span>
                            <span className="text-sm text-gray-900">{post.views.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">📅</span>
                            <span className="text-sm text-gray-900">
                              {post.publishDate
                                ? new Date(post.publishDate).toLocaleDateString()
                                : new Date(post.post_modified).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedPost(post)
                                setIsViewDialogOpen(true)
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              👁️
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedPost(post)
                                setIsEditDialogOpen(true)
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              ✏️
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  🗑️
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-gray-900">Delete Blog Post</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600">
                                    Are you sure you want to delete "{post.post_title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeletePost(post.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* View Post Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Blog Post Preview</DialogTitle>
                  <DialogDescription className="text-gray-600">Preview of the blog post content</DialogDescription>
                </DialogHeader>
                {selectedPost && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedPost.post_title}</h2>
                        {selectedPost.featured == "on" || selectedPost.featured == "1" ? (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            Featured
                          </Badge>
                        ): ""}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>By {selectedPost.post_author}</span>
                        <span>•</span>
                        <span>{selectedPost.post_type}</span>
                        <span>•</span>
                        <span>
                          {selectedPost.publishDate
                            ? new Date(selectedPost.publishDate).toLocaleDateString()
                            : "Not published"}
                        </span>
                        <span>•</span>
                        <span>{selectedPost.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <Badge className={getStatusColor(selectedPost.post_status)}>{selectedPost.post_status}</Badge>
                        <Badge variant="outline">{selectedPost.post_type}</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Excerpt</h3>
                      <p className="text-gray-600">{selectedPost.post_excerpt}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Content</h3>
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap text-gray-900">{selectedPost.post_content}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.split(',').map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Edit Post Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Edit Blog Post</DialogTitle>
                  <DialogDescription className="text-gray-600">Update blog post information</DialogDescription>
                </DialogHeader>
                {selectedPost && (
                  <form action={handleEditPost} className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title" className="text-gray-700">
                        Title
                      </Label>
                      <Input
                        id="edit-title"
                        name="title"
                        defaultValue={selectedPost.post_title}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-excerpt" className="text-gray-700">
                        Excerpt
                      </Label>
                      <Textarea
                        id="edit-excerpt"
                        name="excerpt"
                        defaultValue={selectedPost.post_excerpt}
                        rows={2}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-content" className="text-gray-700">
                        Content
                      </Label>
                      <Textarea
                        id="edit-content"
                        name="content"
                        defaultValue={selectedPost.post_content}
                        rows={8}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-author" className="text-gray-700">
                          Author
                        </Label>
                        <Input
                          id="edit-author"
                          name="author"
                          defaultValue={selectedPost.post_author}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category" className="text-gray-700">
                          Category
                        </Label>
                        <Select name="category" defaultValue={selectedPost.post_type}>
                          <SelectTrigger className="bg-white border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-status" className="text-gray-700">
                          Status
                        </Label>
                        <Select name="status" defaultValue={selectedPost.post_status}>
                          <SelectTrigger className="bg-white border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-tags" className="text-gray-700">
                          Tags (comma-separated)
                        </Label>
                        <Input
                          id="edit-tags"
                          name="tags"
                          defaultValue={selectedPost.tags.split(',').join(", ")}
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-featured"
                        name="featured"
                        defaultChecked={selectedPost.featured}
                        className="rounded"
                      />
                      <Label htmlFor="edit-featured" className="text-gray-700">
                        Featured post
                      </Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditDialogOpen(false)
                          setSelectedPost(null)
                        }}
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800">
                        Update Post
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  )
}
