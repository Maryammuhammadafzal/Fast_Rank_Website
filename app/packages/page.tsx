"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Crown, Zap, Target } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"

const packages = [
  {
    id: "starter",
    name: "Starter Package",
    description: "Perfect for small businesses getting started with SEO",
    price: 299,
    originalPrice: 399,
    icon: <Zap className="h-8 w-8" />,
    popular: false,
    features: [
      "2 Guest Posts (DA 50+)",
      "1 Article Writing (1000 words)",
      "Basic SEO optimization",
      "Detailed reporting",
      "Email support",
      "30-day delivery",
    ],
  },
  {
    id: "professional",
    name: "Professional Package",
    description: "Most popular choice for growing businesses",
    price: 699,
    originalPrice: 899,
    icon: <Target className="h-8 w-8" />,
    popular: true,
    features: [
      "5 Guest Posts (DA 70+)",
      "3 Article Writing (1500 words each)",
      "2 Link Insertions",
      "Advanced SEO optimization",
      "Priority support",
      "Detailed analytics",
      "20-day delivery",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    description: "Comprehensive solution for established businesses",
    price: 1299,
    originalPrice: 1699,
    icon: <Crown className="h-8 w-8" />,
    popular: false,
    features: [
      "10 Guest Posts (DA 80+)",
      "5 Article Writing (2000 words each)",
      "5 Link Insertions",
      "Premium SEO optimization",
      "Dedicated account manager",
      "Custom reporting dashboard",
      "15-day delivery",
      "Monthly strategy calls",
    ],
  },
]

const addOns = [
  {
    name: "Extra Guest Post",
    description: "Add more high-authority guest posts to your package",
    price: 149,
  },
  {
    name: "Rush Delivery",
    description: "Get your order completed 50% faster",
    price: 99,
  },
  {
    name: "Premium Content",
    description: "Upgrade to premium content with enhanced research",
    price: 199,
  },
  {
    name: "Social Media Promotion",
    description: "Promote your content across our social channels",
    price: 79,
  },
]

export default function PackagesPage() {
  const router = useRouter()

  const handleBuyNow = (pkg: (typeof packages)[0]) => {
    const checkoutUrl = `/checkout?productId=package-${pkg.id}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}&type=SEO%20Package&description=${encodeURIComponent(pkg.description)}`
    router.push(checkoutUrl)
  }

  const handleAddOnBuyNow = (addon: (typeof addOns)[0]) => {
    const checkoutUrl = `/checkout?productId=addon-${addon.name.toLowerCase().replace(/\s+/g, "-")}&name=${encodeURIComponent(addon.name)}&price=${addon.price}&type=Add-On&description=${encodeURIComponent(addon.description)}`
    router.push(checkoutUrl)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Package</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All packages include our quality guarantee and dedicated support to ensure your success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative ${pkg.popular ? "ring-2 ring-accent shadow-lg scale-105" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-black font-semibold px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-brand-purple/10 rounded-lg text-brand-purple">{pkg.icon}</div>
                  </div>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-base">{pkg.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold">${pkg.price}</span>
                      <span className="text-lg text-muted-foreground line-through">${pkg.originalPrice}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${pkg.popular ? "bg-accent hover:bg-accent/90 text-black" : ""}`}
                    size="lg"
                    onClick={() => handleBuyNow(pkg)}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enhance Your Package</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Customize your package with these popular add-ons for even better results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <CardDescription>{addon.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-purple mb-4">+${addon.price}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleAddOnBuyNow(addon)}
                  >
                    Add to Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Package Questions</h2>
              <p className="text-xl text-muted-foreground">Common questions about our service packages and pricing.</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I upgrade my package later?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade to a higher package at any time. We'll credit your previous purchase toward the
                    new package price.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's included in the reporting?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All packages include detailed reports with publication URLs, domain metrics, traffic data, and
                    performance analytics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer custom packages?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, we can create custom packages for businesses with specific needs. Contact our team to discuss
                    your requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      <Footer />
    </div>
  )
}
