import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, ScanLine, CreditCard, DollarSign, Minus, Plus, Trash2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  quantity: number;
}

const Sales = () => {
  const breadcrumbs = [{ label: "Sales & POS" }];
  const { toast } = useToast();
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const recentSales = [
    { id: "#1247", items: "Latte + Pastry", total: 8.50, time: "2 min ago", payment: "Card" },
    { id: "#1246", items: "Coffee Beans x2", total: 25.98, time: "15 min ago", payment: "Cash" },
    { id: "#1245", items: "Various Items", total: 43.20, time: "1 hour ago", payment: "Card" },
  ];

  // Load available products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(availableProducts);
    } else {
      const filtered = availableProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, availableProducts]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/inventory", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedCustomer("");
    setPaymentMethod("");
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from the cart.",
    });
  };

  const handlePayment = async (method: string) => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to the cart before processing payment.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setPaymentMethod(method);

    try {
      const saleData = {
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        customerId: selectedCustomer || null,
        paymentMethod: method,
        total,
        tax,
        discount: 0
      };

      const response = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(saleData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to process sale");
      }

      const sale = await response.json();
      
      toast({
        title: "Sale Completed",
        description: `Sale #${sale.id} processed successfully with ${method} payment!`,
      });

      // Clear cart after successful sale
      clearCart();
      
      // Refresh products to update inventory
      await fetchProducts();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems(prev => [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1,
        sku: product.sku
      }]);
    }
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to the cart.`,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Sales & Point of Sale</h1>
            <p className="text-muted-foreground">Process transactions and manage sales</p>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
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
                  <Input 
                    placeholder="Search products or scan barcode..." 
                    className="flex-1"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <Button variant="outline">
                    <ScanLine className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Search Results */}
                {searchQuery && filteredProducts.length > 0 && (
                  <div className="border rounded-lg p-2 max-h-40 overflow-y-auto">
                    <div className="text-sm font-medium mb-2">Available Products:</div>
                    {filteredProducts.slice(0, 5).map((product) => (
                      <div 
                        key={product.id} 
                        className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                        onClick={() => addToCart(product)}
                      >
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${product.price.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">Stock: {product.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Customer Selection */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="customer">Customer (Optional)</Label>
                    <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">John Doe</SelectItem>
                        <SelectItem value="2">Jane Smith</SelectItem>
                        <SelectItem value="3">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, 0)}
                          >
                            <Trash2 className="h-3 w-3" />
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
                      <Badge variant="outline">{sale.payment}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
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

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={clearCart}
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
                    <Button 
                      onClick={() => handlePayment("card")}
                      disabled={cartItems.length === 0 || isProcessing}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isProcessing ? "Processing..." : "Pay with Card"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handlePayment("cash")}
                      disabled={cartItems.length === 0 || isProcessing}
                      className="w-full"
                    >
                      Pay with Cash
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePayment("mobile")}
                      disabled={cartItems.length === 0 || isProcessing}
                      className="w-full"
                    >
                      Mobile Pay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ScanLine className="h-4 w-4 mr-2" />
                  Scan Barcode
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Refund
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sales;