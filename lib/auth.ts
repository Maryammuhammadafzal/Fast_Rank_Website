// Simple authentication utilities
export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock users database (in production, this would be a real database)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@marketplace.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "John Doe",
    role: "user" as const,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  constructor() {
    // Check for existing session on initialization
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("currentUser")
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser)
      }
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const { password: _, ...userWithoutPassword } = user
    this.currentUser = userWithoutPassword

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
    }

    return { success: true, user: userWithoutPassword }
  }

  async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === email)
    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: "user" as const,
      createdAt: new Date().toISOString(),
    }

    MOCK_USERS.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    this.currentUser = userWithoutPassword

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
    }

    return { success: true, user: userWithoutPassword }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: "Not authenticated" }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = MOCK_USERS.find((u) => u.id === this.currentUser!.id)
    if (!user || user.password !== currentPassword) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Update password
    user.password = newPassword
    return { success: true }
  }

  async changeUsername(newName: string): Promise<{ success: boolean; user?: User; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: "Not authenticated" }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = MOCK_USERS.find((u) => u.id === this.currentUser!.id)
    if (!user) {
      return { success: false, error: "User not found" }
    }

    // Update name
    user.name = newName
    const updatedUser = { ...this.currentUser, name: newName }
    this.currentUser = updatedUser

    // Update localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }

    return { success: true, user: updatedUser }
  }

  logout(): void {
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }

  isAdmin(): boolean {
    return this.currentUser?.role === "admin"
  }
}
