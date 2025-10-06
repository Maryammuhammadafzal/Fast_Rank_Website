"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Star, Clock, Shield, TrendingUp, CheckCircle, MessageCircle, Heart, Share2, Users } from "lucide-react"
import Link from "next/link"

// Mock service data
const serviceData = {
  1: {
    id: 1,
    title: "High-Authority Tech Blog Guest Post",
    description:
      "Get published on premium technology blogs with DA 70+ and high organic traffic. Perfect for SaaS companies, tech startups, and digital agencies looking to build authority in the technology space.",
    longDescription:
      "This premium guest post service connects you with high-authority technology blogs that have established readerships and strong domain metrics. Our network includes leading tech publications, industry blogs, and niche websites that cater to your target audience.\n\nEach guest post is carefully crafted by experienced tech writers who understand the nuances of the technology industry. We ensure that your content provides genuine value to readers while naturally incorporating your brand message and backlinks.\n\nOur process includes thorough research, professional writing, editorial review, and publication coordination. You'll receive detailed reporting on the publication, including metrics, social shares, and traffic data.",
    price: 297,
    originalPrice: 397,
    category: "Guest Posts",
    da: 75,
    dr: 68,
    traffic: "50K+",
    rating: 4.9,
    reviews: 127,
    deliveryTime: "3-5 days",
    featured: true,
    image: "/placeholder-1ynkd.png",
    provider: {
      name: "TechContent Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      completedOrders: 1250,
      responseTime: "< 2 hours",
      memberSince: "2019",
    },
    features: [
      "High-authority tech blog placement (DA 70+)",
      "Professional tech writer with 5+ years experience",
      "SEO-optimized content with keyword research",
      "2-3 contextual backlinks included",
      "Social media promotion included",
      "Detailed performance report",
      "100% white-hat link building",
      "Money-back guarantee",
    ],
    packages: [
      {
        name: "Basic",
        price: 297,
        originalPrice: 397,
        features: [
          "1 guest post on DA 70+ tech blog",
          "800-1000 words",
          "2 contextual backlinks",
          "Basic social promotion",
          "Publication report",
        ],
        deliveryTime: "3-5 days",
      },
      {
        name: "Standard",
        price: 497,
        originalPrice: 647,
        features: [
          "2 guest posts on DA 70+ tech blogs",
          "1000-1200 words each",
          "3 contextual backlinks per post",
          "Enhanced social promotion",
          "Detailed analytics report",
          "Priority support",
        ],
        deliveryTime: "5-7 days",
        popular: true,
      },
      {
        name: "Premium",
        price: 897,
        originalPrice: 1197,
        features: [
          "3 guest posts on DA 80+ tech blogs",
          "1200-1500 words each",
          "4 contextual backlinks per post",
          "Full social media campaign",
          "Comprehensive analytics dashboard",
          "Dedicated account manager",
          "Follow-up outreach included",
        ],
        deliveryTime: "7-10 days",
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent service! The guest post was published on a high-quality tech blog and we saw immediate traffic increase. The writing quality was outstanding and perfectly matched our brand voice.",
        helpful: 12,
      },
      {
        id: 2,
        author: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Professional service from start to finish. Great communication, delivered on time, and the results exceeded our expectations. Will definitely use again.",
        helpful: 8,
      },
      {
        id: 3,
        author: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Good quality guest post with solid metrics. The blog had good engagement and the content was well-researched. Delivery was slightly delayed but worth the wait.",
        helpful: 5,
      },
    ],
    faq: [
      {
        question: "What type of websites will my guest post be published on?",
        answer:
          "We work exclusively with high-authority technology blogs and websites with DA 70+ and significant organic traffic. All sites are manually vetted for quality, relevance, and engagement.",
      },
      {
        question: "Can I see the website before publication?",
        answer:
          "Yes, we'll share the target website details with you for approval before writing begins. You'll have full transparency about where your content will be published.",
      },
      {
        question: "Do you provide the content or do I need to write it?",
        answer:
          "We handle all content creation. Our experienced tech writers will craft engaging, SEO-optimized content that aligns with your brand and goals.",
      },
      {
        question: "What if I'm not satisfied with the results?",
        answer:
          "We offer a 100% money-back guarantee. If you're not completely satisfied with the quality or placement, we'll provide a full refund within 30 days.",
      },
    ],
  },
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [selectedPackage, setSelectedPackage] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const service = serviceData[Number.parseInt(params.id) as keyof typeof serviceData]

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
          <Button>
            <Link href="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/marketplace" className="hover:text-foreground">
                  Marketplace
                </Link>
                <span>/</span>
                <span>{service.category}</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    {service.featured && (
                      <Badge className="bg-secondary text-secondary-foreground">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-balance">{service.title}</h1>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Provider Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Avatar>
                  <AvatarImage src={service.provider.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{service.provider.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">{service.provider.name}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{service.provider.rating}</span>
                    </div>
                    <span>{service.provider.completedOrders} orders</span>
                    <span>Response: {service.provider.responseTime}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>

              {/* Service Image */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Service Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({service.reviews.length})</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Service</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none">
                    {service.longDescription.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                {/* Metrics */}
                {(service.da || service.dr || service.traffic) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Website Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-6">
                        {service.da && (
                          <div className="text-center">
                            <div className="text-3xl font-bold text-secondary">{service.da}</div>
                            <div className="text-muted-foreground">Domain Authority</div>
                          </div>
                        )}
                        {service.dr && (
                          <div className="text-center">
                            <div className="text-3xl font-bold text-secondary">{service.dr}</div>
                            <div className="text-muted-foreground">Domain Rating</div>
                          </div>
                        )}
                        {service.traffic && (
                          <div className="text-center">
                            <div className="text-3xl font-bold text-secondary">{service.traffic}</div>
                            <div className="text-muted-foreground">Monthly Traffic</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Customer Reviews</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{service.rating}</span>
                        <span className="text-muted-foreground">({service.reviews.length} reviews)</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Rating Breakdown */}
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm w-8">{rating} ★</span>
                          <Progress value={rating === 5 ? 85 : rating === 4 ? 12 : 3} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-8">
                            {rating === 5 ? "85%" : rating === 4 ? "12%" : "3%"}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {service.reviews.map((review) => (
                        <div key={review.id} className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{review.author}</span>
                                <div className="flex items-center">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-muted-foreground mb-2">{review.comment}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <button className="text-muted-foreground hover:text-foreground">
                                  👍 Helpful ({review.helpful})
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {service.faq.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-semibold">{item.question}</h4>
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        {index < service.faq.length - 1 && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Pricing */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Choose Your Package</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPackage === index
                        ? "border-secondary bg-secondary/5"
                        : "border-border hover:border-secondary/50"
                    } ${pkg.popular ? "ring-2 ring-secondary/20" : ""}`}
                    onClick={() => setSelectedPackage(index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{pkg.name}</span>
                        {pkg.popular && (
                          <Badge className="bg-secondary text-secondary-foreground text-xs">Popular</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-secondary">${pkg.price}</span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${pkg.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Delivery: {pkg.deliveryTime}</span>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-secondary">${service.packages[selectedPackage].price}</span>
                  </div>

                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" size="lg">
                    Order Now
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Delivery: {service.packages[selectedPackage].deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Card */}
            <Card>
              <CardHeader>
                <CardTitle>About the Seller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={service.provider.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{service.provider.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{service.provider.name}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{service.provider.rating}</span>
                      <span className="text-muted-foreground">({service.reviews.length} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Orders completed:</span>
                    <span>{service.provider.completedOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response time:</span>
                    <span>{service.provider.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>{service.provider.memberSince}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
