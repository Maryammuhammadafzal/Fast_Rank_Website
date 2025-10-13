"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  MessageCircle,
  Download,
  Eye,
  DollarSign,
  Home,
  Package,
  FileText,
  PenTool,
  Menu,
  X,
  Wallet,
  CreditCard,
  ArrowUpCircle,
  Loader2,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for dashboard
const mockOrders = [
  {
    id: "ORD-001",
    title: "High-Authority Tech Blog Guest Post",
    seller: "TechContent Pro",
    price: 297,
    status: "completed",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-18",
    rating: 5,
    hasReview: true,
    progress: 100,
    deliverables: [
      { name: "Guest Post Article", type: "document", url: "#" },
      { name: "Publication Report", type: "pdf", url: "#" },
      { name: "Social Media Assets", type: "zip", url: "#" },
    ],
  },
  {
    id: "ORD-002",
    title: "SEO-Optimized Article Writing Package",
    seller: "ContentMaster",
    price: 247,
    status: "processing",
    orderDate: "2024-01-20",
    deliveryDate: "2024-01-25",
    rating: null,
    hasReview: false,
    progress: 75,
    deliverables: [],
  },
  {
    id: "ORD-003",
    title: "Health & Wellness Link Insertion",
    seller: "LinkBuilder Pro",
    price: 75,
    status: "pending", // Added missing status property
    orderDate: "2024-01-22",
    deliveryDate: "2024-01-24",
    rating: null,
    hasReview: false,
    progress: 25,
    deliverables: [],
  },
  {
    id: "ORD-004",
    title: "Business & Finance Guest Post Package",
    seller: "FinanceWriter",
    price: 450,
    status: "revision",
    orderDate: "2024-01-18",
    deliveryDate: "2024-01-23",
    rating: null,
    hasReview: false,
    progress: 90,
    deliverables: [],
  },
]



const sidebarItems = [
  { name: "Overview", value: "overview", icon: Home, active: true },
  { name: "My Orders", value: "orders", icon: ShoppingBag },
  { name: "Add Funds", value: "add-funds", icon: Wallet },
  { name: "Reviews", value: "reviews", icon: Star },
  // { name: "Quick Actions", value: "quick-actions", icon: Package },
  { name: "Account Summary", value: "account-summary", icon: PenTool },
  { name: "Billing Information", value: "billing", icon: DollarSign },
  { name: "Settings", value: "settings", icon: FileText },
]

interface User {
  user_nicename: string,
  user_email: string,
  user_phone: string,
  user_company: string,
  user_registered: string,
  user_bio: string,
  user_url: string,
  user_address: string,
  user_pass: string
  role: string,
  id: number,
  user_status: string,
  balance: string,
  user_spent: number,
  total_funds: number
}

interface PaymentMethod {
  id: number;
  card_number_last4: string;
  expiry_month: number;
  expiry_year: number;
  card_type: string;
  name_on_card: string;
  is_default: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [fundAmount, setFundAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card-4242")
  const [user, setUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]); // Load from backend
  const [paypalEmail, setPaypalEmail] = useState(""); // New state for PayPal email
  const [otp, setOtp] = useState(""); // New state for OTP
  const [isOtpRequired, setIsOtpRequired] = useState(false);

