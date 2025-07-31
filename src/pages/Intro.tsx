import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  CheckCircle,
  Globe,
  Smartphone,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">
                SmartOps
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            ✨ Now Available
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Smart Operations
            <span className="text-blue-600"> for Smart Business</span>
            <br />
            Owners
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your daily operations with inventory tracking, POS sales, analytics, and customer management. 
            Perfect for retail shops, cafés, salons, and solo entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start SmartOps
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose SmartOps?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for small business owners who want to replace manual spreadsheets and disjointed tools with one unified platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
             <CardHeader>
               <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                 <Zap className="h-6 w-6 text-blue-600" />
               </div>
               <CardTitle>Inventory Management</CardTitle>
               <CardDescription>
                 Add products, scan barcodes, track stock levels, and get low-stock alerts automatically.
               </CardDescription>
             </CardHeader>
           </Card>

                     <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
             <CardHeader>
               <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                 <Shield className="h-6 w-6 text-purple-600" />
               </div>
               <CardTitle>POS Sales Tracking</CardTitle>
               <CardDescription>
                 Process sales with minimal clicks, support offline mode, and accept multiple payment methods.
               </CardDescription>
             </CardHeader>
           </Card>

                     <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
             <CardHeader>
               <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                 <Users className="h-6 w-6 text-green-600" />
               </div>
               <CardTitle>Customer Management</CardTitle>
               <CardDescription>
                 Track customer history, loyalty points, and send targeted email campaigns.
               </CardDescription>
             </CardHeader>
           </Card>

                     <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
             <CardHeader>
               <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                 <Globe className="h-6 w-6 text-orange-600" />
               </div>
               <CardTitle>Real-time Analytics</CardTitle>
               <CardDescription>
                 Interactive charts for revenue trends, top products, and margin analysis with actionable insights.
               </CardDescription>
             </CardHeader>
           </Card>

                     <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
             <CardHeader>
               <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                 <Smartphone className="h-6 w-6 text-red-600" />
               </div>
               <CardTitle>Smart Notifications</CardTitle>
               <CardDescription>
                 Configurable alerts for stock levels, sales milestones, and custom reminders via email and in-app.
               </CardDescription>
             </CardHeader>
           </Card>

                     <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
             <CardHeader>
               <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                 <Database className="h-6 w-6 text-indigo-600" />
               </div>
               <CardTitle>Custom Reports</CardTitle>
               <CardDescription>
                 Prebuilt templates for inventory, sales, and tax reports with CSV/PDF/Excel export options.
               </CardDescription>
             </CardHeader>
           </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
                         <div>
               <div className="text-3xl font-bold text-blue-600 mb-2">2s</div>
               <div className="text-muted-foreground">Page Load Time</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
               <div className="text-muted-foreground">Uptime SLA</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-green-600 mb-2">100ms</div>
               <div className="text-muted-foreground">API Response</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
               <div className="text-muted-foreground">Support</div>
             </div>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                                 <span className="text-xl font-bold text-blue-600">SmartOps</span>
               </div>
               <p className="text-muted-foreground">
                 Building the future of business operations, one smart solution at a time.
               </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
                <li><a href="#" className="hover:text-foreground">Status</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ProjectBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Intro; 