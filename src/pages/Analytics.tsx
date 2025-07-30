import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, Filter } from "lucide-react";

const Analytics = () => {
  const breadcrumbs = [{ label: "Analytics" }];

  const insights = [
    {
      title: "Revenue Growth",
      value: "+12.5%",
      description: "Compared to last month",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Best Selling Product",
      value: "Coffee Beans",
      description: "45 units sold this week",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Peak Hours",
      value: "8-10 AM",
      description: "Highest sales volume",
      trend: "neutral",
      icon: Calendar,
    },
    {
      title: "Customer Retention",
      value: "78%",
      description: "Repeat customers",
      trend: "down",
      icon: TrendingDown,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Analytics & Insights</h1>
            <p className="text-muted-foreground">Track performance and discover trends</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                <insight.icon className={`h-4 w-4 ${
                  insight.trend === 'up' ? 'text-blue-600' : 
                  insight.trend === 'down' ? 'text-red-600' : 
                  'text-muted-foreground'
                }`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{insight.value}</div>
                <p className="text-xs text-muted-foreground">
                  {insight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive revenue chart</p>
                  <p className="text-sm">Chart component would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing items by sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Coffee Beans</div>
                    <div className="text-sm text-muted-foreground">Premium Arabica</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$584.55</div>
                    <Badge variant="outline">45 sold</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Paper Cups</div>
                    <div className="text-sm text-muted-foreground">16oz Disposable</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$187.50</div>
                    <Badge variant="outline">1,250 sold</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sugar Packets</div>
                    <div className="text-sm text-muted-foreground">Individual Servings</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$45.20</div>
                    <Badge variant="outline">904 sold</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Detailed breakdown of sales metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-sm font-medium">This Week</div>
                <div className="text-2xl font-bold">$1,847.32</div>
                <div className="text-sm text-blue-600">+15.3% vs last week</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">This Month</div>
                <div className="text-2xl font-bold">$7,234.18</div>
                <div className="text-sm text-blue-600">+8.7% vs last month</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">This Year</div>
                <div className="text-2xl font-bold">$84,567.45</div>
                <div className="text-sm text-blue-600">+23.1% vs last year</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actionable Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Actionable Insights</CardTitle>
            <CardDescription>AI-powered recommendations for your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-medium text-blue-800">Inventory Opportunity</div>
              <div className="text-blue-700">Consider restocking Coffee Beans - sales increased 25% this week</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-medium text-green-800">Peak Time Optimization</div>
              <div className="text-green-700">Schedule more staff during 8-10 AM for highest efficiency</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="font-medium text-yellow-800">Customer Retention</div>
              <div className="text-yellow-700">Implement loyalty program - 22% of sales are from new customers</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;