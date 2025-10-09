"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "customer",
    status: "active",
    joinDate: "2024-01-15",
    totalSpent: 1247,
    totalOrders: 8,
    lastLogin: "2024-01-25",
    profile_image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "seller",
    status: "active",
    joinDate: "2024-01-10",
    totalSpent: 0,
    totalOrders: 0,
    lastLogin: "2024-01-24",
    profile_image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "customer",
    status: "suspended",
    joinDate: "2024-01-20",
    totalSpent: 450,
    totalOrders: 3,
    lastLogin: "2024-01-22",
    profile_image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-05",
    totalSpent: 0,
    totalOrders: 0,
    lastLogin: "2024-01-25",
    profile_image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "customer",
    status: "inactive",
    joinDate: "2024-01-12",
    totalSpent: 890,
    totalOrders: 5,
    lastLogin: "2024-01-18",
    profile_image: "/placeholder.svg",
  },
]

interface Users {
  id: number,
  user_nicename: string,
  user_email: string,
  role: string,
  user_status: string,
  user_registered: string,
  // totalSpent: number,
  user_order: number,
  lastLogin: string,
  profile_image: string,
}

export default function UserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState<Users[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Get All Users
  const fetchUser = async () => {
    const res = await fetch("http://localhost:8080/fast-rank-backend/users.php", {
      method: "GET"
    });

    const text = await res.text();
    const userData = JSON.parse(text);

    if (userData) {
      setUsers(userData)
    } else {
      setUsers(null)
    }
  }
  useEffect(() => {
    // Load user data
    fetchUser();
  }, []);

  // Filter users based on search and filters
  const filteredUsers = users?.filter((user: any) => {
    const matchesSearch =
      user.user_nicename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.user_status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "seller":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "customer":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleDeleteUser = (userId: number) => {
    if (users) {
      setUsers(users.filter((user) => user.id !== userId))
    } else {
      toast.error("User Not Found")
    }
  }

  const handleAddUser = (formData: FormData) => {
    if (users) {
      const newUser = {
        // id: Math.max(...users.map((u) => u.id)) + 1,
        user_name: formData.get("name") as string,
        user_email: formData.get("email") as string,
        user_pass: formData.get("email") as string,
        role: formData.get("role") as string,
        user_status: "active",
        user_registered: new Date().toISOString().split("T")[0],
        // totalSpent: 0,
        user_order: 0,
        // lastLogin: "Never",
        // profile_image: "/placeholder.svg",
      }

      console.log(newUser);
      

      const addUser = async () => {
        try {
          const res = await fetch("http://localhost:8080/fast-rank-backend/user-registered.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
          
          const text = await res.text();
          const data = JSON.parse(text);
  
          if (data) {
            fetchUser();
            toast.success('User Added Successfully');
            setIsAddDialogOpen(false)
          } else {
            toast.error("User Not Added");
          }
        }
        catch (err) {
          console.log(err);
          
        }
      }
      // Add New user
      addUser()
    }

  }

  const handleEditUser = (formData: FormData) => {
    if (!selectedUser) return
    if (users) {

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
            ...user,
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            role: formData.get("role") as string,
            status: formData.get("status") as string,
          }
          : user,
      )
      setUsers(updatedUsers)
      setIsEditDialogOpen(false)
      setSelectedUser(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Add, edit, delete, and manage users</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    <span className="mr-2">➕</span>
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Add New User</DialogTitle>
                    <DialogDescription className="text-gray-600">Create a new user account</DialogDescription>
                  </DialogHeader>
                  <form action={handleAddUser} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter full name"
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role" className="text-gray-700">
                        Role
                      </Label>
                      <Select name="role" required>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800">
                        Add User
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{users?.length}</p>
                    </div>
                    <span className="text-2xl">👥</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {users?.filter((u) => u.user_status === "active").length}
                      </p>
                    </div>
                    <span className="text-2xl">✅</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Customers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {users?.filter((u) => u.role === "customer").length}
                      </p>
                    </div>
                    <span className="text-2xl">🛒</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sellers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {users?.filter((u) => u.role === "seller").length}
                      </p>
                    </div>
                    <span className="text-2xl">💼</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6 bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                      <Input
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-32 bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32 bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Users ({filteredUsers?.length})</CardTitle>
                <CardDescription className="text-gray-600">Manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-700">User</TableHead>
                      <TableHead className="text-gray-700">Role</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-gray-700">Join Date</TableHead>
                      <TableHead className="text-gray-700">Total Spent</TableHead>
                      <TableHead className="text-gray-700">Orders</TableHead>
                      <TableHead className="text-gray-700">Last Login</TableHead>
                      <TableHead className="text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers?.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user?.user_nicename
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user?.user_nicename}</p>
                              <p className="text-sm text-gray-600">{user.user_email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.user_status)}>{user.user_status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{new Date(user.user_registered).toLocaleDateString()}</TableCell>
                        {/* <TableCell className="text-gray-700">${user?.totalSpent.toString()}</TableCell> */}
                        <TableCell className="text-gray-700">$500</TableCell>
                        <TableCell className="text-gray-700">{user?.user_order}</TableCell>
                        <TableCell className="text-gray-700">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsViewDialogOpen(true)
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              👁️
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsEditDialogOpen(true)
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              ✏️
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  🗑️
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-gray-900">Delete User</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600">
                                    Are you sure you want to delete {user?.user_nicename}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* View User Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">User Details</DialogTitle>
                  <DialogDescription className="text-gray-600">Complete information about the user</DialogDescription>
                </DialogHeader>
                {selectedUser && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-700">
                          {selectedUser.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                        <p className="text-gray-600">{selectedUser.email}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getRoleColor(selectedUser.role)}>{selectedUser.role}</Badge>
                          <Badge className={getStatusColor(selectedUser.status)}>{selectedUser.status}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Join Date</Label>
                          <p className="text-sm text-gray-900">
                            {new Date(selectedUser.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Last Login</Label>
                          <p className="text-sm text-gray-900">{selectedUser.lastLogin}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Total Spent</Label>
                          <p className="text-sm font-semibold text-gray-900">
                            ${selectedUser.totalSpent.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Total Orders</Label>
                          <p className="text-sm text-gray-900">{selectedUser.totalOrders}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Edit User</DialogTitle>
                  <DialogDescription className="text-gray-600">Update user information</DialogDescription>
                </DialogHeader>
                {selectedUser && (
                  <form action={handleEditUser} className="space-y-4">
                    <div>
                      <Label htmlFor="edit-name" className="text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="edit-name"
                        name="name"
                        defaultValue={selectedUser.name}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email" className="text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="edit-email"
                        name="email"
                        type="email"
                        defaultValue={selectedUser.email}
                        required
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-role" className="text-gray-700">
                        Role
                      </Label>
                      <Select name="role" defaultValue={selectedUser.role}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-status" className="text-gray-700">
                        Status
                      </Label>
                      <Select name="status" defaultValue={selectedUser.status}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditDialogOpen(false)
                          setSelectedUser(null)
                        }}
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800">
                        Update User
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  )
}
