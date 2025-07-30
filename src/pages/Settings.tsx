import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building, Users, CreditCard, Shield, Bell, Globe } from "lucide-react";

const Settings = () => {
  const breadcrumbs = [{ label: "Settings" }];

  const staffMembers = [
    { id: 1, name: "John Manager", email: "john@business.com", role: "Manager", status: "Active" },
    { id: 2, name: "Jane Cashier", email: "jane@business.com", role: "Cashier", status: "Active" },
    { id: 3, name: "Mike Staff", email: "mike@business.com", role: "Cashier", status: "Pending" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Settings</h1>
            <p className="text-muted-foreground">Manage your business configuration and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="business" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="staff">Staff & Roles</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Business Settings */}
          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>Update your business details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" defaultValue="My Coffee Shop" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <div className="flex">
                      <Input id="subdomain" defaultValue="mycoffeeshop" className="rounded-r-none" />
                      <div className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-sm text-muted-foreground">
                        .smartops.app
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" type="email" defaultValue="owner@mycoffeeshop.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="123 Main Street, City, State 12345" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="America/New_York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" defaultValue="USD" />
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
                <CardDescription>Configure tax rates and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="salesTax">Sales Tax Rate (%)</Label>
                    <Input id="salesTax" type="number" defaultValue="8.0" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID Number</Label>
                    <Input id="taxId" defaultValue="12-3456789" />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Update Tax Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff & Roles */}
          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Staff Management
                </CardTitle>
                <CardDescription>Manage team members and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Team Members</h4>
                      <p className="text-sm text-muted-foreground">Invite and manage your staff</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Invite Staff</Button>
                  </div>

                  <div className="space-y-3">
                    {staffMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{member.role}</Badge>
                          <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                            {member.status}
                          </Badge>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Configure what each role can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h4 className="font-medium mb-2">Owner</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Full system access</li>
                        <li>• Manage staff</li>
                        <li>• Financial reports</li>
                        <li>• Settings configuration</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Manager</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Inventory management</li>
                        <li>• Sales reports</li>
                        <li>• Customer management</li>
                        <li>• Price adjustments</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Cashier</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Process sales</li>
                        <li>• View inventory</li>
                        <li>• Customer lookup</li>
                        <li>• Basic reports</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Configuration
                </CardTitle>
                <CardDescription>Set up payment processing and methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Stripe Integration</div>
                      <div className="text-sm text-muted-foreground">Accept credit and debit cards</div>
                    </div>
                    <Badge variant="outline" className="text-blue-600">Connected</Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="stripeKey">Stripe Publishable Key</Label>
                    <Input id="stripeKey" placeholder="pk_test_..." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stripeSecret">Stripe Secret Key</Label>
                    <Input id="stripeSecret" type="password" placeholder="sk_test_..." />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="testMode" defaultChecked />
                    <Label htmlFor="testMode">Test Mode</Label>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">Update Payment Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure how you receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Daily Sales Summary</div>
                        <div className="text-xs text-muted-foreground">Receive daily sales reports</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Low Stock Alerts</div>
                        <div className="text-xs text-muted-foreground">Get notified when items are low</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Weekly Reports</div>
                        <div className="text-xs text-muted-foreground">Comprehensive weekly summaries</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Quiet Hours</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quietStart">Start Time</Label>
                      <Input id="quietStart" type="time" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quietEnd">End Time</Label>
                      <Input id="quietEnd" type="time" defaultValue="08:00" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>Connect external services and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">AWS S3</div>
                      <div className="text-sm text-muted-foreground">File storage and backups</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-600">Connected</Badge>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Email Service (SendGrid)</div>
                      <div className="text-sm text-muted-foreground">Automated email notifications</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Not Connected</Badge>
                      <Button variant="ghost" size="sm">Setup</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Auth0</div>
                      <div className="text-sm text-muted-foreground">User authentication and management</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-600">Connected</Badge>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage account security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Password Policy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Require Strong Passwords</div>
                        <div className="text-xs text-muted-foreground">Minimum 8 characters with symbols</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Two-Factor Authentication</div>
                        <div className="text-xs text-muted-foreground">Require 2FA for all staff</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Session Management</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input id="sessionTimeout" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxSessions">Max Concurrent Sessions</Label>
                      <Input id="maxSessions" type="number" defaultValue="3" />
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Update Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;