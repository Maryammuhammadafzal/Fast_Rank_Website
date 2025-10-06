import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 1, 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                By accessing and using Rankfastlinks.com ("the Service"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
              <p>
                These Terms of Service ("Terms") govern your use of our website located at rankfastlinks.com (the
                "Service") operated by Rankfastlinks ("us", "we", or "our").
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                Rankfastlinks provides guest posting and link building services. We connect clients with high-quality
                websites for content placement and link building opportunities.
              </p>
              <p>Our services include but are not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Guest post placement on authoritative websites</li>
                <li>Content creation and optimization</li>
                <li>Link insertion services</li>
                <li>SEO consultation and strategy</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>By using our service, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information when placing orders</li>
                <li>Use our services only for legitimate business purposes</li>
                <li>Not engage in any activity that could harm our reputation or services</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">4. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                Payment is required in full before service delivery begins. We accept major credit cards and PayPal. All
                prices are in USD unless otherwise specified.
              </p>
              <p>
                Refunds are available according to our Refund Policy. Chargebacks or payment disputes must be resolved
                through our customer service team before contacting your payment provider.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">5. Service Delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                We strive to deliver all services within the specified timeframe. Delivery times are estimates and may
                vary based on website availability and content requirements.
              </p>
              <p>
                We reserve the right to refuse service or cancel orders that violate our quality guidelines or terms of
                service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                All content created as part of our services becomes the property of the client upon payment. However, we
                retain the right to use anonymized case studies and examples for marketing purposes.
              </p>
              <p>
                Clients must ensure they have the right to use any materials, URLs, or content provided to us for
                service delivery.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                Rankfastlinks shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p>
                Our total liability for any claim arising out of or relating to these Terms or our services shall not
                exceed the amount paid by you for the specific service giving rise to the claim.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">8. Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                Service, to understand our practices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p>
                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms of
                Service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> legal@rankfastlinks.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Business Ave, Suite 100, New York, NY 10001
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
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
