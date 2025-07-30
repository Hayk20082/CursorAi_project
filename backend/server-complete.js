import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for testing
const users = [];
const businesses = [];
const inventory = [];
const sales = [];
const customers = [];
const notifications = [];
const reports = [];

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Helper function to get user by ID
const getUserById = (userId) => {
  return users.find(u => u.id === userId);
};

// Helper function to get business by user
const getBusinessByUser = (userId) => {
  const user = getUserById(userId);
  return businesses.find(b => b.id === user?.businessId);
};

// ===== AUTHENTICATION ROUTES =====

app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      businessName,
      subdomain,
      businessEmail,
      businessPhone,
      businessAddress
    } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !businessName || !subdomain) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'password', 'firstName', 'lastName', 'businessName', 'subdomain']
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Check if subdomain is available
    const existingBusiness = businesses.find(b => b.subdomain === subdomain);
    if (existingBusiness) {
      return res.status(400).json({ error: 'Subdomain already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create business
    const business = {
      id: businesses.length + 1,
      name: businessName,
      subdomain,
      email: businessEmail,
      phone: businessPhone,
      address: businessAddress,
      createdAt: new Date()
    };
    businesses.push(business);

    // Create user
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'owner',
      businessId: business.id,
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date()
    };
    users.push(user);

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User and business created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        business: {
          id: business.id,
          name: business.name,
          subdomain: business.subdomain
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Find user
    const user = users.find(u => u.email === email);

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Find business
    const business = businesses.find(b => b.id === user.businessId);

    // Generate token
    const token = generateToken(user.id);

    // Update last login
    user.lastLogin = new Date();

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        business
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ===== DASHBOARD ROUTES =====

app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessInventory = inventory.filter(item => item.businessId === business.id);
    const businessSales = sales.filter(sale => sale.businessId === business.id);
    const businessCustomers = customers.filter(customer => customer.businessId === business.id);

    const stats = {
      totalRevenue: businessSales.reduce((sum, sale) => sum + sale.total, 0),
      totalSales: businessSales.length,
      totalProducts: businessInventory.length,
      totalCustomers: businessCustomers.length,
      lowStockItems: businessInventory.filter(item => item.quantity <= item.reorderPoint).length,
      recentSales: businessSales.slice(-5).reverse(),
      topProducts: businessInventory
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 5)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// ===== INVENTORY ROUTES =====

app.get('/api/inventory', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessInventory = inventory.filter(item => item.businessId === business.id);
    res.json(businessInventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

app.post('/api/inventory', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const {
      name,
      sku,
      description,
      price,
      cost,
      quantity,
      reorderPoint,
      category,
      barcode
    } = req.body;

    const newItem = {
      id: inventory.length + 1,
      businessId: business.id,
      name,
      sku,
      description,
      price: parseFloat(price),
      cost: parseFloat(cost),
      quantity: parseInt(quantity),
      reorderPoint: parseInt(reorderPoint),
      category,
      barcode,
      soldCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    inventory.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
});

app.put('/api/inventory/:id', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const itemId = parseInt(req.params.id);
    const item = inventory.find(i => i.id === itemId && i.businessId === business.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    Object.assign(item, req.body, { updatedAt: new Date() });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
});

app.delete('/api/inventory/:id', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const itemId = parseInt(req.params.id);
    const itemIndex = inventory.findIndex(i => i.id === itemId && i.businessId === business.id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    inventory.splice(itemIndex, 1);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
});

// ===== SALES ROUTES =====

app.get('/api/sales', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessSales = sales.filter(sale => sale.businessId === business.id);
    res.json(businessSales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

app.post('/api/sales', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const {
      items,
      customerId,
      paymentMethod,
      total,
      tax,
      discount
    } = req.body;

    const newSale = {
      id: sales.length + 1,
      businessId: business.id,
      items,
      customerId,
      paymentMethod,
      total: parseFloat(total),
      tax: parseFloat(tax || 0),
      discount: parseFloat(discount || 0),
      createdAt: new Date()
    };

    // Update inventory quantities
    items.forEach(saleItem => {
      const inventoryItem = inventory.find(item => item.id === saleItem.id);
      if (inventoryItem) {
        inventoryItem.quantity -= saleItem.quantity;
        inventoryItem.soldCount = (inventoryItem.soldCount || 0) + saleItem.quantity;
      }
    });

    sales.push(newSale);
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sale' });
  }
});

// ===== CUSTOMERS ROUTES =====

app.get('/api/customers', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessCustomers = customers.filter(customer => customer.businessId === business.id);
    res.json(businessCustomers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

app.post('/api/customers', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const {
      name,
      email,
      phone,
      address,
      isVip
    } = req.body;

    const newCustomer = {
      id: customers.length + 1,
      businessId: business.id,
      name,
      email,
      phone,
      address,
      isVip: isVip || false,
      totalSpent: 0,
      visitCount: 0,
      createdAt: new Date()
    };

    customers.push(newCustomer);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

app.put('/api/customers/:id', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const customerId = parseInt(req.params.id);
    const customer = customers.find(c => c.id === customerId && c.businessId === business.id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    Object.assign(customer, req.body);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// ===== ANALYTICS ROUTES =====

app.get('/api/analytics', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessSales = sales.filter(sale => sale.businessId === business.id);
    const businessInventory = inventory.filter(item => item.businessId === business.id);

    const analytics = {
      revenue: {
        total: businessSales.reduce((sum, sale) => sum + sale.total, 0),
        monthly: businessSales
          .filter(sale => {
            const saleDate = new Date(sale.createdAt);
            const currentDate = new Date();
            return saleDate.getMonth() === currentDate.getMonth() &&
                   saleDate.getFullYear() === currentDate.getFullYear();
          })
          .reduce((sum, sale) => sum + sale.total, 0)
      },
      sales: {
        total: businessSales.length,
        monthly: businessSales.filter(sale => {
          const saleDate = new Date(sale.createdAt);
          const currentDate = new Date();
          return saleDate.getMonth() === currentDate.getMonth() &&
                 saleDate.getFullYear() === currentDate.getFullYear();
        }).length
      },
      products: {
        total: businessInventory.length,
        lowStock: businessInventory.filter(item => item.quantity <= item.reorderPoint).length
      },
      customers: {
        total: customers.filter(c => c.businessId === business.id).length,
        vip: customers.filter(c => c.businessId === business.id && c.isVip).length
      }
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// ===== NOTIFICATIONS ROUTES =====

app.get('/api/notifications', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessNotifications = notifications.filter(n => n.businessId === business.id);
    res.json(businessNotifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.post('/api/notifications', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const {
      title,
      message,
      type,
      priority
    } = req.body;

    const newNotification = {
      id: notifications.length + 1,
      businessId: business.id,
      title,
      message,
      type: type || 'info',
      priority: priority || 'medium',
      isRead: false,
      createdAt: new Date()
    };

    notifications.push(newNotification);
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

app.put('/api/notifications/:id/read', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const notificationId = parseInt(req.params.id);
    const notification = notifications.find(n => n.id === notificationId && n.businessId === business.id);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.isRead = true;
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

// ===== REPORTS ROUTES =====

app.get('/api/reports', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessReports = reports.filter(r => r.businessId === business.id);
    res.json(businessReports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

app.post('/api/reports', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const {
      name,
      type,
      dateRange,
      format
    } = req.body;

    const newReport = {
      id: reports.length + 1,
      businessId: business.id,
      name,
      type,
      dateRange,
      format,
      status: 'generating',
      createdAt: new Date()
    };

    reports.push(newReport);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create report' });
  }
});

// ===== USERS ROUTES =====

app.get('/api/users', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const businessUsers = users.filter(u => u.businessId === business.id);
    
    // Remove password from response
    const safeUsers = businessUsers.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt
    }));

    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', authenticateToken, async (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    const {
      email,
      password,
      firstName,
      lastName,
      role
    } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'cashier',
      businessId: business.id,
      isActive: true,
      lastLogin: null,
      createdAt: new Date()
    };

    users.push(newUser);
    
    // Return user without password
    const { password: _, ...safeUser } = newUser;
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// ===== SETTINGS ROUTES =====

app.get('/api/settings', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/settings', authenticateToken, (req, res) => {
  try {
    const business = getBusinessByUser(req.user.userId);
    Object.assign(business, req.body);
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// ===== HEALTH CHECK =====

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SmartOps API is running',
    timestamp: new Date().toISOString(),
    users: users.length,
    businesses: businesses.length,
    inventory: inventory.length,
    sales: sales.length,
    customers: customers.length,
    notifications: notifications.length,
    reports: reports.length
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SmartOps Complete API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Using in-memory storage for testing`);
  console.log(`📋 Available endpoints:`);
  console.log(`   - POST /api/auth/register - User registration`);
  console.log(`   - POST /api/auth/login - User login`);
  console.log(`   - GET /api/dashboard/stats - Dashboard statistics`);
  console.log(`   - GET/POST/PUT/DELETE /api/inventory - Inventory management`);
  console.log(`   - GET/POST /api/sales - Sales management`);
  console.log(`   - GET/POST/PUT /api/customers - Customer management`);
  console.log(`   - GET /api/analytics - Analytics data`);
  console.log(`   - GET/POST/PUT /api/notifications - Notifications`);
  console.log(`   - GET/POST /api/reports - Reports`);
  console.log(`   - GET/POST /api/users - User management`);
  console.log(`   - GET/PUT /api/settings - Business settings`);
}); 