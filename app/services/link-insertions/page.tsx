"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, LinkIcon, Clock, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LinkInsertionsPage() {
  const router = useRouter()

  const packages = [
    {
      name: "Basic Link Insertion",
      price: 47,
      originalPrice: null,
      description: "Single link insertion in existing high-DA content",
      features: [
        "1 Link Insertion",
        "DA 60+ Website",
        "Existing Article Placement",
        "Contextual Link Integration",
        "Publication Report",
        "24-48 Hour Delivery",
      ],
      deliveryTime: "1-2 days",
      popular: false,
    },
    {
      name: "Multi-Link Package",
      price: 127,
      originalPrice: 177,
      description: "Multiple link insertions for broader reach",
      features: [
        "3 Link Insertions",
        "DA 65+ Websites",
        "Diverse Niche Coverage",
        "Natural Link Placement",
        "Detailed Analytics Report",
        "Priority Processing",
        "Quality Guarantee",
      ],
      deliveryTime: "2-3 days",
      popular: true,
    },
    {
      name: "Premium Link Campaign",
      price: 297,
      originalPrice: 397,
      description: "Comprehensive link insertion campaign",
      features: [
        "5 Premium Link Insertions",
        "DA 70+ Websites",
        "Strategic Anchor Text Variation",
        "Competitor Analysis",
        "Monthly Performance Tracking",
        "Link Velocity Optimization",
        "Dedicated Account Manager",
        "Custom Strategy Report",
      ],
      deliveryTime: "3-5 days",
      popular: false,
    },
  ]

  const handleBuyNow = (pkg: (typeof packages)[0]) => {
    const checkoutUrl = `/checkout?productId=link-insertion-${pkg.name.toLowerCase().replace(/\s+/g, "-")}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}&type=Link%20Insertion&description=${encodeURIComponent(pkg.description)}`
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
              <LinkIcon className="h-3 w-3 mr-1" />
              Link Building Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">High-Quality Link Insertions</h1>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Insert your links into existing high-DA articles for quick, effective link building that boosts your
              search rankings.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Link Insertion Packages</h2>
            <p className="text-muted-foreground text-lg">
              Fast and effective link building solutions for immediate SEO impact
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
                    Order Now
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
            <h2 className="text-3xl font-bold">Why Choose Link Insertions?</h2>
            <p className="text-muted-foreground text-lg">
              Fast, effective, and cost-efficient way to build high-quality backlinks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Links are inserted into existing articles, providing immediate SEO benefits within 24-48 hours.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">High-Authority Sites</h3>
              <p className="text-muted-foreground">
                All link insertions are placed on websites with DA 60+ and established organic traffic.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <LinkIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Natural Integration</h3>
              <p className="text-muted-foreground">
                Links are contextually integrated into existing content for maximum SEO value and naturalness.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Cost-Effective</h3>
              <p className="text-muted-foreground">
                More affordable than guest posts while still providing high-quality backlinks from authority sites.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                All link insertions are manually reviewed to ensure quality and compliance with SEO best practices.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Detailed Reporting</h3>
              <p className="text-muted-foreground">
                Comprehensive reports with link placements, metrics, and performance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">How Link Insertions Work</h2>
            <p className="text-muted-foreground text-lg">Simple, transparent process for maximum results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold">Submit Your URLs</h3>
              <p className="text-muted-foreground text-sm">
                Provide your target URLs and preferred anchor text for link insertion.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold">Site Selection</h3>
              <p className="text-muted-foreground text-sm">
                We identify relevant, high-authority websites with existing content perfect for your links.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold">Link Integration</h3>
              <p className="text-muted-foreground text-sm">
                Your links are naturally integrated into existing articles with proper context and relevance.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold">Delivery & Report</h3>
              <p className="text-muted-foreground text-sm">
                Receive detailed reports with link placements, metrics, and performance data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Start Building Quality Links Today</h2>
            <p className="text-primary-foreground/80 text-lg">
              Get fast, effective link building results with our professional link insertion services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/marketplace">Get Started Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
