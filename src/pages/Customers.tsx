import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Mail, Star, Users } from "lucide-react";

const Customers = () => {
  const breadcrumbs = [{ label: "Customers" }];

  const customers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 123-4567",
      totalSpent: 247.85,
      visits: 12,
      loyaltyPoints: 85,
      lastVisit: "2 days ago",
      segment: "VIP",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@example.com",
      phone: "(555) 987-6543",
      totalSpent: 89.50,
      visits: 5,
      loyaltyPoints: 23,
      lastVisit: "1 week ago",
      segment: "Regular",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      phone: "(555) 456-7890",
      totalSpent: 156.30,
      visits: 8,
      loyaltyPoints: 42,
      lastVisit: "3 days ago",
      segment: "Regular",
    },
  ];

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case "VIP":
        return <Badge className="bg-purple-100 text-purple-800">VIP</Badge>;
      case "Regular":
        return <Badge variant="secondary">Regular</Badge>;
      default:
        return <Badge variant="outline">New</Badge>;
    }
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
            <p className="text-muted-foreground">Manage customer relationships and loyalty</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Campaign
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Spent</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$147.32</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Members</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">
                66% of total customers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customer Directory</CardTitle>
                <CardDescription>View and manage customer information</CardDescription>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search customers..." className="w-64" />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-sm font-medium">${customer.totalSpent}</div>
                      <div className="text-xs text-muted-foreground">Total Spent</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{customer.visits}</div>
                      <div className="text-xs text-muted-foreground">Visits</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{customer.loyaltyPoints}</div>
                      <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{customer.lastVisit}</div>
                      <div className="text-xs text-muted-foreground">Last Visit</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getSegmentBadge(customer.segment)}
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Customer distribution by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>VIP Customers</span>
                </div>
                <span className="font-medium">187 (15%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Regular Customers</span>
                </div>
                <span className="font-medium">847 (66%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span>New Customers</span>
                </div>
                <span className="font-medium">250 (19%)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest customer interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-muted-foreground">Made a purchase of $23.50</div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">New Customer Registration</div>
                <div className="text-muted-foreground">Alex Thompson joined</div>
                <div className="text-xs text-muted-foreground">5 hours ago</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Mike Chen</div>
                <div className="text-muted-foreground">Redeemed 50 loyalty points</div>
                <div className="text-xs text-muted-foreground">1 day ago</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;