"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

interface DashboardOverviewProps {
  userData: any;
  locationData: any;
  recentSales: any[];
  lowStockItems: any[];
}

export function DashboardOverview({
  userData,
  locationData,
  recentSales = [],
  lowStockItems = [],
}: DashboardOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              {locationData?.location?.name || "All Locations"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentSales.length > 0 ? (
              <div className="space-y-8">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {sale.customer
                          ? `${sale.customer.first_name?.[0] || ""}${sale.customer.last_name?.[0] || ""}`
                          : "GC"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {sale.customer
                          ? `${sale.customer.first_name || ""} ${sale.customer.last_name || ""}`
                          : "Guest Customer"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sale.location?.name || "Unknown Location"}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {formatCurrency(sale.total_amount)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  No recent sales found
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>
              Items that need to be restocked soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockItems.length > 0 ? (
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.product?.sku || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.quantity <= 5 ? "destructive" : "outline"}
                      >
                        {item.quantity} left
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  No low stock items found
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Sales chart will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              {userData?.tenant?.name || "Your Business"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Business Name</p>
                <p className="text-sm text-muted-foreground">
                  {userData?.tenant?.name || "Not set"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {locationData?.location?.name || "Not set"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  {locationData?.location?.address || "Not set"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Contact</p>
                <p className="text-sm text-muted-foreground">
                  {locationData?.location?.phone || "Not set"}
                </p>
              </div>
              <div className="pt-4">
                <Button size="sm" className="w-full">
                  Edit Business Information
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
