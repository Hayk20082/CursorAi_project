# SmartOps Backend API

A Node.js/Express backend for the SmartOps business management platform with PostgreSQL database and JWT authentication.

## Features

- **Authentication**: JWT-based user authentication with role-based access control
- **Multi-tenant**: Business isolation with subdomain support
- **Database**: PostgreSQL with Sequelize ORM
- **Security**: Password hashing with bcrypt, CORS protection
- **API**: RESTful endpoints for business management

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE smartops_db;
```

2. Update the database configuration in `config.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smartops_db
DB_USER=your_username
DB_PASSWORD=your_password
```

### 3. Environment Configuration

Copy the example environment file and update the values:
```bash
cp config.env.example config.env
```

Update the following variables in `config.env`:
- Database connection details
- JWT secret key
- Server port
- CORS origin

### 4. Start the Server

Development mode with auto-restart:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user and business
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get all users (owner/manager)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (owner only)
- `DELETE /api/users/:id` - Delete user (owner only)

### Business
- `GET /api/business` - Get business details
- `PUT /api/business` - Update business (owner only)

### Health Check
- `GET /api/health` - API health status

## Database Models

### User
- Authentication and user management
- Role-based access control (owner, manager, cashier)
- Business association

### Business
- Multi-tenant business management
- Subdomain isolation
- Business settings and configuration

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Input validation
- SQL injection protection via Sequelize

## Development

### Database Migrations
The database will be automatically synced when the server starts. For production, use proper migrations.

### Environment Variables
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - Token expiration time
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin

## API Documentation

### Register User and Business
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "businessName": "My Coffee Shop",
  "subdomain": "mycoffeeshop",
  "businessEmail": "business@example.com",
  "businessPhone": "(555) 123-4567",
  "businessAddress": "123 Main St, City, State 12345"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Authenticated Requests
Include the JWT token in the Authorization header:
```bash
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns consistent error responses:
```json
{
  "error": "Error message",
  "details": "Additional error details (development only)"
}
```

## License

ISC 