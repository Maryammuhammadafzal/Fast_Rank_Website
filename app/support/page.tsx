import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Support</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated support team is here to help you succeed. Get assistance with orders, technical issues, or
              general questions about our services.
            </p>
          </div>

          {/* Support Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">🕒</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-gray-600 text-sm">Support Available</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">💬</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">&lt;2min</div>
                <div className="text-gray-600 text-sm">Average Response</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-gray-600 text-sm">Satisfaction Rate</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">🎧</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-gray-600 text-sm">Support Experts</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Support Options */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How Can We Help You?</h2>

              {/* Live Chat */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">💬</div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">Live Chat</CardTitle>
                        <CardDescription className="text-gray-600">
                          Get instant help from our support team
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Chat with our support experts in real-time. Perfect for quick questions and immediate assistance.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <strong>Response time:</strong> Under 2 minutes
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Start Chat</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email Support */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📧</div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">Email Support</CardTitle>
                      <CardDescription className="text-gray-600">Send us a detailed message</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    For complex issues or detailed questions, email us and we'll provide a comprehensive response.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <strong>Response time:</strong> Within 24 hours
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <Link href="/contact">Send Email</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Support */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📞</div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">Phone Support</CardTitle>
                      <CardDescription className="text-gray-600">Speak directly with our team</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Call us for urgent matters or when you prefer to speak with someone directly.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <strong>Available:</strong> 24/7
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">+1 (555) 123-4567</div>
                      <div className="text-sm text-gray-600">Toll-free</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Center */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">Help Center</CardTitle>
                      <CardDescription className="text-gray-600">Find answers to common questions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Browse our comprehensive knowledge base with guides, tutorials, and FAQs.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <strong>Available:</strong> 24/7 self-service
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      <Link href="/help">Browse Articles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/help" className="block text-blue-600 hover:underline">
                    Help Center
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

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Live Chat:</span>
                    <span className="font-medium text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">24/7</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">All systems operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Our support team is available around the clock to assist you.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📞</span>
                      +33 756756445
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📧</span>
                      ontact.fr@rankfastlinks.com
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Emergency Support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    For critical issues affecting live campaigns, use our priority support line.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    Emergency Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
