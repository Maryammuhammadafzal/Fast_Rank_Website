"use client";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, FormEvent } from "react";
import { toast } from "sonner";

interface Packages {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  status: string;
  sales: number;
  popular : string | boolean;
}

const packages = [
  // ... (your initial packages array remains unchanged)
];

export default function PackageManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [packages, setPackages] = useState<Packages[] | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // New state for view dialog
  const [selectedPackage, setSelectedPackage] = useState<Packages | null>(null); // To hold the package to view

  const loadPackages = async () => {
    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/packages.php", {
        method: "GET",
      });
      const text = await res.text();
      console.log("Response text:", text);
      const storedPackages = JSON.parse(text);
      console.log("Parsed packages:", storedPackages);

      if (storedPackages && storedPackages.status === "success" && Array.isArray(storedPackages.data)) {
        const reversedPackages = [...storedPackages.data].sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setPackages(reversedPackages);
      } else {
        setPackages([]);
      }
    } catch (error) {
      toast.error(`Error loading Packages: ${error}`);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleAddPackage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log("Features from form:", formData.get("features"));

    const featuresValue = formData.get("features");
    const newPackage = {
      name: formData.get("name") as string || "",
      description: formData.get("description") as string || "",
      price: formData.get("price") as string || "",
      duration: formData.get("duration") as string || "",
      features: featuresValue ? (featuresValue as string).split("\n").map((tag) => tag.trim()) : [],
      status: formData.get("status") as string || "draft",
      sales: 0,
      popular: formData.get("popular") ? "true" : "false",
    };
    console.log("New package:", newPackage);

    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/packages-add.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPackage),
      });

      const text = await res.text();
      console.log("Response text:", text);
      const data = JSON.parse(text);

      if (data.status === "success") {
        setIsAddDialogOpen(false);
        toast.success("Package Added Successfully");
        loadPackages();
        window.location.reload();
      } else {
        toast.error(`Failed to add Package: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`Failed Package Adding: ${error}`);
      console.error(`Failed Package Adding: ${error}`);
    }
  };

  const handleEditPackage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log("Features from form:", formData.get("features"));

    const featuresValue = formData.get("features");
    const newPackage = {
      id: selectedPackage?.id,
      name: formData.get("name") as string || "",
      description: formData.get("description") as string || "",
      price: formData.get("price") as string || "",
      duration: formData.get("duration") as string || "",
      features: featuresValue ? (featuresValue as string).split("\n").map((tag) => tag.trim()) : [],
      status: formData.get("status") as string || "draft",
      sales: 0,
      popular: formData.get("popular") ? "true" : "false",
    };
    console.log("New package:", newPackage);

    try {
      const res = await fetch("http://localhost:8080/fast-rank-backend/packages-update.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPackage),
      });

      const text = await res.text();
      console.log("Response text:", text);
      const data = JSON.parse(text);

      if (data.status === "success") {
        setIsEditDialogOpen(false);
        toast.success("Package Edit Successfully");
        loadPackages();
        window.location.reload();
      } else {
        toast.error(`Failed to edit Package: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`Failed Package updating: ${error}`);
      console.error(`Failed Package updating: ${error}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "paused":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
                  <p className="text-gray-600 mt-2">Create and manage service packages</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-900 text-white hover:bg-gray-800">Create Package</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border-gray-200">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900">Create New Package</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Add a new service package to your offerings
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPackage} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">
                          Package Name
                        </Label>
                        <Input id="name" name="name" placeholder="Enter package name" className="border-gray-200" />
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-gray-700">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Enter package description"
                          className="border-gray-200"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price" className="text-gray-700">
                            Price
                          </Label>
                          <Input id="price" name="price" placeholder="$0.00" className="border-gray-200" />
                        </div>
                        <div>
                          <Label htmlFor="duration" className="text-gray-700">
                            Duration
                          </Label>
                          <Input id="duration" name="duration" placeholder="1 month" className="border-gray-200" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="features" className="text-gray-700">
                          Features
                        </Label>
                        <Textarea
                          id="features"
                          name="features"
                          placeholder="List package features (one per line)"
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="status" className="text-gray-700">
                          Status
                        </Label>
                        <select id="status" name="status" className="w-full border-gray-200 p-2 rounded">
                          <option value="draft">Draft</option>
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="popular"
                          name="popular"
                          className="rounded"
                        />
                        <Label htmlFor="popular" className="text-black">
                          Mark as Popular
                        </Label>
                      </div>
                      <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
                        Create Package
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <p className="text-xs text-blue-600">3 active packages</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">88</div>
                  <p className="text-xs text-green-600">+15% this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">$18,456</div>
                  <p className="text-xs text-green-600">+22% this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Best Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">Basic SEO</div>
                  <p className="text-xs text-purple-600">45 sales</p>
                </CardContent>
              </Card>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages?.map((pkg: any) => (
                <Card key={pkg.id} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-900">{pkg.name}</CardTitle>
                      <Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge>
                    </div>
                    <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{pkg.price}</span>
                        <span className="text-sm text-gray-600">{pkg.duration}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {pkg.features.map((feature: any, index: number) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">Sales:</span>
                          <span className="font-medium text-gray-900">{pkg.sales || 0}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {setSelectedPackage(pkg)}}
                                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                              >
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white border-gray-200 max-w-2xl max-h-4xl">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900">Edit Package</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                  Edit a service package to your offerings
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={handleEditPackage} className="space-y-4">
                                <div>
                                  <Label htmlFor="name" className="text-gray-700">
                                    Package Name
                                  </Label>
                                  <Input
                                    id="name"
                                    name="name"
                                    defaultValue={selectedPackage?.name}
                                    placeholder="Enter package name"
                                    className="border-gray-200"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="description" className="text-gray-700">
                                    Description
                                  </Label>
                                  <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={selectedPackage?.description}
                                    placeholder="Enter package description"
                                    className="border-gray-200"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="price" className="text-gray-700">
                                      Price
                                    </Label>
                                    <Input
                                      id="price"
                                      name="price"
                                      defaultValue={selectedPackage?.price}
                                      placeholder="$0.00"
                                      className="border-gray-200"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="duration" className="text-gray-700">
                                      Duration
                                    </Label>
                                    <Input
                                      id="duration"
                                      name="duration"
                                      defaultValue={selectedPackage?.duration}
                                      placeholder="1 month"
                                      className="border-gray-200"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="features" className="text-gray-700">
                                    Features
                                  </Label>
                                  <Textarea
                                    id="features"
                                    name="features"
                                    defaultValue={selectedPackage?.features.join("\n")}
                                    placeholder="List package features (one per line)"
                                    className="border-gray-200"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="status" className="text-gray-700">
                                    Status
                                  </Label>
                                  <select
                                    id="status"
                                    name="status"
                                    defaultValue={selectedPackage?.status}
                                    className="w-full border-gray-200 p-2 rounded"
                                  >
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                  </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="popular"
                                    name="popular"
                                    defaultChecked={selectedPackage?.popular === "true"}
                                    className="rounded"
                                  />
                                  <Label htmlFor="popular" className="text-black">
                                    Mark as Popular
                                  </Label>
                                </div>
                                <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
                                  Edit Package
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                 onClick={() => {setSelectedPackage(pkg)}}
                                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white border-gray-200 max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900">{pkg.name}
                                  {selectedPackage?.popular ? (<Badge>Popular</Badge>) : null}
                                   </DialogTitle>
                                <DialogDescription className="text-gray-600 mt-2">
                                  Detailed view of the {selectedPackage?.name} package
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-6 space-y-2">
                                <div className="bg-gray-50 p-2 rounded-lg">
                                  <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                                  <p className="text-gray-600 mt-1">{pkg.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800">Price</h3>
                                    <p className="text-gray-600 mt-1">{pkg.price}</p>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
                                    <p className="text-gray-600 mt-1">{pkg.duration}</p>
                                  </div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-lg">
                                  <h3 className="text-lg font-semibold text-gray-800">Features</h3>
                                  <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                                    {pkg.features.map((feature: any, index: number) => (
                                      <li key={index}>{feature}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800">Status</h3>
                                    <Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800">Sales</h3>
                                    <p className="text-gray-600 mt-2">{pkg.sales || 0}</p>
                                  </div>
                                </div>
                              </div>
                              <Button
                                onClick={() => setIsViewDialogOpen(false)}
                                className="mt-6 w-full bg-brand-purple text-white hover:bg-brand-purple/90"
                              >
                                Close
                              </Button>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}