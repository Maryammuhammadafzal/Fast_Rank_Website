"use client"

import type React from "react"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"

export default function AdminProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, changeUsername, changePassword } = useAuth()

  // Username change state
  const [newName, setNewName] = useState(user?.name || "")
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const [nameMessage, setNameMessage] = useState("")

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState("")

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingName(true)
    setNameMessage("")

    try {
      const result = await changeUsername(newName)
      if (result.success) {
        setNameMessage("Name updated successfully!")
      } else {
        setNameMessage(result.error || "Failed to update name")
      }
    } catch (error) {
      setNameMessage("An error occurred while updating name")
    } finally {
      setIsUpdatingName(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingPassword(true)
    setPasswordMessage("")

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match")
      setIsUpdatingPassword(false)
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage("Password must be at least 6 characters long")
      setIsUpdatingPassword(false)
      return
    }

    try {
      const result = await changePassword(currentPassword, newPassword)
      if (result.success) {
        setPasswordMessage("Password updated successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setPasswordMessage(result.error || "Failed to update password")
      }
    } catch (error) {
      setPasswordMessage("An error occurred while updating password")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile Settings</h1>
              <p className="text-gray-600">Manage your account information and security settings</p>
            </div>

            {/* Profile Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <span>👤</span>
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update your personal information and display name
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNameUpdate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-gray-50 border-gray-300"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <Label htmlFor="role" className="text-gray-700">
                        Role
                      </Label>
                      <Input
                        id="role"
                        value={user?.role || ""}
                        disabled
                        className="bg-gray-50 border-gray-300 capitalize"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-white border-gray-300"
                      required
                    />
                  </div>

                  {nameMessage && (
                    <div
                      className={`p-3 text-sm rounded-md ${
                        nameMessage.includes("successfully")
                          ? "text-green-600 bg-green-50 border border-green-200"
                          : "text-red-600 bg-red-50 border border-red-200"
                      }`}
                    >
                      {nameMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isUpdatingName || newName === user?.name}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    {isUpdatingName ? "Updating..." : "Update Name"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <span>🔒</span>
                  Change Password
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-gray-700">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-white border-gray-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newPassword" className="text-gray-700">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-white border-gray-300"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-gray-700">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-white border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  {passwordMessage && (
                    <div
                      className={`p-3 text-sm rounded-md ${
                        passwordMessage.includes("successfully")
                          ? "text-green-600 bg-green-50 border border-green-200"
                          : "text-red-600 bg-red-50 border border-red-200"
                      }`}
                    >
                      {passwordMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    {isUpdatingPassword ? "Updating..." : "Change Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <span>📊</span>
                  Account Information
                </CardTitle>
                <CardDescription className="text-gray-600">View your account details and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Account ID</Label>
                    <p className="text-sm text-gray-900 font-mono">{user?.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-700">Member Since</Label>
                    <p className="text-sm text-gray-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
