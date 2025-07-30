import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Filter, Mail } from "lucide-react";

const Reports = () => {
  const breadcrumbs = [{ label: "Reports" }];

  const reportTemplates = [
    {
      id: 1,
      name: "Daily Sales Summary",
      description: "Complete sales breakdown by day",
      category: "Sales",
      frequency: "Daily",
      lastRun: "Today 9:00 AM",
      status: "Active",
    },
    {
      id: 2,
      name: "Inventory Status Report",
      description: "Current stock levels and valuations",
      category: "Inventory",
      frequency: "Weekly",
      lastRun: "Monday 6:00 AM",
      status: "Active",
    },
    {
      id: 3,
      name: "Customer Analysis",
      description: "Customer behavior and loyalty metrics",
      category: "Customers",
      frequency: "Monthly",
      lastRun: "1st of month",
      status: "Active",
    },
    {
      id: 4,
      name: "Tax Report",
      description: "Transaction summary for tax filing",
      category: "Financial",
      frequency: "Quarterly",
      lastRun: "Not scheduled",
      status: "Inactive",
    },
  ];

  const recentReports = [
    {
      name: "Sales Report - Week 47",
      type: "PDF",
      size: "1.2 MB",
      date: "2 hours ago",
      download: true,
    },
    {
      name: "Inventory Export - November",
      type: "CSV",
      size: "245 KB",
      date: "1 day ago",
      download: true,
    },
    {
      name: "Customer List Export",
      type: "Excel",
      size: "856 KB",
      date: "3 days ago",
      download: true,
    },
  ];

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Sales":
        return <Badge className="bg-green-100 text-green-800">Sales</Badge>;
      case "Inventory":
        return <Badge className="bg-blue-100 text-blue-800">Inventory</Badge>;
      case "Customers":
        return <Badge className="bg-purple-100 text-purple-800">Customers</Badge>;
      case "Financial":
        return <Badge className="bg-yellow-100 text-yellow-800">Financial</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge variant="outline" className="text-green-600">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Export Tools</h1>
            <p className="text-muted-foreground">Generate and schedule business reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </div>
        </div>

        {/* Quick Export */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Export</CardTitle>
            <CardDescription>Generate instant reports with current data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <FileText className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Sales Summary</div>
                  <div className="text-xs text-muted-foreground">Today's transactions</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Download className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Inventory Export</div>
                  <div className="text-xs text-muted-foreground">Current stock levels</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Mail className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Customer List</div>
                  <div className="text-xs text-muted-foreground">Contact information</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Manage automated and custom reports</CardDescription>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="font-medium">{template.name}</div>
                      {getCategoryBadge(template.category)}
                      {getStatusBadge(template.status)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {template.description}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Frequency: {template.frequency} • Last run: {template.lastRun}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Run Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Your latest generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-sm">{report.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {report.type} • {report.size} • {report.date}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Statistics</CardTitle>
              <CardDescription>Report generation metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Reports This Month:</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Scheduled Reports:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average Generation Time:</span>
                <span className="font-medium">12 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total File Size:</span>
                <span className="font-medium">47.3 MB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Format Options</CardTitle>
            <CardDescription>Choose your preferred format for data export</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="font-medium">PDF Reports</div>
                <div className="text-sm text-muted-foreground">Formatted business reports</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Download className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="font-medium">CSV Export</div>
                <div className="text-sm text-muted-foreground">Raw data for analysis</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="font-medium">Excel Files</div>
                <div className="text-sm text-muted-foreground">Spreadsheet format</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;