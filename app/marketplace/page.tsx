"use client"

import { useState, useEffect } from "react"
// import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, ExternalLink, TrendingUp, X, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  url: string
  da: number
  dr: number
  traffic: string
  delivery: string
  description: string
  category: string
  status: string
  standardPrice: number
  created_at: string
  updated_at: string
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [daRange, setDaRange] = useState([0, 100])
  const [trafficFilter, setTrafficFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")


  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/fast-rank-backend/websites.php', {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const sortedWebsites = data?.data.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        });
        
        setProducts(sortedWebsites || [])
        setLoading(false)
      }
    } catch (error) {
      console.error("fetching products:", error)
      toast.error("The products table doesn't exist yet. Please run the database setup scripts first.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchProducts()
    // const productsData = [
    //   {
    //     id: 1,
    //     name: "TechVerse Blog",
    //     url: "https://www.techverseblog.com",
    //     da: 58,
    //     dr: 62,
    //     traffic: "120K",
    //     delivery: "2 days",
    //     description: "A high-authority technology blog covering AI, gadgets, and web development trends.",
    //     category: "Technology",
    //     status: "active",
    //     price: 149,
    //     created_at: "2025-09-01T10:30:00Z",
    //     updated_at: "2025-10-05T12:00:00Z"
    //   },
    //   {
    //     id: "p2",
    //     name: "HealthyBite",
    //     url: "https://www.healthybite.co.uk",
    //     da: 45,
    //     dr: 48,
    //     traffic: "85K",
    //     delivery: "3 days",
    //     description: "A health and wellness site focused on nutrition tips, fitness guides, and organic recipes.",
    //     category: "Health",
    //     status: "active",
    //     price: 120,
    //     created_at: "2025-08-22T09:00:00Z",
    //     updated_at: "2025-09-15T14:20:00Z"
    //   },
    //   {
    //     id: "p3",
    //     name: "StyleVista",
    //     url: "https://www.stylevista.com",
    //     da: 52,
    //     dr: 57,
    //     traffic: "97K",
    //     delivery: "1 day",
    //     description: "A fashion and lifestyle magazine showcasing modern trends, designer interviews, and beauty advice.",
    //     category: "Fashion",
    //     status: "active",
    //     price: 135,
    //     created_at: "2025-09-10T08:00:00Z",
    //     updated_at: "2025-09-25T11:15:00Z"
    //   },
    //   {
    //     id: "p4",
    //     name: "EcoTraveller",
    //     url: "https://www.ecotraveller.net",
    //     da: 61,
    //     dr: 66,
    //     traffic: "140K",
    //     delivery: "4 days",
    //     description: "A sustainable travel platform promoting eco-friendly destinations and responsible tourism.",
    //     category: "Travel",
    //     status: "active",
    //     price: 160,
    //     created_at: "2025-07-18T13:10:00Z",
    //     updated_at: "2025-10-01T10:45:00Z"
    //   },
    //   {
    //     id: "p5",
    //     name: "CryptoInsights",
    //     url: "https://www.cryptocurrencyinsights.io",
    //     da: 68,
    //     dr: 72,
    //     traffic: "210K",
    //     delivery: "2 days",
    //     description: "A blockchain and crypto analysis platform delivering latest updates, project reviews, and market insights.",
    //     category: "Finance",
    //     status: "active",
    //     price: 180,
    //     created_at: "2025-08-05T09:45:00Z",
    //     updated_at: "2025-09-30T16:30:00Z"
    //   }
    // ]
    // setProducts(productsData)
  }, [])



  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))]

  const parseTraffic = (traffic: string): number => {
    const cleaned = traffic.toLowerCase().replace(/[^0-9.kmb]/g, "")
    const num = Number.parseFloat(cleaned)
    if (traffic.toLowerCase().includes("m")) return num * 1000000
    if (traffic.toLowerCase().includes("k")) return num * 1000
    if (traffic.toLowerCase().includes("b")) return num * 1000000000
    return num
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.standardPrice >= priceRange[0] && product.standardPrice <= priceRange[1]
      const matchesDA = product.da >= daRange[0] && product.da <= daRange[1]

      // Traffic filter logic
      let matchesTraffic = true
      if (trafficFilter !== "all") {
        const traffic = parseTraffic(product.traffic)
        switch (trafficFilter) {
          case "low":
            matchesTraffic = traffic < 100000
            break
          case "medium":
            matchesTraffic = traffic >= 100000 && traffic < 1000000
            break
          case "high":
            matchesTraffic = traffic >= 1000000 && traffic < 10000000
            break
          case "very-high":
            matchesTraffic = traffic >= 10000000
            break
        }
      }

      return matchesSearch && matchesCategory && matchesPrice && matchesDA && matchesTraffic
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.standardPrice - b.standardPrice
        case "price-high":
          return b.standardPrice - a.standardPrice
        case "da-high":
          return b.da - a.da
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  const maxPrice = products.length > 0 ? Math.max(...products.map((p) => p.standardPrice)) : 2000

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([0, maxPrice])
    }
  }, [products, maxPrice])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setPriceRange([0, maxPrice])
    setDaRange([0, 100])
    setTrafficFilter("all")
    setSortBy("newest")
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "all" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== maxPrice ||
    daRange[0] !== 0 ||
    daRange[1] !== 100 ||
    trafficFilter !== "all"

  const router = useRouter()

  const handleBuyNow = (product: Product) => {
    const checkoutUrl = `/checkout?productId=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.standardPrice}&type=${encodeURIComponent(product.category)}&description=${encodeURIComponent(product.description)}`
    router.push(checkoutUrl)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl font-bold">Marketplace</h1>
              <p className="text-primary-foreground/80 text-lg">
                Discover premium guest posting and SEO services from trusted providers
              </p>
            </div>
          </div>
        </section>
        <div className="container px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-muted-foreground">Loading products...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold">Marketplace</h1>
            <p className="text-primary-foreground/80 text-lg">
              Discover premium guest posting and SEO services from trusted providers
            </p>
            <Badge variant="secondary" className="text-sm px-4 py-1">
              {products.length} Active Websites Available
            </Badge>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Services</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={maxPrice}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Domain Authority (DA)</label>
                  <div className="px-2">
                    <Slider value={daRange} onValueChange={setDaRange} max={100} min={0} step={5} className="w-full" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>DA {daRange[0]}</span>
                    <span>DA {daRange[1]}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Monthly Traffic</label>
                  <Select value={trafficFilter} onValueChange={setTrafficFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Traffic Levels</SelectItem>
                      <SelectItem value="low">Low (&lt; 100K)</SelectItem>
                      <SelectItem value="medium">Medium (100K - 1M)</SelectItem>
                      <SelectItem value="high">High (1M - 10M)</SelectItem>
                      <SelectItem value="very-high">Very High (10M+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="da-high">Highest DA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Service" : "Services"} Found
              </h2>
              {hasActiveFilters && (
                <Badge variant="outline" className="text-xs">
                  Filters Active
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    {product.da >= 90 && (
                      <div className="pt-4 px-4">
                        <Badge className="bg-secondary text-secondary-foreground">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          High DA
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-secondary">{product.da}</div>
                        <div className="text-muted-foreground">DA</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-secondary">{product.dr}</div>
                        <div className="text-muted-foreground">DR</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-secondary">{product.traffic}</div>
                        <div className="text-muted-foreground">Traffic</div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">Delivery: {product.delivery}</div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-secondary">${product.standardPrice}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleBuyNow(product)}
                          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                        <Link href={`${product.url}`}>
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-2">No services found matching your criteria.</div>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
