import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions, learn how to use our platform, and get the support you need.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</div>
            <Input placeholder="Search for help articles..." className="pl-10 py-3 text-lg border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Popular Topics */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
                    <p className="text-gray-600 text-sm">Learn the basics of using our platform</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Placing Orders</h3>
                    <p className="text-gray-600 text-sm">How to order guest posts and services</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Payment & Billing</h3>
                    <p className="text-gray-600 text-sm">Payment methods and billing questions</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Guidelines</h3>
                    <p className="text-gray-600 text-sm">Understanding our quality standards</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Card className="bg-white border-gray-200">
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        How long does it take to get my guest post published?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Most guest posts are published within 7-14 business days. Premium orders with expedited delivery
                        can be completed in 3-5 business days. You'll receive email notifications at each stage of the
                        process.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        What information do I need to provide for my order?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        You'll need to provide your target URL, anchor text preferences, and any specific requirements.
                        Our team will handle content creation, outreach, and placement on high-authority websites.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        Do you provide reports for published guest posts?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes! You'll receive a detailed report with live URLs, website metrics (DA, DR, traffic), and
                        placement details. All reports are available in your dashboard for future reference.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">What is your refund policy?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        We offer a 100% satisfaction guarantee. If you're not happy with the quality or placement, we'll
                        provide a replacement or full refund within 30 days. See our refund policy for complete details.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        Can I see the websites before my content is published?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, we provide website details and metrics for approval before content creation begins. You'll
                        have full transparency about where your content will be published.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Contact Support */}
            <Card className="bg-gray-50 border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Still need help?</CardTitle>
                <CardDescription className="text-gray-600">
                  Can't find what you're looking for? Our support team is here to help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/contact">
                      <span className="mr-2">📧</span>
                      Contact Support
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-gray-300 bg-transparent">
                    <span className="mr-2">💬</span>
                    Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/contact" className="block text-blue-600 hover:underline">
                  Contact Support
                </Link>
                <Link href="/terms" className="block text-blue-600 hover:underline">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="block text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/refund" className="block text-blue-600 hover:underline">
                  Refund Policy
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our support team is available around the clock to assist you.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📞</span>
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📧</span>
                    support@rankfastlinks.com
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
