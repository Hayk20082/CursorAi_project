# SmartOps Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### POST /api/auth/register
Register a new user and business.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "businessName": "My Business",
  "subdomain": "mybusiness",
  "businessEmail": "contact@mybusiness.com",
  "businessPhone": "+1234567890",
  "businessAddress": "123 Main St, City, State"
}
```

**Response:**
```json
{
  "message": "User and business created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "owner",
    "business": {
      "id": 1,
      "name": "My Business",
      "subdomain": "mybusiness"
    }
  }
}
```

### POST /api/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "owner",
    "business": {
      "id": 1,
      "name": "My Business",
      "subdomain": "mybusiness"
    }
  }
}
```

---

## 📊 Dashboard Endpoints

### GET /api/dashboard/stats
Get dashboard statistics (requires authentication).

**Response:**
```json
{
  "totalRevenue": 15000.50,
  "totalSales": 45,
  "totalProducts": 120,
  "totalCustomers": 89,
  "lowStockItems": 5,
  "recentSales": [...],
  "topProducts": [...]
}
```

---

## 📦 Inventory Management

### GET /api/inventory
Get all inventory items for the business.

**Response:**
```json
[
  {
    "id": 1,
    "businessId": 1,
    "name": "Product Name",
    "sku": "SKU123",
    "description": "Product description",
    "price": 29.99,
    "cost": 15.00,
    "quantity": 50,
    "reorderPoint": 10,
    "category": "Electronics",
    "barcode": "123456789",
    "soldCount": 25,
    "createdAt": "2025-07-30T22:00:00.000Z",
    "updatedAt": "2025-07-30T22:00:00.000Z"
  }
]
```

### POST /api/inventory
Create a new inventory item.

**Request Body:**
```json
{
  "name": "New Product",
  "sku": "SKU456",
  "description": "Product description",
  "price": 29.99,
  "cost": 15.00,
  "quantity": 100,
  "reorderPoint": 10,
  "category": "Electronics",
  "barcode": "987654321"
}
```

### PUT /api/inventory/:id
Update an inventory item.

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 34.99,
  "quantity": 75
}
```

### DELETE /api/inventory/:id
Delete an inventory item.

---

## 🛒 Sales Management

### GET /api/sales
Get all sales for the business.

**Response:**
```json
[
  {
    "id": 1,
    "businessId": 1,
    "items": [
      {
        "id": 1,
        "name": "Product Name",
        "quantity": 2,
        "price": 29.99
      }
    ],
    "customerId": 1,
    "paymentMethod": "card",
    "total": 59.98,
    "tax": 5.99,
    "discount": 0,
    "createdAt": "2025-07-30T22:00:00.000Z"
  }
]
```

### POST /api/sales
Create a new sale.

**Request Body:**
```json
{
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "price": 29.99
    }
  ],
  "customerId": 1,
  "paymentMethod": "card",
  "total": 59.98,
  "tax": 5.99,
  "discount": 0
}
```

---

## 👥 Customer Management

### GET /api/customers
Get all customers for the business.

**Response:**
```json
[
  {
    "id": 1,
    "businessId": 1,
    "name": "John Customer",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Customer St",
    "isVip": false,
    "totalSpent": 150.00,
    "visitCount": 3,
    "createdAt": "2025-07-30T22:00:00.000Z"
  }
]
```

### POST /api/customers
Create a new customer.

**Request Body:**
```json
{
  "name": "New Customer",
  "email": "new@example.com",
  "phone": "+1234567890",
  "address": "456 Customer Ave",
  "isVip": false
}
```

### PUT /api/customers/:id
Update a customer.

**Request Body:**
```json
{
  "name": "Updated Customer Name",
  "isVip": true
}
```

---

## 📈 Analytics

### GET /api/analytics
Get business analytics data.

**Response:**
```json
{
  "revenue": {
    "total": 15000.50,
    "monthly": 2500.75
  },
  "sales": {
    "total": 45,
    "monthly": 8
  },
  "products": {
    "total": 120,
    "lowStock": 5
  },
  "customers": {
    "total": 89,
    "vip": 12
  }
}
```

---

## 🔔 Notifications

### GET /api/notifications
Get all notifications for the business.

**Response:**
```json
[
  {
    "id": 1,
    "businessId": 1,
    "title": "Low Stock Alert",
    "message": "Product XYZ is running low on stock",
    "type": "warning",
    "priority": "high",
    "isRead": false,
    "createdAt": "2025-07-30T22:00:00.000Z"
  }
]
```

### POST /api/notifications
Create a new notification.

**Request Body:**
```json
{
  "title": "New Notification",
  "message": "This is a notification message",
  "type": "info",
  "priority": "medium"
}
```

### PUT /api/notifications/:id/read
Mark a notification as read.

---

## 📋 Reports

### GET /api/reports
Get all reports for the business.

**Response:**
```json
[
  {
    "id": 1,
    "businessId": 1,
    "name": "Monthly Sales Report",
    "type": "sales",
    "dateRange": "2025-07-01 to 2025-07-31",
    "format": "pdf",
    "status": "completed",
    "createdAt": "2025-07-30T22:00:00.000Z"
  }
]
```

### POST /api/reports
Create a new report.

**Request Body:**
```json
{
  "name": "New Report",
  "type": "inventory",
  "dateRange": "2025-07-01 to 2025-07-31",
  "format": "pdf"
}
```

---

## 👤 User Management

### GET /api/users
Get all users for the business.

**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "owner",
    "isActive": true,
    "lastLogin": "2025-07-30T22:00:00.000Z",
    "createdAt": "2025-07-30T22:00:00.000Z"
  }
]
```

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "cashier"
}
```

---

## ⚙️ Settings

### GET /api/settings
Get business settings.

**Response:**
```json
{
  "id": 1,
  "name": "My Business",
  "subdomain": "mybusiness",
  "email": "contact@mybusiness.com",
  "phone": "+1234567890",
  "address": "123 Main St, City, State",
  "createdAt": "2025-07-30T22:00:00.000Z"
}
```

### PUT /api/settings
Update business settings.

**Request Body:**
```json
{
  "name": "Updated Business Name",
  "email": "newemail@mybusiness.com",
  "phone": "+1987654321"
}
```

---

## 🏥 Health Check

### GET /api/health
Get API health status.

**Response:**
```json
{
  "status": "OK",
  "message": "SmartOps API is running",
  "timestamp": "2025-07-30T22:00:00.000Z",
  "users": 5,
  "businesses": 3,
  "inventory": 120,
  "sales": 45,
  "customers": 89,
  "notifications": 12,
  "reports": 8
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Missing required fields",
  "required": ["email", "password"]
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Item not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!",
  "message": "Internal server error"
}
```

---

## Testing the API

You can test the API using curl or any HTTP client:

```bash
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "businessName": "Test Business",
    "subdomain": "testbusiness"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get dashboard stats (with token)
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
``` 