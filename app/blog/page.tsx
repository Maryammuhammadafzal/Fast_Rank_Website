'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"

// Update mock data to match Blogs interface
// const mockBlogPosts: Blogs = [
//   {
//     id: 1,
//     post_title: "The Complete Guide to Guest Posting in 2024",
//     slug: "guest-posting-2024",
//     post_excerpt: "Learn the latest strategies and best practices for successful guest posting campaigns that drive real results.",
//     post_content: "Detailed content here...",
//     post_author: "Sarah Johnson",
//     post_type: "SEO Strategy",
//     post_status: "published",
//     post_date: "2024-03-15",
//     publishDate: "2024-03-15",
//     post_modified: "2024-03-15",
//     views: 120,
//     featured: "on", // Changed to string
//     tags: ["guest posting", "seo"],
//   },
//   {
//     id: 2,
//     post_title: "How to Build High-Quality Backlinks That Actually Work",
//     slug: "backlinks-2024",
//     post_excerpt: "Discover proven link building techniques that improve your search rankings and drive organic traffic.",
//     post_content: "Detailed content here...",
//     post_author: "Mike Chen",
//     post_type: "Link Building",
//     post_status: "published",
//     post_date: "2024-03-12",
//     publishDate: "2024-03-12",
//     post_modified: "2024-03-12",
//     views: 95,
//     featured: "off", // Changed to string
//     tags: ["link building", "seo"],
//   },
//   // Add other mock posts similarly...
// ];

const categories = [
  "All Posts",
  "SEO Strategy",
  "Link Building",
  "Content Marketing",
  "Guest Posting",
  "SEO News",
  "Local SEO",
  "Analytics"
];

interface Blogs {
  id: number;
  post_title: string;
  post_image: string;
  slug: string;
  post_excerpt: string;
  post_content: string;
  post_author: string;
  post_type: string;
  post_status: string;
  post_date: string;
  publishDate: string;
  post_modified: string;
  views: number;
  featured: string; // Ensured as string
  tags: string[];
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<Blogs | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);

  const loadPosts = async () => {
    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/posts.php", {
        method: "GET"
      });
      const storedPosts = await res.json();
      if (storedPosts) {
        const publishedPosts = storedPosts.filter((post: Blogs) => {
          if (post.post_status === 'published' || post.post_status === 'publish')
            return post;

        })
        const reversedPosts = publishedPosts.sort((a: Blogs, b: Blogs) => {
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        });
        console.log(reversedPosts);
        setBlogPosts(reversedPosts);
      } else {
        setBlogPosts(null);
      }
    } catch (error) {
      toast.error(`Error loading posts: ${error}`);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

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

          {blogPosts && blogPosts.slice(0, 3).map((post: Blogs) => {
            return post.featured === 'on' ? (
              <Card key={post.id} className="overflow-hidden my-3 hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      loading="lazy" src={
                        post.post_image.startsWith('https://') || post.post_image.startsWith('http://')
                          ? post.post_image
                          : '/local-business-seo.png'
                        // : `/guestpost-backend/${encodeURIComponent(post.post_image)}`
                      }
                      //  alt='image'
                      // src={post.post_image || "/local-business-seo.png"}
                      alt={post.post_title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge variant="secondary" className="mb-4">
                      {post.post_type}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 text-balance">{post.post_title}</h2>
                    <p className="text-muted-foreground text-lg mb-6">{post.post_excerpt}</p>
                    <p className="text-muted-foreground text-lg mb-6">{post.post_content}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.post_author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishDate).toLocaleDateString() || "N/A"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.views}
                      </div>
                    </div>

                    <Button className="bg-brand-purple hover:bg-brand-purple/90">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : null;
          })}
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
            {blogPosts && (showAllPosts ? blogPosts : blogPosts.slice(0, 7)).map((post: Blogs) => {
              return post.featured === 'off' ? (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img
                      loading="lazy" src={
                        post.post_image.startsWith('https://') || post.post_image.startsWith('http://')
                          ? post.post_image
                          : '/local-business-seo.png'
                        // : `/guestpost-backend/${encodeURIComponent(post.post_image)}`
                      }
                      // src={post.post_image || "/placeholder.svg"}
                      alt={post.post_title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-black">{post.post_type}</Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-balance group-hover:text-brand-purple transition-colors">
                      {post.post_title}
                    </CardTitle>
                    <CardDescription className="text-base">{post.post_excerpt.slice(0, 100)}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.post_author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.views}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{new Date(post.publishDate).toLocaleDateString() || "N/A"}</span>
                      <Button variant="ghost" size="sm" className="text-brand-purple hover:text-brand-purple/80">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })}
          </div>

          {blogPosts && blogPosts.length > 7 ? (
            <div className="text-center mt-12">
              <Button onClick={() => setShowAllPosts(!showAllPosts)} variant="outline" size="lg">
                {showAllPosts ? "Show Less Articles" : "Load More Articles"}
              </Button>
            </div>
          ) : ""}
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-16 bg-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8">Get the latest SEO tips and updates delivered straight to your inbox.</p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                placeholder="Enter your email"
                className="w-full pl-10 pr-20 py-2 bg-white text-black rounded-md"
              />
              <Button className="absolute right-1 top-1 bg-white text-brand-purple hover:bg-gray-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}