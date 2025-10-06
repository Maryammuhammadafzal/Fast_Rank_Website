"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface AdminHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="text-lg">☰</span>
        </Button>

        {/* Logo - Desktop */}
        <Link href="/admin" className="hidden lg:flex items-center space-x-2">
          <img src="/images/rankfastlinks-logo.jpg" alt="Admin Panel" className="h-8 w-auto" />
          <div className="leading-none">
            <span className="font-bold text-lg">Admin Panel</span>
            <span className="block text-muted-foreground text-xs">Rankfastlinks.com</span>
          </div>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <span className="text-lg">🔔</span>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
              3
            </Badge>
          </Button>

          {/* Admin User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <span className="hidden md:block">{user?.name || "Admin User"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                <Link href="/admin/profile" className="flex items-center w-full">
                  <span className="mr-2">👤</span>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                <Link href="/admin/settings" className="flex items-center w-full">
                  <span className="mr-2">⚙️</span>
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                <Link href="/" className="flex items-center w-full">
                  <span className="mr-2">🌐</span>
                  View Site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:bg-red-50 cursor-pointer" onClick={handleLogout}>
                <span className="mr-2">🚪</span>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
