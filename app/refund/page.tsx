import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-xl text-gray-600">We stand behind our services with a 100% satisfaction guarantee</p>
          <p className="text-gray-600 mt-2">Last updated: January 1, 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">✅</div>
                <CardTitle className="text-xl text-gray-900">100% Satisfaction Guarantee</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                We're committed to delivering high-quality guest posting services. If you're not completely satisfied
                with our work, we'll make it right or provide a full refund.
              </p>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="font-semibold text-green-800">Our Promise:</p>
                <p className="text-green-700">
                  Quality content placement on authoritative websites or your money back.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Refund Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>You may be eligible for a full refund if:</p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">✅</div>
                  <div>
                    <p className="font-medium">Service Not Delivered</p>
                    <p className="text-sm text-gray-600">We failed to deliver your order within the agreed timeframe</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">✅</div>
                  <div>
                    <p className="font-medium">Quality Standards Not Met</p>
                    <p className="text-sm text-gray-600">
                      The delivered content doesn't meet our published quality guidelines
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">✅</div>
                  <div>
                    <p className="font-medium">Website Metrics Misrepresented</p>
                    <p className="text-sm text-gray-600">The placement website doesn't match the promised metrics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">✅</div>
                  <div>
                    <p className="font-medium">Content Removed</p>
                    <p className="text-sm text-gray-600">
                      Your content is removed from the website within 30 days of publication
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Refund Timeline</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl">🕒</div>
                  <div>
                    <p className="font-semibold text-blue-900">30-Day Window</p>
                    <p className="text-blue-700">
                      Refund requests must be submitted within 30 days of order completion
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="font-semibold text-gray-900">Step 1</div>
                    <div className="text-sm text-gray-600 mt-1">Submit refund request</div>
                    <Badge variant="secondary" className="mt-2">
                      24 hours
                    </Badge>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="font-semibold text-gray-900">Step 2</div>
                    <div className="text-sm text-gray-600 mt-1">Review and investigation</div>
                    <Badge variant="secondary" className="mt-2">
                      3-5 days
                    </Badge>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="font-semibold text-gray-900">Step 3</div>
                    <div className="text-sm text-gray-600 mt-1">Refund processed</div>
                    <Badge variant="secondary" className="mt-2">
                      5-7 days
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Non-Refundable Situations</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>Refunds may not be available in the following situations:</p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">❌</div>
                  <div>
                    <p className="font-medium">Service Completed Successfully</p>
                    <p className="text-sm text-gray-600">Content was published as agreed and meets quality standards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">❌</div>
                  <div>
                    <p className="font-medium">Client-Provided Content Issues</p>
                    <p className="text-sm text-gray-600">
                      Problems arising from incorrect or inappropriate client-provided materials
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">❌</div>
                  <div>
                    <p className="font-medium">External Factors</p>
                    <p className="text-sm text-gray-600">
                      Website changes or removal due to factors beyond our control
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-lg mt-0.5">❌</div>
                  <div>
                    <p className="font-medium">Partial Service Use</p>
                    <p className="text-sm text-gray-600">Refunds for partially completed services may be prorated</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">How to Request a Refund</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>To request a refund, please follow these steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Contact our support team at <strong>support@rankfastlinks.com</strong>
                </li>
                <li>Include your order number and detailed reason for the refund request</li>
                <li>Provide any supporting documentation or evidence</li>
                <li>Allow 3-5 business days for our team to review your request</li>
                <li>Receive confirmation and refund processing details</li>
              </ol>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-6">
                <div className="flex items-start space-x-2">
                  <div className="text-lg mt-0.5">⚠️</div>
                  <div>
                    <p className="font-semibold text-yellow-800">Important Note:</p>
                    <p className="text-yellow-700 text-sm">
                      Before requesting a refund, please contact our support team to discuss potential solutions. We
                      often can resolve issues through revisions or replacements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Alternative Solutions</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>Before processing a refund, we may offer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Content Revision:</strong> Free revisions to meet your requirements
                </li>
                <li>
                  <strong>Replacement Placement:</strong> Alternative website placement at no extra cost
                </li>
                <li>
                  <strong>Service Credit:</strong> Credit toward future orders
                </li>
                <li>
                  <strong>Partial Refund:</strong> Refund for the portion of service not delivered
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>For refund requests or questions about this policy:</p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p>
                  <strong>Email:</strong> support@rankfastlinks.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
                </p>
                <p>
                  <strong>Response Time:</strong> Within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
