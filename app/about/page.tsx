import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Rankfastlinks</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're the leading platform for premium guest post services, helping businesses build authority and reach
            through high-quality backlinks from authoritative websites.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600">Guest Posts Published</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
              <div className="text-gray-600">Partner Websites</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Founded in 2020, Rankfastlinks emerged from a simple observation: businesses needed a reliable,
                transparent way to build high-quality backlinks that actually move the needle on search rankings.
              </p>
              <p>
                What started as a small team of SEO experts has grown into the most trusted guest posting platform,
                serving thousands of businesses worldwide. We've built relationships with over 5,000 authoritative
                websites across every industry imaginable.
              </p>
              <p>
                Today, we're proud to be the go-to solution for businesses looking to scale their link building efforts
                without compromising on quality or transparency.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-gray-200">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle className="text-lg text-gray-900">Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Every guest post is manually reviewed to ensure it meets our high standards for quality and relevance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <CardTitle className="text-lg text-gray-900">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Full visibility into website metrics, placement details, and live URLs for every order.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">👥</div>
                <CardTitle className="text-lg text-gray-900">Customer Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Dedicated support team available 24/7 to ensure your campaigns succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <CardTitle className="text-lg text-gray-900">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Constantly improving our platform and processes to deliver better results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <Card className="bg-white border-gray-200 max-w-4xl mx-auto">
            <CardContent className="pt-8">
              <p className="text-lg text-gray-700 mb-6">
                Our team consists of SEO experts, content strategists, and relationship managers who are passionate
                about helping businesses succeed online.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  SEO Specialists
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Content Writers
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Outreach Experts
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Quality Analysts
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Customer Success
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