  // Function to get month and year
  const getMonthAndYear = (date: Date | string | undefined) => {
    if (!date) return "Unknown"; // Handle undefined user_registered
    const d = new Date(date); // Convert to Date object
    if (isNaN(d.getTime())) return "Invalid Date"; // Handle invalid date
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${year}`; // e.g., "October 2025"
  };
  // Mock data for billing history (replace with fetch from backend)
  const billingHistory = [
    { id: "ORD-001", date: "January 15, 2024", amount: "$297.00" },
    { id: "ORD-002", date: "January 20, 2024", amount: "$247.00" },
  ];

  const [mockStats, setMockStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    avgRating: 4.8,
    savedAmount: 450,
  })


  const router = useRouter();

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

  useEffect(() => {
    // Load user data
    fetchUser();
  }, []);

  const fetchOrder = async () => {
    const res = await fetch("http://localhost:8080/fast-rank-backend/orders.php", {
      method: "GET"
    });
    console.log(res);

    const text = await res.text();
    const ordersData = JSON.parse(text);
    console.log(ordersData);

    if (ordersData) {
      const user_id = localStorage.getItem('user_id')
      const getOrder = ordersData.find((item: any) => item.user_email === user_id);
      console.log(getOrder);

      setUser(getOrder)
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    // Load user data
    fetchOrder();
  }, []);



  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn || userLoggedIn === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (user) {
      // Load user stats

      const loadOrders = async () => {
        const user_id = localStorage.getItem('user_id')
        try {
          const res = await fetch("https://guestpostnow.io/guestpost-backend/orders.php", {
            method: "GET"
          });
          const text = await res.text();
          const data = JSON.parse(text);
          // Filter data
          const allOrders = data.data;
          const orders = allOrders && allOrders.filter((order: any) => order.user_id === user_id);

          // Store data
          // const balance = Math.abs(user?.balance)
          const totalOrders = orders ? orders.length : 0
          const activeOrders = orders ? orders.filter(
            (order: any) => order.status === "pending" || order.status === "processing",
          ).length : 0
          const completedOrders = orders ? orders.filter(
            (order: any) => order.status === "completed" || order.status === "complete",
          ).length : 0
          const totalSpent = orders ? orders.reduce(
            (sum: number, order: any) => sum + (parseInt(order.price) || 0),
            0,
          ) : 0

          setMockStats({
            totalOrders: orders.length,
            activeOrders: activeOrders,
            completedOrders: completedOrders,
            totalSpent: totalSpent,
            avgRating: 4.8,
            savedAmount: 450,
          })

        } catch (error) {
          console.error("Error loading admin orders:", error)
        }
      }

      loadOrders()
    }
  }, [user])

  // Load payment methods (call on mount or refresh)
  const loadPaymentMethods = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/fast-rank-backend/payment-methods-get.php?user_id=${user?.id}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);

      if (data.status === "success") {
        setPaymentMethods(data.data || []);
      } else {
        console.log(data.message);

        toast.error("Failed to load payment methods");
      }
    } catch (error) {
      toast.error("Error loading payment methods");
      console.error("Error loading payment methods", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, [user?.id]);

  // Add payment method
  const handleAddPaymentMethod = async (formData: FormData) => {
    const paymentType = formData.get("paymentType") as string || "card";
    if (paymentType === "paypal") {
      if (!paypalEmail) {
        toast.error("Please enter your PayPal email.");
        return;
      }
      if (isOtpRequired) {
        if (!otp) {
          toast.error("Please enter the OTP.");
          return;
        }
        // Verify OTP with backend
        const verifyResponse = await fetch("http://localhost:8080/fast-rank-backend/verify-otp.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user?.id, paypal_email: paypalEmail, otp }),
        });
        const verifyData = await verifyResponse.json();
        if (verifyData.status !== "success") {
          toast.error(verifyData.message || "OTP verification failed.");
          return;
        }
        setIsOtpRequired(false); // OTP verified, no longer required
      } else {
        // Request OTP for first-time setup
        const otpResponse = await fetch("http://localhost:8080/fast-rank-backend/request-otp.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user?.id, paypal_email: paypalEmail }),
        });
        const otpData = await otpResponse.json();
        if (otpData.status === "success") {
          toast.success("OTP sent to your PayPal email. Please enter it.");
          setIsOtpRequired(true);
          return;
        } else {
          toast.error(otpData.message || "Failed to request OTP.");
          return;
        }
      }
    }

    const newMethod = {
      user_id: user?.id || 13, // Use dynamic user_id if available
      card_number: paymentType === "card" ? (formData.get("cardNumber") as string) : null,
      expiry_month: paymentType === "card" ? parseInt(formData.get("expiryMonth") as string) : null,
      expiry_year: paymentType === "card" ? parseInt(formData.get("expiryYear") as string) : null,
      card_type: paymentType === "card" ? (formData.get("cardType") as string || "visa") : null,
      name_on_card: paymentType === "card" ? (formData.get("nameOnCard") as string) : null,
      paypal_email: paymentType === "paypal" ? paypalEmail : null,
      payment_type: paymentType,
    };
    console.log(newMethod);

    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/payment-methods-add.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMethod),
      });
      const data = await res.json();
      console.log(data);

      if (data.status === "success") {
        toast.success("Payment method added successfully");
        setIsAddDialogOpen(false);
        setPaypalEmail(""); // Reset PayPal email
        setOtp(""); // Reset OTP
        setIsOtpRequired(false); // Reset OTP requirement
        loadPaymentMethods();
      } else {
        toast.error(data.message || "Failed to add payment method");
      }
    } catch (error) {
      toast.error("Error adding payment method");
    }
  };

  // Edit payment method
  const handleEditPaymentMethod = async (formData: FormData) => {
    if (!selectedMethod) return;
    const updatedMethod = {
      id: selectedMethod.id,
      user_id: 13,
      card_number: formData.get("cardNumber") as string,
      expiry_month: parseInt(formData.get("expiryMonth") as string),
      expiry_year: parseInt(formData.get("expiryYear") as string),
      card_type: formData.get("cardType") as string || "visa",
      name_on_card: formData.get("nameOnCard") as string,
    };
    console.log(updatedMethod);

    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/payment-methods-edit.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMethod),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Payment method updated successfully");
        setIsEditDialogOpen(false);
        setSelectedMethod(null);
        loadPaymentMethods();
      } else {
        toast.error(data.message || "Failed to update payment method");
      }
    } catch (error) {
      toast.error("Error updating payment method");
    }
  };

  // Delete payment method
  const handleDeletePaymentMethod = async (id: number) => {
    if (!confirm("Are you sure you want to delete this payment method?")) return;
    try {
      const res = await fetch(`http://localhost:8080/fast-rank-backend/payment-methods-delete.php?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Payment method deleted successfully");
        loadPaymentMethods();
      } else {
        toast.error(data.message || "Failed to delete payment method");
      }
    } catch (error) {
      toast.error("Error deleting payment method");
    }
  };

  // Set default payment method
  const handleSetDefault = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/fast-rank-backend/payment-methods-set-default.php?id=${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Default payment method updated");
        loadPaymentMethods();
      } else {
        toast.error(data.message || "Failed to update default");
      }
    } catch (error) {
      toast.error("Error updating default");
    }
  };

  const handleAddFunds = async (amount: string, paymentMethodId?: string) => {
    if (!user?.id) {
      toast.error("User not authenticated. Please log in.");
      return;
    }
    if (!amount || Number.parseFloat(amount) < 10) {
      toast.error("Please enter an amount of $10 or more.");
      return;
    }
    if (!selectedPaymentMethod || selectedPaymentMethod === "new-card") {
      toast.error("Please select a valid payment method or add a new card.");
      return;
    }

    setIsLoading(true);
    try {
      const paymentMethod = paymentMethods.find((m) => m.card_number_last4 === selectedPaymentMethod);
      const payload = {
        user_id: user?.id,
        amount: Number.parseFloat(amount).toFixed(2),
        payment_method_id: paymentMethod?.id, // Ensure this is an integer or null
        payment_type: paymentMethod?.card_type || "card", // Default to "card" if not specified
        requestDate: new Date().toISOString(),
        processedBy: user?.user_email || null,
      };

      console.log("Payload:", payload);

      const res = await fetch("http://localhost:8080/fast-rank-backend/funds-request-add.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response:", res);

      const text = await res.text(); // Always get text first
      console.log("Raw Response:", text);

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw Text:", text);
        toast.error("Invalid server response. Check logs.");
        return;
      }

      console.log("Parsed Data:", data);

      if (data.status === "success") {
        try {
          const newbalance = (parseFloat(user.balance || "0") + parseFloat(amount)).toFixed(2); // Update locally
          const totalFunds = user.total_funds + parseInt(amount)

          const res = await fetch("http://localhost:8080/fast-rank-backend/user-update.php", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user?.id,
              balance: newbalance,
              total_funds: totalFunds
            }),
          });

          const text = await res.text();
          const data = JSON.parse(text);
          console.log(data);

          if (data.status === "success") {
            toast.success("Funds request submitted successfully!");
            setFundAmount(""); // Reset form
            fetchUser()
          }

        } catch (err) {
          console.log(err);
          toast.error("Failed to add balance")

        }
      } else {
        toast.error(data.message || "Failed to add funds.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error adding funds: " + (error || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (!status) return "bg-muted text-muted-foreground border-border"

    switch (status) {
      case "completed":
        return "bg-accent/10 text-accent-foreground border-accent/20"
      case "processing":
        return "bg-primary/10 text-primary border-primary/20"
      case "pending":
        return "bg-muted text-muted-foreground border-border"
      case "revision":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    if (!status) return <Clock className="h-4 w-4" />

    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "revision":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="p-4 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 hidden lg:block">Dashboard Pages</h3>
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.value)
                    setSidebarOpen(false)
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted w-full text-left ${activeTab === item.value
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 py-28">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">Manage your orders and track your progress</p>
                </div>
              </div>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/marketplace">Browse Services</Link>
              </Button>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="overview" className="space-y-6">
                {/* Prominent dashboard stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Account Balance</p>
                          <p className="text-2xl font-bold text-secondary">${user?.balance}</p>
                        </div>
                        <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-secondary" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Available for new orders</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                          <p className="text-2xl font-bold">{mockStats.activeOrders}</p>
                        </div>
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Currently in progress</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Completed Orders</p>
                          <p className="text-2xl font-bold">{mockStats.completedOrders}</p>
                        </div>
                        <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-accent-foreground" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Successfully delivered</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                          <p className="text-2xl font-bold">${mockStats.totalSpent.toLocaleString()}</p>
                        </div>
                        <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Lifetime investment</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your latest service orders and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold">{order.title}</h4>
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1 capitalize">
                                  {order.status ? order.status.replace("-", " ") : "Unknown"}
                                </span>{" "}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Order #{order.id}</span>
                              <span>•</span>
                              <span>{order.seller}</span>
                              <span>•</span>
                              <span>${order.price}</span>
                            </div>
                            {order.status === "processing" && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{order.progress}%</span>
                                </div>
                                <Progress value={order.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {order.status === "completed" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Link href="#" onClick={() => setActiveTab("orders")}>
                          View All Orders
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12">
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        <Link href="/marketplace">Browse New Services</Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                        <MessageCircle className="h-5 w-5 mr-3" />
                        Contact Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                        <Star className="h-5 w-5 mr-3" />
                        Leave a Review
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                        <Download className="h-5 w-5 mr-3" />
                        Download Reports
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Account Details</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Member since</span>
                              <span>{user?.user_registered.slice(0, 11)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Account status</span>
                              <Badge className="bg-accent/10 text-accent-foreground capitalize border-accent/20">{user?.user_status}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Verification status</span>
                              <Badge className="bg-primary/10 text-primary border-primary/20">{user?.user_status === 'active' ? 'Verified' : 'Not Verified'}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold">Activity Summary</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Orders completed</span>
                              <span>{mockStats.completedOrders}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Average rating given</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>4.6</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total savings</span>
                              <span className="text-secondary font-semibold">${user?.balance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>Complete history of your service orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-lg">{order.title}</h4>
                                <Badge className={getStatusColor(order.status)}>
                                  {getStatusIcon(order.status)}
                                  <span className="ml-1 capitalize">
                                    {order.status ? order.status.replace("-", " ") : "Unknown"}
                                  </span>{" "}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <span className="block font-medium text-foreground">Order ID</span>
                                  {order.id}
                                </div>
                                <div>
                                  <span className="block font-medium text-foreground">Seller</span>
                                  {order.seller}
                                </div>
                                <div>
                                  <span className="block font-medium text-foreground">Order Date</span>
                                  {new Date(order.orderDate).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="block font-medium text-foreground">Price</span>${order.price}
                                </div>
                              </div>
                            </div>
                          </div>

                          {order.status === "processing" && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="font-medium">Progress</span>
                                <span>{order.progress}%</span>
                              </div>
                              <Progress value={order.progress} className="h-2" />
                              <p className="text-sm text-muted-foreground mt-2">
                                Expected delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}

                          {order.status === "completed" && order.deliverables.length > 0 && (
                            <div className="mb-4">
                              <h5 className="font-medium mb-2">Deliverables</h5>
                              <div className="space-y-2">
                                {order.deliverables.map((deliverable, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-muted/50 rounded"
                                  >
                                    <span className="text-sm">{deliverable.name}</span>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {order.status === "completed" && order.rating && (
                                <div className="flex items-center gap-1">
                                  <span className="text-sm text-muted-foreground">Your rating:</span>
                                  <div className="flex items-center">
                                    {Array.from({ length: order.rating }).map((_, i) => (
                                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Contact Seller
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                              {order.status === "completed" && !order.hasReview && (
                                <Button
                                  size="sm"
                                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                >
                                  <Star className="h-4 w-4 mr-1" />
                                  Leave Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Reviews</CardTitle>
                    <CardDescription>Reviews you've left for completed orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>TC</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">High-Authority Tech Blog Guest Post</h4>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">TechContent Pro • Order #ORD-001</p>
                            <p className="text-sm mb-3">
                              "Excellent service! The guest post was published on a high-quality tech blog and we saw
                              immediate traffic increase. The writing quality was outstanding and perfectly matched our
                              brand voice. Highly recommended!"
                            </p>
                            <p className="text-xs text-muted-foreground">Reviewed on January 20, 2024</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No more reviews to show</p>
                        <Button variant="outline">
                          <Link href="#" onClick={() => setActiveTab("orders")}>
                            View Pending Reviews
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Manage your account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <p className="text-sm text-muted-foreground">John Doe</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Member Since</label>
                        <p className="text-sm text-muted-foreground">January 2024</p>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose how you want to be notified</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Order Updates</p>
                          <p className="text-xs text-muted-foreground">Get notified about order status changes</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">New Services</p>
                          <p className="text-xs text-muted-foreground">Notifications about new services</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Disabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Promotions</p>
                          <p className="text-xs text-muted-foreground">Special offers and discounts</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quick-actions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Frequently used actions and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="w-full justify-start bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12">
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        <Link href="/marketplace">Browse New Services</Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                        <MessageCircle className="h-5 w-5 mr-3" />
                        Contact Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                        <Star className="h-5 w-5 mr-3" />
                        Leave a Review
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                        <Download className="h-5 w-5 mr-3" />
                        Download Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account-summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Summary</CardTitle>
                    <CardDescription>Overview of your account details and activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Account Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Member since</span>
                            <span>{getMonthAndYear(new Date(user?.user_registered))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account status</span>
                            <Badge className="bg-accent/10 text-accent-foreground border-accent/20">Active</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Verification status</span>
                            <Badge className="bg-primary/10 text-primary border-primary/20">Verified</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Activity Summary</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Orders completed</span>
                            <span>{mockStats.completedOrders}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Average rating given</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>4.6</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total savings</span>
                            <span className="text-secondary font-semibold">${mockStats.savedAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Manage your payment methods and billing history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Payment Methods</h4>
                      {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span>Loading payment methods...</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {paymentMethods.length === 0 ? (
                            <p className="text-muted-foreground">No payment methods added yet.</p>
                          ) : (
                            paymentMethods.map((method) => (
                              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-secondary/10 rounded flex items-center justify-center">
                                    <CreditCard className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {method.paypal_email ? `PayPal: ${method.paypal_email}` : `•••• •••• •••• ${method.card_number_last4}`}
                                    </p>
                                    {method.paypal_email ? null : (
                                      <>
                                        <p className="text-xs text-muted-foreground">
                                          Expires {method.expiry_month}/{method.expiry_year}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{method.name_on_card}</p>
                                        <p className="text-xs text-muted-foreground">{method.card_type}</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => { setSelectedMethod(method); setIsEditDialogOpen(true); }}>
                                    Edit
                                  </Button>
                                  <Dialog open={isEditDialogOpen && selectedMethod?.id === method.id} onOpenChange={() => { setSelectedMethod(null); setIsEditDialogOpen(false); }}>
                                    <DialogTrigger />
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Payment Method</DialogTitle>
                                        <DialogDescription>Update your payment details</DialogDescription>
                                      </DialogHeader>
                                      <form onSubmit={(e) => { e.preventDefault(); handleEditPaymentMethod(new FormData(e.currentTarget)); }} className="space-y-4">
                                        {/* Similar fields as add dialog, adjust for PayPal if needed */}
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                  <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)} disabled={method.is_default}>
                                    {method.is_default ? "Default" : "Set Default"}
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeletePaymentMethod(method.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="bg-transparent w-full mt-2">
                            Add Payment Method
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Payment Method</DialogTitle>
                            <DialogDescription>Add a new payment method</DialogDescription>
                          </DialogHeader>
                          <form onSubmit={(e) => { e.preventDefault(); handleAddPaymentMethod(new FormData(e.currentTarget)); }} className="space-y-4">
                            <div>
                              <Label>Payment Type</Label>
                              <Select name="paymentType" defaultValue="card" onValueChange={(value) => setIsOtpRequired(value === "paypal" && !paymentMethods.some(m => m.paypal_email))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="card">Card</SelectItem>
                                  <SelectItem value="paypal">PayPal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {formData.get("paymentType") === "card" || !formData.get("paymentType") ? (
                              <>
                                <div>
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" type="text" inputMode="numeric" pattern="[0-9]{16}" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="expiryMonth">Expiry Month</Label>
                                    <Input id="expiryMonth" name="expiryMonth" type="number" placeholder="MM" min={1} max={12} required />
                                  </div>
                                  <div>
                                    <Label htmlFor="expiryYear">Expiry Year</Label>
                                    <Input id="expiryYear" name="expiryYear" type="number" placeholder="YY" min={25} required />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" name="cvv" type="number" placeholder="123" maxLength={3} required />
                                  </div>
                                  <div>
                                    <Label htmlFor="cardType">Card Type</Label>
                                    <Select name="cardType" defaultValue="visa" required>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select card type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="visa">Visa</SelectItem>
                                        <SelectItem value="mastercard">Mastercard</SelectItem>
                                        <SelectItem value="amex">American Express</SelectItem>
                                        <SelectItem value="discover">Discover</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="nameOnCard">Name on Card</Label>
                                  <Input id="nameOnCard" name="nameOnCard" placeholder="John Doe" required />
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <Label htmlFor="paypalEmail">PayPal Email</Label>
                                  <Input
                                    id="paypalEmail"
                                    name="paypalEmail"
                                    type="email"
                                    value={paypalEmail}
                                    onChange={(e) => setPaypalEmail(e.target.value)}
                                    placeholder="yourpaypal@email.com"
                                    required
                                  />
                                </div>
                                {isOtpRequired && (
                                  <div>
                                    <Label htmlFor="otp">OTP</Label>
                                    <Input
                                      id="otp"
                                      name="otp"
                                      type="text"
                                      value={otp}
                                      onChange={(e) => setOtp(e.target.value)}
                                      placeholder="Enter OTP"
                                      required
                                    />
                                  </div>
                                )}
                              </>
                            )}
                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setPaypalEmail(""); setOtp(""); setIsOtpRequired(false); }}>Cancel</Button>
                              <Button type="submit">Add {formData.get("paymentType") === "paypal" ? "PayPal" : "Card"}</Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {/* Billing History remains unchanged */}
                    <div>
                      <h4 className="font-semibold mb-4">Billing History</h4>
                      <div className="space-y-3">
                        {billingHistory.map((bill) => (
                          <div key={bill.id} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <p className="text-sm font-medium">{bill.id}</p>
                              <p className="text-xs text-muted-foreground">{bill.date}</p>
                            </div>
                            <span className="text-sm font-medium">{bill.amount}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        View Full Billing History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-funds" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Current Balance Card */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Current Balance</CardTitle>
                      <CardDescription>Available funds in your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                          <Wallet className="h-8 w-8 text-secondary" />
                        </div>
                        <p className="text-4xl font-bold text-secondary mb-2">${user?.balance}</p>
                        <p className="text-sm text-muted-foreground">Ready to use for orders</p>
                      </div>
                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total added</span>
                          <span className="font-medium">${user?.total_funds}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total spent</span>
                          <span className="font-medium">${user?.user_spent}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Add Funds Form */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Add Funds</CardTitle>
                      <CardDescription>Top up your account balance to purchase services</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Quick Amount Selection */}
                      <div>
                        <Label className="text-base mb-3 block">Quick Select Amount</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[50, 100, 250, 500].map((amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              className={`h-16 text-lg font-semibold ${fundAmount === amount.toString()
                                ? "border-secondary bg-secondary/10 text-secondary"
                                : "bg-transparent"
                                }`}
                              onClick={() => setFundAmount(amount.toString())}
                            >
                              ${amount}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Amount Input */}
                      <div>
                        <Label htmlFor="custom-amount" className="text-base mb-2 block">
                          Or Enter Custom Amount
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="0.00"
                            value={fundAmount}
                            onChange={(e) => setFundAmount(e.target.value)}
                            className="pl-10 h-12 text-lg"
                            min="10"
                            step="0.01"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Minimum amount: $10.00</p>
                      </div>

                      {/* Payment Method Selection */}
                      <div>
                        <Label className="text-base mb-3 block">Select Payment Method</Label>
                        <div className="space-y-3">
                          {paymentMethods ?
                            paymentMethods?.map((method) => (
                              <button
                                onClick={() => setSelectedPaymentMethod(method.card_number_last4)}
                                className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${selectedPaymentMethod === method.card_number_last4
                                  ? "border-secondary bg-secondary/5"
                                  : "hover:bg-muted/50"
                                  }`}
                              >
                                {/* { console.log(method.card_number_last4)} */}

                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-secondary/10 rounded flex items-center justify-center">
                                    <CreditCard className="h-5 w-5 text-secondary" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-sm font-medium">•••• •••• •••• {method?.card_number_last4}</p>
                                    <p className="text-xs text-muted-foreground">{method.card_type} - Expires {method.expiry_month.toString().length === 1 ? '0' + method.expiry_month : method.expiry_month}/{method.expiry_year}</p>
                                  </div>
                                </div>
                                {selectedPaymentMethod === method.card_number_last4 && (
                                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">Selected</Badge>
                                )}
                              </button>

                            )) : (<p className="text-muted-foreground">No payment methods added yet.</p>)
                          }

                          <button
                            onClick={() => { setSelectedPaymentMethod("new-card"); setActiveTab("billing"); }}
                            className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${selectedPaymentMethod === "new-card"
                              ? "border-secondary bg-secondary/5"
                              : "hover:bg-muted/50"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-medium">Add New Card</p>
                                <p className="text-xs text-muted-foreground">Use a different payment method</p>
                              </div>
                            </div>
                            {/* {selectedPaymentMethod === "new-card" && (
                              <Badge className="bg-secondary/10 text-secondary border-secondary/20">Selected</Badge>
                            )} */}
                          </button>
                        </div>
                      </div>

                      {/* Summary and Action */}
                      <div className="pt-4 border-t space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Amount to add</span>
                          <span className="text-lg font-semibold">
                            ${fundAmount ? Number.parseFloat(fundAmount).toFixed(2) : "0.00"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Processing fee</span>
                          <span className="font-medium">$0.00</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-secondary">
                            ${fundAmount ? Number.parseFloat(fundAmount).toFixed(2) : "0.00"}
                          </span>
                        </div>
                        <Button
                          className="w-full h-12 text-base bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          disabled={!fundAmount || Number.parseFloat(fundAmount) < 10}
                          onClick={() => handleAddFunds(fundAmount)}
                        >
                          <ArrowUpCircle className="h-5 w-5 mr-2" />
                          Add Funds to Account
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Funds will be available immediately after successful payment
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Fund Additions</CardTitle>
                    <CardDescription>History of funds added to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <ArrowUpCircle className="h-5 w-5 text-accent-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Funds Added</p>
                            <p className="text-xs text-muted-foreground">January 10, 2024 at 2:30 PM</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-accent-foreground">+$500.00</p>
                          <p className="text-xs text-muted-foreground">Visa ••4242</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <ArrowUpCircle className="h-5 w-5 text-accent-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Funds Added</p>
                            <p className="text-xs text-muted-foreground">January 5, 2024 at 10:15 AM</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-accent-foreground">+$1,000.00</p>
                          <p className="text-xs text-muted-foreground">Visa ••4242</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <ArrowUpCircle className="h-5 w-5 text-accent-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Funds Added</p>
                            <p className="text-xs text-muted-foreground">January 1, 2024 at 9:00 AM</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-accent-foreground">+$1,000.00</p>
                          <p className="text-xs text-muted-foreground">Visa ••4242</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View All Transactions
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
