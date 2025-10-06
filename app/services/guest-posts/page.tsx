"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, TrendingUp, Clock, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GuestPostsPage() {
  const router = useRouter()

  const packages = [
    {
      name: "Starter Growth Package",
      price: 297,
      originalPrice: 397,
      description: "Perfect for small businesses and startups looking to build initial authority",
      features: [
        "1 High-Quality Guest Post",
        "DA 70+ Website Placement",
        "800-1000 Words",
        "2 Contextual Backlinks",
        "Social Media Promotion",
        "Publication Report",
      ],
      deliveryTime: "3-5 days",
      popular: false,
    },
    {
      name: "Professional Growth Package",
      price: 697,
      originalPrice: 897,
      description: "Ideal for growing companies that need consistent link building",
      features: [
        "3 Premium Guest Posts",
        "DA 75+ Website Placements",
        "1000-1200 Words Each",
        "3 Contextual Backlinks Per Post",
        "Enhanced Social Promotion",
        "Detailed Analytics Report",
        "Priority Support",
      ],
      deliveryTime: "5-7 days",
      popular: true,
    },
    {
      name: "Enterprise Growth Package",
      price: 1497,
      originalPrice: 1997,
      description: "Comprehensive solution for established businesses seeking maximum impact",
      features: [
        "5 Premium Guest Posts",
        "DA 80+ Website Placements",
        "1200-1500 Words Each",
        "4 Contextual Backlinks Per Post",
        "Full Social Media Campaign",
        "Comprehensive Analytics Dashboard",
        "Dedicated Account Manager",
        "Follow-up Outreach Included",
        "Monthly Strategy Call",
      ],
      deliveryTime: "7-10 days",
      popular: false,
    },
  ]

  const handleBuyNow = (pkg: (typeof packages)[0]) => {
    const checkoutUrl = `/checkout?productId=guest-post-${pkg.name.toLowerCase().replace(/\s+/g, "-")}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}&type=Guest%20Post%20Package&description=${encodeURIComponent(pkg.description)}`
    router.push(checkoutUrl)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-secondary text-secondary-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Most Popular Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Premium Guest Post Packages</h1>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Build high-quality backlinks from authoritative websites and boost your search rankings with our premium
              guest post services.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Choose Your Growth Strategy</h2>
            <p className="text-muted-foreground text-lg">
              Select the perfect growth package tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-shadow ${
                  pkg.popular ? "ring-2 ring-secondary border-secondary" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-sm">{pkg.description}</CardDescription>
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-secondary">${pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">${pkg.originalPrice}</span>
                      )}
                    </div>
                    {pkg.originalPrice && (
                      <Badge variant="outline" className="text-xs">
                        Save ${pkg.originalPrice - pkg.price}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Delivery: {pkg.deliveryTime}</span>
                  </div>

                  <Button
                    className={`w-full ${
                      pkg.popular ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "bg-transparent"
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleBuyNow(pkg)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose Our Guest Post Services?</h2>
            <p className="text-muted-foreground text-lg">We deliver results that matter for your business growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">100% White Hat SEO</h3>
              <p className="text-muted-foreground">
                All our guest posts follow Google's guidelines and best practices for sustainable rankings.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">High-Authority Websites</h3>
              <p className="text-muted-foreground">
                Get published on premium websites with DA 70+ and significant organic traffic.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Most guest posts are published within 3-7 days, ensuring quick results for your campaigns.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality Content</h3>
              <p className="text-muted-foreground">
                Professional writers create engaging, SEO-optimized content that drives results.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Detailed Reporting</h3>
              <p className="text-muted-foreground">
                Comprehensive reports with metrics, social shares, and performance data.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Money-Back Guarantee</h3>
              <p className="text-muted-foreground">
                100% satisfaction guarantee. If you're not happy, we'll provide a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Boost Your Rankings?</h2>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of businesses that have improved their search rankings with our premium guest post
              services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/marketplace">Browse All Services</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
