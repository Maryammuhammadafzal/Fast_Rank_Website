import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/rank-logo.jpg"
                alt="Rank Fast Links"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="leading-none">
                <span className="font-bold text-xl">Rank Fast Links</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Premium guest post services for maximum authority & reach. Build high-quality backlinks from authoritative
              websites.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/guest-posts"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Guest Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/services/article-writing"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Article Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/link-insertions"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Link Insertions
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Browse All
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">© 2025 Rank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
