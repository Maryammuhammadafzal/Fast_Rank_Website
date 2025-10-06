"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: "🏠" },
  { name: "User Management", href: "/admin/users", icon: "👥", badge: "1247" },
  { name: "Products", href: "/admin/products", icon: "🌐", badge: "89" },
  { name: "Blog Management", href: "/admin/blog", icon: "📝" },
  { name: "Orders", href: "/admin/orders", icon: "🛍️", badge: "23" },
  { name: "Messages", href: "/admin/messages", icon: "💬", badge: "12" },
  { name: "Activities", href: "/admin/activities", icon: "📊" },
  { name: "Service Purchases", href: "/admin/purchases", icon: "📦" },
  { name: "Package Management", href: "/admin/packages", icon: "📋" },
  { name: "Client Reviews", href: "/admin/reviews", icon: "⭐", badge: "8" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
]

export function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <Link href="/admin" className="flex items-center space-x-2">
            <img src="/images/rankfastlinks-logo.jpg" alt="Admin Panel" className="h-6 w-auto" />
            <span className="font-bold">Admin Panel</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
            <span className="text-lg text-muted-foreground">✕</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 hidden lg:block">Admin Modules</h3>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted group ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:text-foreground"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground">Admin Panel v1.0</p>
            <p className="text-xs text-muted-foreground">Rankfastlinks.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
