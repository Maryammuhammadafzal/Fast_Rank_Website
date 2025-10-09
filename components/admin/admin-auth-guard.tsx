"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user , setUser] = useState(null)
  // const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

   useEffect(() => {
      const adminLoggedIn = localStorage.getItem('admin-authenticated');
      if (adminLoggedIn || adminLoggedIn === 'true') {
        setIsAuthenticated(true)
      }

      
    }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/admin/login")
        return
      }

  //     if (user?.role !== "admin") {
  //       router.push("/dashboard")
  //       return
  //     }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // if (!isAuthenticated || user?.role !== "admin") {
  //   return null
  // }

  return <>{children}</>
}
