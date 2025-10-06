import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build the future of digital marketing. We're looking for passionate individuals who want to make a
            real impact in the SEO and content marketing industry.
          </p>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-gray-200 text-center">
              <CardContent className="pt-8">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Great Culture</h3>
                <p className="text-gray-600">
                  Work with a team that values collaboration, innovation, and work-life balance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 text-center">
              <CardContent className="pt-8">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
                <p className="text-gray-600">
                  Advance your career with continuous learning and professional development.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 text-center">
              <CardContent className="pt-8">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact</h3>
                <p className="text-gray-600">
                  Help thousands of businesses grow their online presence and achieve success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Positions</h2>
          <div className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Senior SEO Specialist</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Lead SEO strategies and help clients achieve better search rankings
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">📍</span>
                    Remote / New York
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">💼</span>
                    Marketing
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">🕒</span>
                    Posted 2 days ago
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  We're looking for an experienced SEO specialist to join our team and help develop cutting-edge
                  strategies for our clients. You'll work with a diverse portfolio of businesses to improve their search
                  visibility.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Content Marketing Manager</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Create and manage content strategies for our guest posting services
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">📍</span>
                    Remote / Los Angeles
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">💼</span>
                    Marketing
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">🕒</span>
                    Posted 5 days ago
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Join our content team to develop high-quality content strategies and oversee the creation of engaging
                  articles for our guest posting network.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Customer Success Representative</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Help our clients succeed with exceptional support and guidance
                    </CardDescription>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">📍</span>
                    Remote
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">💼</span>
                    Customer Success
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">🕒</span>
                    Posted 1 week ago
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Be the voice of our company and help clients achieve their marketing goals through our services.
                  Perfect for someone passionate about customer relationships.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Full-Stack Developer</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Build and maintain our platform and internal tools
                    </CardDescription>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">📍</span>
                    Remote / San Francisco
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">💼</span>
                    Engineering
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-1">🕒</span>
                    Posted 3 days ago
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Join our engineering team to build scalable solutions that power our guest posting platform. Work with
                  modern technologies and help shape our technical direction.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-gray-200 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🏥</div>
                <h3 className="font-semibold text-gray-900 mb-1">Health Insurance</h3>
                <p className="text-gray-600 text-sm">Comprehensive medical, dental, and vision coverage</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🏖️</div>
                <h3 className="font-semibold text-gray-900 mb-1">Unlimited PTO</h3>
                <p className="text-gray-600 text-sm">Take time off when you need it</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">💻</div>
                <h3 className="font-semibold text-gray-900 mb-1">Remote Work</h3>
                <p className="text-gray-600 text-sm">Work from anywhere with flexible hours</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-900 mb-1">Learning Budget</h3>
                <p className="text-gray-600 text-sm">$2,000 annual budget for courses and conferences</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-blue-50 border-blue-200 text-center">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See a Perfect Match?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and tell us how you'd
              like to contribute to our mission.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Send Us Your Resume</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
