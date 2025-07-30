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

// Routes
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SmartOps API is running',
    timestamp: new Date().toISOString(),
    users: users.length,
    businesses: businesses.length
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
  console.log(`🚀 SmartOps API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Using in-memory storage for testing`);
}); 