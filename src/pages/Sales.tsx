import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, ShoppingCart, CreditCard, Receipt, X, Trash2 } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Sales = () => {
  const breadcrumbs = [{ label: "Sales & POS" }];
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [customerName, setCustomerName] = useState("");
  const [availableProducts, setAvailableProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Coffee Beans",
      price: 24.99,
      stock: 150,
      category: "Beverages"
    },
    {
      id: 2,
      name: "Organic Tea Selection",
      price: 18.50,
      stock: 75,
      category: "Beverages"
    },
    {
      id: 3,
      name: "Artisan Bread",
      price: 8.99,
      stock: 25,
      category: "Bakery"
    },
    {
      id: 4,
      name: "Fresh Milk",
      price: 4.99,
      stock: 0,
      category: "Dairy"
    }
  ]);

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (stock <= 10) {
      return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  const addToCart = (product: Product) => {
    if (product.stock === 0) return;
    
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handlePayment = async () => {
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Update product stock
      setAvailableProducts(prev => prev.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          return { ...product, stock: product.stock - cartItem.quantity };
        }
        return product;
      }));

      // Clear cart and close dialog
      setCart([]);
      setCustomerName("");
      setPaymentMethod("card");
      setIsPaymentOpen(false);
      setLoading(false);
    }, 2000);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = getTotal();

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Sales & POS</h1>
            <p className="text-muted-foreground">Process sales and manage transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Receipt className="h-4 w-4 mr-2" />
              View Receipts
            </Button>
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Refund
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Stats */}
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="w-80 pl-8 pr-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {availableProducts.length} products available
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer transition-colors hover:bg-blue-50 ${
                    product.stock === 0 ? 'opacity-50' : ''
                  }`}
                  onClick={() => addToCart(product)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{product.name}</CardTitle>
                      {getStockBadge(product.stock)}
                    </div>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        Stock: {product.stock}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart ({totalItems})
                </CardTitle>
                <CardDescription>Current transaction items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>Your cart is empty</p>
                    <p className="text-sm">Add products to start a sale</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 99}
                            >
                              +
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>${totalRevenue.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={clearCart}
                        className="flex-1"
                      >
                        Clear Cart
                      </Button>
                      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            disabled={cart.length === 0}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Checkout
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Complete Payment</DialogTitle>
                            <DialogDescription>
                              Process the payment for this transaction.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="customer">Customer Name</Label>
                              <Input
                                id="customer"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter customer name"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Payment Method</Label>
                              <div className="flex gap-2">
                                <Button
                                  variant={paymentMethod === "card" ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setPaymentMethod("card")}
                                >
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Card
                                </Button>
                                <Button
                                  variant={paymentMethod === "cash" ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setPaymentMethod("cash")}
                                >
                                  Cash
                                </Button>
                              </div>
                            </div>

                            <div className="border rounded-lg p-4">
                              <div className="space-y-2">
                                {cart.map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                                <div className="border-t pt-2 flex justify-between font-bold">
                                  <span>Total:</span>
                                  <span>${totalRevenue.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsPaymentOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handlePayment}
                              disabled={loading}
                            >
                              {loading ? "Processing..." : `Pay $${totalRevenue.toFixed(2)}`}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Sales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transactions:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Revenue:</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Items Sold:</span>
                  <span className="font-medium">0</span>
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