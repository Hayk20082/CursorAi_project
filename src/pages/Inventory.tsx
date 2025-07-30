import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ScanLine, Upload, Download } from "lucide-react";

const Inventory = () => {
  const breadcrumbs = [{ label: "Inventory" }];

  const sampleProducts = [
    { id: 1, name: "Coffee Beans", sku: "CB001", category: "Beverages", stock: 45, price: 12.99, status: "In Stock" },
    { id: 2, name: "Paper Cups", sku: "PC002", category: "Supplies", stock: 2, price: 0.15, status: "Low Stock" },
    { id: 3, name: "Milk", sku: "ML003", category: "Beverages", stock: 0, price: 3.50, status: "Out of Stock" },
    { id: 4, name: "Sugar Packets", sku: "SP004", category: "Supplies", stock: 120, price: 0.05, status: "In Stock" },
  ];

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock <= 5) return <Badge variant="secondary">Low Stock</Badge>;
    return <Badge variant="outline">In Stock</Badge>;
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground">Track and manage your product inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ScanLine className="h-4 w-4 mr-2" />
                Scan Barcode
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search Products
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Products:</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Value:</span>
                  <span className="font-medium">$8,467</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Low Stock Items:</span>
                  <span className="font-medium text-yellow-600">8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="text-red-600">3 items out of stock</div>
                <div className="text-yellow-600">5 items below threshold</div>
                <div className="text-muted-foreground">2 pending orders</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your products and stock levels</CardDescription>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search products..." className="w-64" />
                <Button variant="outline">Filter</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">SKU</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Stock</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2 font-medium">{product.name}</td>
                      <td className="p-2 text-muted-foreground">{product.sku}</td>
                      <td className="p-2">{product.category}</td>
                      <td className="p-2">
                        <span className={product.stock <= 5 ? "text-red-600 font-medium" : ""}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">{getStatusBadge(product.status, product.stock)}</td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Stock</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;