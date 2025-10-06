"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
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
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  url: string
  da: number
  dr: number
  monthly_traffic: string
  delivery_time: string
  description: string
  category: string
  status: string
  price: number
  created_at: string
  updated_at: string
}

export default function ProductsManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const { toast } = useToast()

  const supabase = createClient()

  const fetchProducts = async () => {
    try {
      console.log("[v0] Starting to fetch products...")
      setLoading(true)

      console.log("[v0] Supabase client created, attempting to fetch from products table...")
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      console.log("[v0] Supabase response:", { data, error })

      if (error) {
        console.log("[v0] Supabase error details:", error)
        throw error
      }

      console.log("[v0] Successfully fetched products:", data?.length || 0)
      setProducts(data || [])
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
      toast({
        title: "Database Error",
        description: "The products table doesn't exist yet. Please run the database setup scripts first.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    const matchesStatus = filterStatus === "all" || product.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDAColor = (da: number) => {
    if (da >= 90) return "text-green-600 font-semibold"
    if (da >= 70) return "text-blue-600 font-semibold"
    if (da >= 50) return "text-orange-600 font-semibold"
    return "text-red-600 font-semibold"
  }

  const getDRColor = (dr: number) => {
    if (dr >= 90) return "text-green-600 font-semibold"
    if (dr >= 70) return "text-blue-600 font-semibold"
    if (dr >= 50) return "text-orange-600 font-semibold"
    return "text-red-600 font-semibold"
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", productId)

      if (error) throw error

      setProducts(products.filter((product) => product.id !== productId))
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddProduct = async (formData: FormData) => {
    try {
      const productData = {
        name: formData.get("name") as string,
        url: formData.get("url") as string,
        da: Number.parseInt(formData.get("da") as string),
        dr: Number.parseInt(formData.get("dr") as string),
        delivery_time: formData.get("deliveryTime") as string,
        monthly_traffic: formData.get("monthlyTraffic") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        status: "active",
        price: Number.parseInt(formData.get("price") as string),
      }

      const { data, error } = await supabase.from("products").insert([productData]).select()

      if (error) throw error

      if (data && data[0]) {
        setProducts([data[0], ...products])
        toast({
          title: "Success",
          description: "Product added successfully.",
        })
      }
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditProduct = async (formData: FormData) => {
    if (!selectedProduct) return

    try {
      const productData = {
        name: formData.get("name") as string,
        url: formData.get("url") as string,
        da: Number.parseInt(formData.get("da") as string),
        dr: Number.parseInt(formData.get("dr") as string),
        delivery_time: formData.get("deliveryTime") as string,
        monthly_traffic: formData.get("monthlyTraffic") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        status: formData.get("status") as string,
        price: Number.parseInt(formData.get("price") as string),
      }

      const { data, error } = await supabase.from("products").update(productData).eq("id", selectedProduct.id).select()

      if (error) throw error

      if (data && data[0]) {
        setProducts(products.map((product) => (product.id === selectedProduct.id ? data[0] : product)))
        toast({
          title: "Success",
          description: "Product updated successfully.",
        })
      }

      setIsEditDialogOpen(false)
      setSelectedProduct(null)
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const categories = [
    "Technology",
    "Business",
    "Health",
    "Finance",
    "Lifestyle",
    "Education",
    "Sports",
    "Entertainment",
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 lg:ml-64 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading products...</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
                <p className="text-gray-600">Add & manage websites (DA, DR, Traffic, Delivery Time)</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    <span className="mr-2">+</span>
                    Add Website
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Add New Website</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Add a new website to your product catalog
                    </DialogDescription>
                  </DialogHeader>
                  <form action={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">
                          Website Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="e.g., TechCrunch"
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="url" className="text-gray-700">
                          Website URL
                        </Label>
                        <Input
                          id="url"
                          name="url"
                          type="url"
                          placeholder="https://example.com"
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="da" className="text-gray-700">
                          Domain Authority (DA)
                        </Label>
                        <Input
                          id="da"
                          name="da"
                          type="number"
                          min="1"
                          max="100"
                          placeholder="85"
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dr" className="text-gray-700">
                          Domain Rating (DR)
                        </Label>
                        <Input
                          id="dr"
                          name="dr"
                          type="number"
                          min="1"
                          max="100"
                          placeholder="82"
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price" className="text-gray-700">
                          Price ($)
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="1"
                          placeholder="500"
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="deliveryTime" className="text-gray-700">
                          Delivery Time
                        </Label>
                        <Input
                          id="deliveryTime"
                          name="deliveryTime"
                          placeholder="3-5 days"
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="monthlyTraffic" className="text-gray-700">
                          Monthly Traffic
                        </Label>
                        <Input
                          id="monthlyTraffic"
                          name="monthlyTraffic"
                          placeholder="15M"
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
                    <div>
                      <Label htmlFor="description" className="text-gray-700">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Brief description of the website and its audience..."
                        rows={3}
                        required
                        className="bg-white border-gray-300"
                      />
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
                        Add Website
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
                      <p className="text-sm font-medium text-gray-600">Total Websites</p>
                      <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                    <span className="text-2xl">🌐</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Websites</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {products.filter((w) => w.status === "active").length}
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
                      <p className="text-sm font-medium text-gray-600">Avg DA Score</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {products.length > 0
                          ? Math.round(products.reduce((acc, w) => acc + w.da, 0) / products.length)
                          : 0}
                      </p>
                    </div>
                    <span className="text-2xl">📈</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Price</p>
                      <p className="text-2xl font-bold text-gray-900">
                        $
                        {products.length > 0
                          ? Math.round(products.reduce((acc, w) => acc + w.price, 0) / products.length)
                          : 0}
                      </p>
                    </div>
                    <span className="text-2xl">💰</span>
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
                        placeholder="Search websites by name, URL, or category..."
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Websites ({filteredProducts.length})</CardTitle>
                <CardDescription className="text-gray-600">Manage all websites in your product catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-700">Website</TableHead>
                      <TableHead className="text-gray-700">DA/DR</TableHead>
                      <TableHead className="text-gray-700">Traffic</TableHead>
                      <TableHead className="text-gray-700">Delivery</TableHead>
                      <TableHead className="text-gray-700">Price</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-gray-600">
                                🔗
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600">{product.url}</p>
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">DA:</span>
                              <span className={getDAColor(product.da)}>{product.da}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">DR:</span>
                              <span className={getDRColor(product.dr)}>{product.dr}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">📈</span>
                            <span className="font-medium text-gray-900">{product.monthly_traffic}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">⏰</span>
                            <span className="text-sm text-gray-900">{product.delivery_time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-900">${product.price}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(product)
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
                                setSelectedProduct(product)
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
                                  <AlertDialogTitle className="text-gray-900">Delete Website</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600">
                                    Are you sure you want to delete {product.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteProduct(product.id)}
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

            {/* View Product Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Website Details</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Complete information about the website
                  </DialogDescription>
                </DialogHeader>
                {selectedProduct && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🌐</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h3>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-600">
                            🔗
                          </Button>
                        </div>
                        <p className="text-gray-600 mb-2">{selectedProduct.url}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{selectedProduct.category}</Badge>
                          <Badge className={getStatusColor(selectedProduct.status)}>{selectedProduct.status}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Domain Authority</Label>
                          <p className={`text-2xl font-bold ${getDAColor(selectedProduct.da)}`}>{selectedProduct.da}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Monthly Traffic</Label>
                          <p className="text-lg font-semibold text-gray-900">{selectedProduct.monthly_traffic}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Added Date</Label>
                          <p className="text-sm text-gray-900">
                            {new Date(selectedProduct.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Domain Rating</Label>
                          <p className={`text-2xl font-bold ${getDRColor(selectedProduct.dr)}`}>{selectedProduct.dr}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Delivery Time</Label>
                          <p className="text-lg font-semibold text-gray-900">{selectedProduct.delivery_time}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Price</Label>
                          <p className="text-lg font-semibold text-gray-900">${selectedProduct.price}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Description</Label>
                      <p className="text-sm mt-1 text-gray-900">{selectedProduct.description}</p>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Edit Product Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Edit Website</DialogTitle>
                  <DialogDescription className="text-gray-600">Update website information</DialogDescription>
                </DialogHeader>
                {selectedProduct && (
                  <form action={handleEditProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-name" className="text-gray-700">
                          Website Name
                        </Label>
                        <Input
                          id="edit-name"
                          name="name"
                          defaultValue={selectedProduct.name}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-url" className="text-gray-700">
                          Website URL
                        </Label>
                        <Input
                          id="edit-url"
                          name="url"
                          type="url"
                          defaultValue={selectedProduct.url}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-da" className="text-gray-700">
                          Domain Authority (DA)
                        </Label>
                        <Input
                          id="edit-da"
                          name="da"
                          type="number"
                          min="1"
                          max="100"
                          defaultValue={selectedProduct.da}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-dr" className="text-gray-700">
                          Domain Rating (DR)
                        </Label>
                        <Input
                          id="edit-dr"
                          name="dr"
                          type="number"
                          min="1"
                          max="100"
                          defaultValue={selectedProduct.dr}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-price" className="text-gray-700">
                          Price ($)
                        </Label>
                        <Input
                          id="edit-price"
                          name="price"
                          type="number"
                          min="1"
                          defaultValue={selectedProduct.price}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-deliveryTime" className="text-gray-700">
                          Delivery Time
                        </Label>
                        <Input
                          id="edit-deliveryTime"
                          name="deliveryTime"
                          defaultValue={selectedProduct.delivery_time}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-monthlyTraffic" className="text-gray-700">
                          Monthly Traffic
                        </Label>
                        <Input
                          id="edit-monthlyTraffic"
                          name="monthlyTraffic"
                          defaultValue={selectedProduct.monthly_traffic}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category" className="text-gray-700">
                          Category
                        </Label>
                        <Select name="category" defaultValue={selectedProduct.category}>
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
                    <div>
                      <Label htmlFor="edit-status" className="text-gray-700">
                        Status
                      </Label>
                      <Select name="status" defaultValue={selectedProduct.status}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-description" className="text-gray-700">
                        Description
                      </Label>
                      <Textarea
                        id="edit-description"
                        name="description"
                        defaultValue={selectedProduct.description}
                        rows={3}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditDialogOpen(false)
                          setSelectedProduct(null)
                        }}
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800">
                        Update Website
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
