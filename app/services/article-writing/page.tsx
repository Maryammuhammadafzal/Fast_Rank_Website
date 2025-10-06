"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Edit, Clock, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ArticleWritingPage() {
  const router = useRouter()

  const packages = [
    {
      name: "Basic Article Package",
      price: 97,
      originalPrice: 147,
      description: "Perfect for blog posts and basic content needs",
      features: [
        "1 SEO-Optimized Article",
        "800-1000 Words",
        "Keyword Research Included",
        "Meta Description",
        "1 Revision Round",
        "48-72 Hour Delivery",
      ],
      deliveryTime: "2-3 days",
      popular: false,
    },
    {
      name: "Professional Content Package",
      price: 247,
      originalPrice: 347,
      description: "Comprehensive content solution for businesses",
      features: [
        "3 SEO-Optimized Articles",
        "1000-1200 Words Each",
        "Advanced Keyword Research",
        "Meta Descriptions & Titles",
        "2 Revision Rounds",
        "Content Strategy Consultation",
        "Priority Support",
      ],
      deliveryTime: "3-5 days",
      popular: true,
    },
    {
      name: "Enterprise Content Suite",
      price: 497,
      originalPrice: 697,
      description: "Complete content marketing solution",
      features: [
        "5 Premium Articles",
        "1200-1500 Words Each",
        "Comprehensive SEO Analysis",
        "Custom Content Strategy",
        "Unlimited Revisions",
        "Social Media Snippets",
        "Content Calendar Planning",
        "Dedicated Content Manager",
      ],
      deliveryTime: "5-7 days",
      popular: false,
    },
  ]

  const handleBuyNow = (pkg: (typeof packages)[0]) => {
    const checkoutUrl = `/checkout?productId=article-${pkg.name.toLowerCase().replace(/\s+/g, "-")}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}&type=Article%20Writing&description=${encodeURIComponent(pkg.description)}`
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
              <Edit className="h-3 w-3 mr-1" />
              Professional Writing Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">SEO-Optimized Article Writing</h1>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Professional content creation with keyword research and optimization to drive organic traffic and engage
              your audience.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Content Packages</h2>
            <p className="text-muted-foreground text-lg">Choose the perfect content solution for your business needs</p>
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
            <h2 className="text-3xl font-bold">Why Choose Our Article Writing Service?</h2>
            <p className="text-muted-foreground text-lg">
              Professional content that drives results and engages your audience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">SEO-Optimized Content</h3>
              <p className="text-muted-foreground">
                Every article is optimized for search engines with proper keyword research and implementation.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Edit className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Expert Writers</h3>
              <p className="text-muted-foreground">
                Professional writers with expertise in various industries and niches.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Fast Turnaround</h3>
              <p className="text-muted-foreground">
                Quick delivery without compromising on quality. Most articles delivered within 2-5 days.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Original Content</h3>
              <p className="text-muted-foreground">
                100% original, plagiarism-free content that's unique to your brand and audience.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Unlimited Revisions</h3>
              <p className="text-muted-foreground">
                We work with you until you're completely satisfied with the final result.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Strategic Approach</h3>
              <p className="text-muted-foreground">
                Content strategy consultation to align articles with your business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Create Engaging Content?</h2>
            <p className="text-primary-foreground/80 text-lg">
              Let our expert writers create compelling, SEO-optimized content that drives traffic and converts visitors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/marketplace">Get Started Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                View Samples
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
