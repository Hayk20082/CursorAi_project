import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Download, Calendar, Filter, Mail, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: number;
  name: string;
  type: string;
  dateRange: string;
  format: string;
  status: string;
  createdAt: string;
}

const Reports = () => {
  const breadcrumbs = [{ label: "Reports" }];
  const { toast } = useToast();
  const { token } = useAuth();
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    dateRange: "",
    format: "pdf"
  });

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

  // Load reports from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reports", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReports(data);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Sales":
        return <Badge className="bg-blue-100 text-blue-800">Sales</Badge>;
      case "Inventory":
        return <Badge className="bg-blue-100 text-blue-800">Inventory</Badge>;
      case "Customers":
        return <Badge className="bg-blue-100 text-blue-800">Customers</Badge>;
      case "Financial":
        return <Badge className="bg-blue-100 text-blue-800">Financial</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge variant="outline" className="text-blue-600">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create report");
      }

      const newReport = await response.json();
      
      toast({
        title: "Success",
        description: "Report created successfully!",
      });

      // Refresh reports list
      await fetchReports();

      // Reset form
      setFormData({
        name: "",
        type: "",
        dateRange: "",
        format: "pdf"
      });

      setIsCreateReportOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create report",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and manage business reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Report</DialogTitle>
                  <DialogDescription>
                    Generate a new report with your specified parameters.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Report Name *</Label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter report name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Report Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Report</SelectItem>
                        <SelectItem value="inventory">Inventory Report</SelectItem>
                        <SelectItem value="customers">Customer Report</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                        <SelectItem value="analytics">Analytics Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateRange">Date Range *</Label>
                    <Select value={formData.dateRange} onValueChange={(value) => handleSelectChange("dateRange", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="this_week">This Week</SelectItem>
                        <SelectItem value="last_week">Last Week</SelectItem>
                        <SelectItem value="this_month">This Month</SelectItem>
                        <SelectItem value="last_month">Last Month</SelectItem>
                        <SelectItem value="this_quarter">This Quarter</SelectItem>
                        <SelectItem value="this_year">This Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Export Format</Label>
                    <Select value={formData.format} onValueChange={(value) => handleSelectChange("format", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateReportOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating..." : "Create Report"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Pre-configured report templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {reportTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">{template.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">Frequency: {template.frequency}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(template.category)}
                    {getStatusBadge(template.status)}
                    <Button variant="ghost" size="sm">Run</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">Type: {report.type}</div>
                      <div className="text-sm text-muted-foreground">Date Range: {report.dateRange}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{report.format.toUpperCase()}</div>
                        <div className="text-xs text-muted-foreground">Format</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{report.status}</div>
                        <div className="text-xs text-muted-foreground">Status</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No reports generated yet. Create your first report above.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Format Options</CardTitle>
            <CardDescription>Choose your preferred export format</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">PDF Reports</div>
                    <div className="text-sm text-muted-foreground">Professional formatted reports</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">CSV Data</div>
                    <div className="text-sm text-muted-foreground">Raw data for analysis</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;