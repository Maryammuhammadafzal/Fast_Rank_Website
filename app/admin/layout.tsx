import type React from "react"
import type { Metadata } from "next"
import { AdminAuthGuard } from "@/components/admin/admin-auth-guard"

export const metadata: Metadata = {
  title: "Admin Panel - Rankfastlinks.com",
  description: "Administrative dashboard for managing the Rankfastlinks platform",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>
}
