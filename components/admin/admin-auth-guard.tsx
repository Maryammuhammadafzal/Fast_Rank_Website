"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

interface User {
  name: string,
  email: string,
  role: string
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  // const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  const fetchUser = async () => {
    const res = await fetch("http://localhost:8080/fast-rank-backend/users.php", {
      method: "GET"
    });
    console.log(res);

    const text = await res.text();
    const userData = JSON.parse(text);

    if (userData) {
      const adminEmail = localStorage.getItem('adminEmail')
      const getUser = userData.find((item: any) => item.user_email === adminEmail);

      setUser(getUser)
      setIsLoading(false)
    } else {
      setUser(null)
      setIsLoading(false)
    }
  }


  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin-authenticated');
    if (adminLoggedIn || adminLoggedIn === 'true') {
      setIsAuthenticated(true)
    }

    // Load user data
    fetchUser();

  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/admin/login")
        return
      }

      if (user?.role !== "admin") {
        router.push("/dashboard")
        return
      }
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
