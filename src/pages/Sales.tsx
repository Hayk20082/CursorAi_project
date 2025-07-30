import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ScanLine, CreditCard, DollarSign, Minus, Plus } from "lucide-react";

const Sales = () => {
  const breadcrumbs = [{ label: "Sales & POS" }];

  const cartItems = [
    { id: 1, name: "Coffee Beans", price: 12.99, quantity: 2 },
    { id: 2, name: "Paper Cups", price: 0.15, quantity: 50 },
  ];

  const recentSales = [
    { id: "#1247", items: "Latte + Pastry", total: 8.50, time: "2 min ago", payment: "Card" },
    { id: "#1246", items: "Coffee Beans x2", total: 25.98, time: "15 min ago", payment: "Cash" },
    { id: "#1245", items: "Various Items", total: 43.20, time: "1 hour ago", payment: "Card" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales & Point of Sale</h1>
            <p className="text-muted-foreground">Process transactions and manage sales</p>
          </div>
          <Badge variant="outline" className="text-green-600">
            Online Mode
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* POS Interface */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Current Sale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Search products or scan barcode..." className="flex-1" />
                  <Button variant="outline">
                    <ScanLine className="h-4 w-4" />
                  </Button>
                </div>

                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">${item.price} each</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="sm">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right font-medium w-20">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No items in cart. Search or scan to add products.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Today's transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{sale.id}</div>
                        <div className="text-sm text-muted-foreground">{sale.items}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${sale.total}</div>
                        <div className="text-sm text-muted-foreground">{sale.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay with Card
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" disabled={cartItems.length === 0}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Cash Payment
                  </Button>
                </div>

                <Button variant="ghost" className="w-full" disabled={cartItems.length === 0}>
                  Clear Cart
                </Button>
              </CardContent>
            </Card>

            {/* Daily Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Sales Count:</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Revenue:</span>
                  <span className="font-medium">$1,234.56</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Sale:</span>
                  <span className="font-medium">$26.27</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sales;