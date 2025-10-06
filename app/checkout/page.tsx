"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, ShoppingCart, Lock, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const supabase = createClient()

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processing, setProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Get product details from URL params
  const productId = searchParams.get("productId")
  const productName = searchParams.get("name") || "Service"
  const productPrice = Number.parseFloat(searchParams.get("price") || "0")
  const productType = searchParams.get("type") || "service"
  const productDescription = searchParams.get("description") || ""

  // Form state
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    if (user?.email) {
      setBillingInfo((prev) => ({ ...prev, email: user.email || "" }))
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setBillingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleCardInputChange = (field: string, value: string) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert("Please log in to complete your purchase")
      router.push("/login")
      return
    }

    setProcessing(true)

    try {
      // Create order in database
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          product_id: productId,
          product_name: productName,
          amount: productPrice,
          status: "pending",
          payment_method: paymentMethod,
          billing_info: billingInfo,
        })
        .select()
        .single()

      if (error) throw error

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update order status
      await supabase.from("orders").update({ status: "completed" }).eq("id", order.id)

      setOrderComplete(true)
    } catch (error) {
      console.error("Error processing order:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl">Order Successful!</CardTitle>
              <CardDescription className="text-lg">Thank you for your purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                <p className="text-sm text-muted-foreground">Order Details</p>
                <p className="font-semibold text-lg">{productName}</p>
                <p className="text-2xl font-bold text-secondary">${productPrice.toFixed(2)}</p>
              </div>
              <p className="text-muted-foreground">
                We've sent a confirmation email to <strong>{billingInfo.email}</strong>. Our team will contact you
                shortly to begin your service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => router.push("/orders")} size="lg">
                  View My Orders
                </Button>
                <Button onClick={() => router.push("/marketplace")} variant="outline" size="lg">
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary text-primary-foreground py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold">Secure Checkout</h1>
            <p className="text-primary-foreground/80 text-lg">Complete your purchase securely</p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <form onSubmit={handleSubmitOrder}>
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Billing & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Enter your billing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={billingInfo.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={billingInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={billingInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        required
                        value={billingInfo.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      required
                      value={billingInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={billingInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        required
                        value={billingInfo.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="NY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        value={billingInfo.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card</span>
                      </Label>
                      <div className="flex gap-2">
                        <Badge variant="outline">Visa</Badge>
                        <Badge variant="outline">Mastercard</Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 0 1-.793.68H8.175a.6.6 0 0 1-.592-.693l.008-.04.617-3.913.024-.154a.805.805 0 0 1 .793-.68h.5c2.42 0 4.346-.98 4.909-3.813.227-1.14.025-2.092-.48-2.76m-1.364-5.456C17.447 1.71 15.843 1.25 13.78 1.25H7.316a.805.805 0 0 0-.794.68L4.254 17.77a.6.6 0 0 0 .592.693h4.145l1.04-6.593-.033.209a.805.805 0 0 1 .793-.68h1.65c3.239 0 5.775-1.314 6.514-5.12.028-.14.05-.278.069-.412-.184-.1-.184-.1 0 0 .313-2.006-.002-3.367-1.276-4.845" />
                        </svg>
                        <span>PayPal</span>
                      </Label>
                      <Badge variant="outline">Fast & Secure</Badge>
                    </div>
                  </RadioGroup>

                  {/* Card Details Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          required
                          value={cardInfo.cardNumber}
                          onChange={(e) => handleCardInputChange("cardNumber", e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          required
                          value={cardInfo.cardName}
                          onChange={(e) => handleCardInputChange("cardName", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            required
                            value={cardInfo.expiryDate}
                            onChange={(e) => handleCardInputChange("expiryDate", e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            required
                            value={cardInfo.cvv}
                            onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-lg">{productName}</p>
                      {productDescription && <p className="text-sm text-muted-foreground mt-1">{productDescription}</p>}
                      <Badge variant="outline" className="mt-2">
                        {productType}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${productPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>$0.00</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-secondary">${productPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={processing}>
                    {processing ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Complete Purchase
                      </>
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Secure SSL Encrypted Payment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your payment information is processed securely. We do not store credit card details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container px-4 py-16">
            <div className="text-center">Loading checkout...</div>
          </div>
          <Footer />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
