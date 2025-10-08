"use client"

import { Menu, User } from "lucide-react"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter()
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8080/fast-rank-backend/users.php", {
        method: "GET"
      });
      console.log(res);
      
      const text = await res.text();
      const userData = JSON.parse(text);
      console.log(userData);
      
      if (userData) {
        const user_id = localStorage.getItem('user_id')
        const getUser = userData.find((item: any) => item.user_email === user_id);
        console.log(getUser);
        
        setUser(getUser)
      } else {
        setUser(null)
      }
    }
    // Load user data
    fetchUser();
  }, [])

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn || userLoggedIn === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/login')
    }
  }, [])


  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      // Clear all user data
      try {
        const userEmail = localStorage.getItem("user_id") || user?.user_email; // Assuming stored during login
        if (!userEmail) throw new Error("User not logged in");

        const res = await fetch("http://localhost:8080/fast-rank-backend/user-logout.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user?.id, balance: 0 }),
        });

        const data = await res.json();
        if (userEmail) {
          localStorage.removeItem("user_id")
          localStorage.removeItem("isLoggedIn")
          toast.success("Logged out successfully. All data has been deleted.");
          // Redirect to home page
          router.push("/")
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        toast.error(`Logout failed:  ${error.message}`);
      }
    };
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/5 backdrop-blur shadow-lg shadow-accent-foreground/30 supports-[backdrop-filter]:bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="leading-none">
                <span className="text-Secondary-foreground font-bold text-xl">Rank Fast Link</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <Link
              href="/marketplace"
              className="text-secondary-foreground hover:text-secondary-foreground/70 transition-colors font-medium"
            >
              Marketplace
            </Link>
            <Link
              href="/services"
              className="text-secondary-foreground hover:text-secondary-foreground/70 transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/packages"
              className="text-secondary-foreground hover:text-secondary-foreground/70 transition-colors font-medium"
            >
              Packages
            </Link>
            <Link
              href="/blog"
              className="text-secondary-foreground hover:text-secondary-foreground/70 transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/support"
              className="text-secondary-foreground hover:text-secondary-foreground/70 transition-colors font-medium"
            >
              Support
            </Link>
          </nav>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {isAuthenticated ? (
              <>
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-secondary-foreground hover:bg-primary-foreground/10"
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">{user?.user_nicename}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <DropdownMenuItem>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden md:inline-block">
                  <Button variant="ghost" size="sm" className="text-secondary-foreground hover:bg-primary-foreground/10">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="hidden md:inline-block">
                  <Button size="sm" className="bg-secondary-foreground text-white border border-accent-foreground hover:bg-accent-foreground/80">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-primary-foreground">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {!isAuthenticated && (
                  <>
                    <DropdownMenuItem>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/signup">Sign Up</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="border-t mt-2 pt-2">
                      <span className="text-muted-foreground text-xs">Navigation</span>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem>
                  <Link href="/marketplace">Marketplace</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/services">Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/packages">Packages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/blog">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/support">Support</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Search - Removed as it was empty */}
    </header>
  )
}

export default Header
