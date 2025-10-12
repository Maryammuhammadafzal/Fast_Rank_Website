"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { EyeClosed, EyeIcon, EyeOffIcon } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: number,
  role: string,
  user_nicename: string,
  user_email: string,
  user_phone: string,
  user_company: string,
  user_bio: string,
  user_url: string,
  user_address: string,
  user_pass: string
}

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // const { isAuthenticated, loading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const user_id = localStorage.getItem('user_id');
    if (loggedIn == 'true') {
      setIsAuthenticated(true);
    }
    if (user_id) {
      const fetchUser = async () => {
        setLoading(true)
        const res = await fetch("http://localhost:8080/fast-rank-backend/users.php", {
          method: "GET"
        });
        console.log(res);

        const text = await res.text();
        const userData = JSON.parse(text);

        if (userData) {
          const getUser = userData.find((item: any) => item.user_email === user_id);
          setUser(getUser)
          setLoading(false)
        } else {
          setUser(null)
          setLoading(false)
        }
      }

      fetchUser();
    }
  }, [])

  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     router.push("/login")
  //   }
  // }, [])

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.currentTarget);

    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("newPassword") as string;
    if (newPassword !== confirmPassword) {
      toast.error('Password is not Correct');
    }

    const updatedProfile = {
      id: user?.id,
      user_nicename: formData.get("firstName") as string + " " + formData.get("lastName") as string,
      user_phone: formData.get("phone") as string || "",
      user_bio: formData.get("bio") as string || "",
      user_company: formData.get("company") as string || "",
      user_url: formData.get("website") as string || "",
      user_address: formData.get("address") as string || "",
      user_pass: formData.get("newPassword") as string || "",
    };

    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/user-update.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      const text = await res.text();
      console.log("Response text:", text);
      const data = JSON.parse(text);

      if (data.status === "success") {
        toast.success("User updated Successfully");
        window.location.reload();
      } else {
        toast.error(`Failed to update User: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`Failed Update User: ${error}`);
      console.error(`Failed User Update: ${error}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-muted-foreground">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // if (!isAuthenticated) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" defaultValue={user?.user_nicename?.split(" ")[0] || ""} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" defaultValue={user?.user_nicename?.split(" ")[1] || ""} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={user?.user_email || ""} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" defaultValue={user?.user_phone} placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" defaultValue={user?.user_bio} placeholder="Tell us about yourself..." rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Optional business details for invoicing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" name="company" defaultValue={user?.user_company} placeholder="Your Company Inc." />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" type="url" defaultValue={user?.user_url} placeholder="https://yourwebsite.com" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" name="address" defaultValue={user?.user_address} placeholder="Street address, city, state, zip code" rows={2} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative w-full">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPass ? "text" : "password"}
                      defaultValue={user?.user_pass}
                      // required
                    />
                    <div
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <EyeOffIcon className="h-4 w-4 text-gray-500" /> : <EyeIcon className="h-4 w-4 text-gray-500" />}
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" name="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
