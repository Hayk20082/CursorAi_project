import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, AlertTriangle, CheckCircle, Info, Settings, Mail, Smartphone, Globe } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const Notifications = () => {
  const breadcrumbs = [{ label: "Notifications" }];
  const { toast } = useToast();
  const { token } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    salesAlerts: true,
    customerAlerts: true,
    systemAlerts: true,
    alertFrequency: "immediate",
    quietHours: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00"
  });

  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Low Stock Alert",
      message: "Paper Cups are running low (2 remaining)",
      time: "5 minutes ago",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "success",
      title: "Sales Milestone",
      message: "You've reached $1,000 in sales today!",
      time: "2 hours ago",
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "info",
      title: "New Customer",
      message: "Sarah Johnson has joined your loyalty program",
      time: "4 hours ago",
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "alert",
      title: "Inventory Update",
      message: "Coffee Beans need restocking (5 remaining)",
      time: "1 day ago",
      read: true,
      priority: "medium",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);

    try {
      // In a real app, you would save these settings to the backend
      // For now, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated.",
      });

      setIsSettingsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification settings.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      // In a real app, you would call the backend API
      toast({
        title: "Marked as Read",
        description: "All notifications have been marked as read.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read.",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Notifications & Alerts</h1>
            <p className="text-muted-foreground">Manage alerts and notification preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Notification Settings</DialogTitle>
                  <DialogDescription>
                    Configure your notification preferences and alert settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Notification Channels */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Alert Types */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="low-stock-alerts">Low Stock Alerts</Label>
                        <Switch
                          id="low-stock-alerts"
                          checked={settings.lowStockAlerts}
                          onCheckedChange={(checked) => handleSettingChange("lowStockAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sales-alerts">Sales Alerts</Label>
                        <Switch
                          id="sales-alerts"
                          checked={settings.salesAlerts}
                          onCheckedChange={(checked) => handleSettingChange("salesAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="customer-alerts">Customer Alerts</Label>
                        <Switch
                          id="customer-alerts"
                          checked={settings.customerAlerts}
                          onCheckedChange={(checked) => handleSettingChange("customerAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-alerts">System Alerts</Label>
                        <Switch
                          id="system-alerts"
                          checked={settings.systemAlerts}
                          onCheckedChange={(checked) => handleSettingChange("systemAlerts", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Alert Frequency */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Frequency</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="alert-frequency">Alert Frequency</Label>
                        <Select 
                          value={settings.alertFrequency} 
                          onValueChange={(value) => handleSettingChange("alertFrequency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="hourly">Hourly Digest</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Digest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Quiet Hours */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Quiet Hours</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                        <Switch
                          id="quiet-hours"
                          checked={settings.quietHours}
                          onCheckedChange={(checked) => handleSettingChange("quietHours", checked)}
                        />
                      </div>
                      {settings.quietHours && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="quiet-hours-start">Start Time</Label>
                            <Input
                              id="quiet-hours-start"
                              type="time"
                              value={settings.quietHoursStart}
                              onChange={(e) => handleSettingChange("quietHoursStart", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="quiet-hours-end">End Time</Label>
                            <Input
                              id="quiet-hours-end"
                              type="time"
                              value={settings.quietHoursEnd}
                              onChange={(e) => handleSettingChange("quietHoursEnd", e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsSettingsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSettings} disabled={loading}>
                    {loading ? "Saving..." : "Save Settings"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure when and how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive alerts via email</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">Browser push notifications</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Alerts</div>
                    <div className="text-sm text-muted-foreground">Text message alerts</div>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Low Stock Alerts</div>
                    <div className="text-sm text-muted-foreground">When inventory is low</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sales Milestones</div>
                    <div className="text-sm text-muted-foreground">Revenue achievements</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">System Updates</div>
                    <div className="text-sm text-muted-foreground">App and security updates</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Your latest alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    !notification.read ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{notification.title}</div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(notification.priority)}
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Mark Read
                    </Button>
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;