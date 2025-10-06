"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Star, TrendingUp, Clock, Shield, Users, FileText, CheckCircle2, Send } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const handleBuyNow = (packageName: string, price: number, description: string) => {
    const params = new URLSearchParams({
      name: packageName,
      price: price.toString(),
      description: description,
      type: "package",
    })
    router.push(`/checkout?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground">⭐ Best SEO Ranking Service</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance tracking-tighter">
                Authority Links Made Easy: <span className="text-secondary">Build Trust, Traffic &</span> Rankings
                Faster.
              </h1>
              <p className="text-xl text-primary-foreground/80 text-pretty max-w-2xl mx-auto">
                RankFastLinks Connects You With Real Websites for Genuine Guest Posts — Fast, Safe, and Built for
                Long-Term SEO Growth
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/marketplace">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Start Ranking Faster
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                View Catalog
              </Button>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">500+</div>
                <div className="text-primary-foreground/80">Premium Sites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">98%</div>
                <div className="text-primary-foreground/80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">24-72h</div>
                <div className="text-primary-foreground/80">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">24/7</div>
                <div className="text-primary-foreground/80">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Rank? Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why Choose Rank?</h2>
            <p className="text-muted-foreground text-lg">
              We're not just another guest post service. We're your strategic partner in building online authority.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your guest posts published within 24-72 hours on most premium websites.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Targeted Audience Reach</h3>
              <p className="text-muted-foreground">
                Reach your ideal customers through high-authority websites in your niche.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality Content</h3>
              <p className="text-muted-foreground">
                Professional writers create engaging, SEO-optimized content that drives results.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated support team is available around the clock to assist you.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Trusted by 10,000+ Brands</h3>
              <p className="text-muted-foreground">
                Join thousands of successful businesses that trust us with their link building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Posting Packages Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Guest Posting Packages</h2>
            <p className="text-muted-foreground text-lg">Choose the perfect package for your link building needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <CardDescription>Perfect for small businesses getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">$297</div>
                  <div className="text-sm text-muted-foreground">per package</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">DA Range:</span>
                    <span className="text-sm font-medium">20-40</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Guest Posts:</span>
                    <span className="text-sm font-medium">3 posts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivery:</span>
                    <span className="text-sm font-medium">5-7 days</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={() =>
                    handleBuyNow("Starter Package", 297, "3 guest posts on DA 20-40 sites, delivered in 5-7 days")
                  }
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-xl">Standard</CardTitle>
                <CardDescription>Most popular choice for growing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">$597</div>
                  <div className="text-sm text-muted-foreground">per package</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">DA Range:</span>
                    <span className="text-sm font-medium">40-60</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Guest Posts:</span>
                    <span className="text-sm font-medium">5 posts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivery:</span>
                    <span className="text-sm font-medium">3-5 days</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={() =>
                    handleBuyNow("Standard Package", 597, "5 guest posts on DA 40-60 sites, delivered in 3-5 days")
                  }
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Premium</CardTitle>
                <CardDescription>High-authority sites for maximum impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">$997</div>
                  <div className="text-sm text-muted-foreground">per package</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">DA Range:</span>
                    <span className="text-sm font-medium">60-80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Guest Posts:</span>
                    <span className="text-sm font-medium">7 posts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivery:</span>
                    <span className="text-sm font-medium">2-4 days</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={() =>
                    handleBuyNow("Premium Package", 997, "7 guest posts on DA 60-80 sites, delivered in 2-4 days")
                  }
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border border-dashed border-secondary/50">
              <CardHeader>
                <CardTitle className="text-xl">Custom</CardTitle>
                <CardDescription>Tailored solutions for unique requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">Custom</div>
                  <div className="text-sm text-muted-foreground">pricing</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">DA Range:</span>
                    <span className="text-sm font-medium">80+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Guest Posts:</span>
                    <span className="text-sm font-medium">10+ posts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivery:</span>
                    <span className="text-sm font-medium">1-3 days</span>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground mb-4">
                  Need something different?{" "}
                  <Link href="/contact" className="text-secondary hover:underline">
                    Contact us for a tailored solution
                  </Link>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                >
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Get high-quality backlinks in four simple steps — built for speed, transparency, and real results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center space-y-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="text-lg">1. Search Websites</CardTitle>
                <CardDescription>Find real sites that match your niche and metrics.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center space-y-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="text-lg">2. Choose Package</CardTitle>
                <CardDescription>Select guest post, article writing, or link insertions.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center space-y-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="text-lg">3. Place Order</CardTitle>
                <CardDescription>Submit details securely and track progress in your dashboard.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center space-y-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Send className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="text-lg">4. Get Published</CardTitle>
                <CardDescription>Receive live URLs with the metrics you care about.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">Real results from marketers and founders who scale with us.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="h-full">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/person-silhouette-city.png" alt="Client 1" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Jordan Lee</CardTitle>
                    <CardDescription>Growth Lead, SaaSCo</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We saw rankings and organic signups jump within weeks. The quality and speed were exactly what we
                needed.
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/diverse-group-conversation.png" alt="Client 2" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Amina Malik</CardTitle>
                    <CardDescription>Founder, DTC Brand</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Transparent process, great communication, and real websites. This is how link building should be done.
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/diverse-group-outdoors.png" alt="Client 3" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Rahul Singh</CardTitle>
                    <CardDescription>SEO Consultant</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                I recommend Rank to clients who value safe, scalable growth. Their catalog and delivery times are
                top-tier.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our guest posting and outreach services.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Are these real websites with organic traffic?</AccordionTrigger>
                <AccordionContent>
                  Yes. Our marketplace lists real, vetted websites with relevant audiences and measurable metrics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How fast will my guest post go live?</AccordionTrigger>
                <AccordionContent>
                  Most orders are delivered within 24–72 hours depending on publisher schedules and content scope.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can you write the content for me?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Choose an article writing add-on or our full guest post packages for end-to-end content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What if a link is removed later?</AccordionTrigger>
                <AccordionContent>
                  We offer a replacement window on eligible orders. Reach out to support and we’ll assist promptly.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Accelerate Your Business Growth?</h2>
            <p className="text-muted-foreground text-lg">
              Select the perfect growth package tailored to your business needs. Each strategy is designed to deliver
              measurable results and sustainable growth for your online presence.
            </p>
            <Link href="/marketplace">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Choose Your Growth Strategy
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
