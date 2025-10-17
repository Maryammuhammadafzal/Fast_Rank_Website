import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Guest Posting in 2024",
    excerpt:
      "Learn the latest strategies and best practices for successful guest posting campaigns that drive real results.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "SEO Strategy",
    image: "/guest-posting-guide.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "How to Build High-Quality Backlinks That Actually Work",
    excerpt: "Discover proven link building techniques that improve your search rankings and drive organic traffic.",
    author: "Mike Chen",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "Link Building",
    image: "/backlink-building.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Content Marketing ROI: Measuring What Matters",
    excerpt: "Learn how to track and measure the success of your content marketing efforts with actionable metrics.",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Content Marketing",
    image: "/content-marketing-analytics.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "SEO Trends to Watch in 2024",
    excerpt: "Stay ahead of the curve with the latest SEO trends and algorithm updates that will shape search in 2024.",
    author: "David Park",
    date: "March 8, 2024",
    readTime: "5 min read",
    category: "SEO News",
    image: "/seo-trends-2024.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "The Art of Writing Compelling Guest Post Pitches",
    excerpt: "Master the art of crafting irresistible guest post pitches that get accepted by top-tier publications.",
    author: "Lisa Thompson",
    date: "March 5, 2024",
    readTime: "4 min read",
    category: "Guest Posting",
    image: "/email-pitch-writing.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Local SEO: Dominating Your Geographic Market",
    excerpt: "Complete guide to local SEO strategies that help businesses dominate their local search results.",
    author: "James Wilson",
    date: "March 3, 2024",
    readTime: "9 min read",
    category: "Local SEO",
    image: "/local-business-seo.png",
    featured: false,
  },
]

const categories = [
  "All Posts",
  "SEO Strategy",
  "Link Building",
  "Content Marketing",
  "Guest Posting",
  "SEO News",
  "Local SEO",
];

interface Blogs {
  id: number,
  post_title: string,
  slug: string,
  post_excerpt: string,
  post_content: string,
  post_author: string,
  post_type: string,
  post_status: string,
  post_date: string,
  publishDate: string,
  post_modified: string,
  views: number,
  featured: string,
  tags: string[],
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-brand-purple text-white mx-0 my-px py-px px-0 text-left">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-justify">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">SEO & Marketing Blog</h1>
            <p className="text-xl md:text-2xl text-white/90 text-balance mb-8">
              Expert insights, strategies, and tips to help you dominate search rankings and grow your online presence.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Search articles..." className="pl-10 bg-white text-black pt-0 text-left" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All Posts" ? "default" : "outline"}
                size="sm"
                className={category === "All Posts" ? "bg-brand-purple hover:bg-brand-purple/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Badge className="bg-brand-cyan text-black font-semibold">Featured Article</Badge>
          </div>

          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge variant="secondary" className="mb-4">
                      {post.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 text-balance">{post.title}</h2>
                    <p className="text-muted-foreground text-lg mb-6">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <Button className="bg-brand-purple hover:bg-brand-purple/90">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest SEO strategies and industry insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-black">{post.category}</Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-balance group-hover:text-brand-purple transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm" className="text-brand-purple hover:text-brand-purple/80">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      

      <Footer />
    </div>
  )
}
