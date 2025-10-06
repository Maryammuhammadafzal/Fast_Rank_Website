import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, CheckCircle, Star, TrendingUp, Users, Zap } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const services = [
  {
    id: "guest-posts",
    title: "Guest Post Services",
    description: "Premium guest posting on high-authority websites to boost your SEO and brand visibility.",
    icon: <TrendingUp className="h-8 w-8" />,
    features: ["DA 70+ websites", "Dofollow backlinks", "Content included", "Detailed reporting"],
    startingPrice: 299,
    href: "/services/guest-posts",
  },
  {
    id: "article-writing",
    title: "Article Writing",
    description: "Professional content creation for blogs, websites, and marketing campaigns.",
    icon: <Zap className="h-8 w-8" />,
    features: ["SEO optimized", "Original content", "Multiple revisions", "Fast delivery"],
    startingPrice: 99,
    href: "/services/article-writing",
  },
  {
    id: "link-insertions",
    title: "Link Insertions",
    description: "Strategic link placements in existing high-quality content for natural backlink building.",
    icon: <Users className="h-8 w-8" />,
    features: ["Contextual links", "High DA sites", "Natural placement", "Quick turnaround"],
    startingPrice: 149,
    href: "/services/link-insertions",
  },
]

const benefits = [
  {
    title: "Proven Results",
    description:
      "Our services have helped thousands of businesses improve their search rankings and online visibility.",
    icon: <Star className="h-6 w-6" />,
  },
  {
    title: "Quality Guarantee",
    description: "We work only with vetted, high-authority websites to ensure maximum impact for your investment.",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  {
    title: "Expert Team",
    description: "Our experienced team of SEO specialists and content creators deliver exceptional results.",
    icon: <Users className="h-6 w-6" />,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of SEO and content marketing services designed to grow your online
              presence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="relative group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-brand-purple/10 rounded-lg text-brand-purple">{service.icon}</div>
                    <Badge variant="secondary">From ${service.startingPrice}</Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href={service.href}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver results that matter for your business growth and online success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-purple/10 text-brand-purple rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      <Footer />
    </div>
  )
}
