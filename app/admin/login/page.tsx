"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/contexts/auth-context"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  // const { login } = useAuth()
  const router = useRouter()

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // try {
    //   const result = await login(email, password)
    //   if (result.success) {
    //     const authService = (await import("@/lib/auth")).AuthService.getInstance()
    //     const currentUser = authService.getCurrentUser()

    //     if (currentUser?.role === "admin") {
    //       router.push("/admin")
    //     } else {
    //       setError("Access denied. Admin credentials required.")
    //       authService.logout()
    //     }
    //   } else {
    //     setError(result.error || "Login failed")
    //   }
    // } catch (err) {
    //   setError("An unexpected error occurred")
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">Admin Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access the admin panel</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Administrator Access</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your admin credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 bg-background border-input text-foreground"
                    placeholder="admin@marketplace.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 bg-background border-input text-foreground"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">Demo Admin: admin@marketplace.com / admin123</p>
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Regular User Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
