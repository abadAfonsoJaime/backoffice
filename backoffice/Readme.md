# Backoffice Server

A Node.js backoffice server application with MySQL database integration, JWT authentication, and Express.js REST API.

## Features

- MySQL database connection with mysql2
- JWT-based authentication and authorization
- User management with role-based access control (Admin/User roles)
- Secure password hashing with bcrypt
- Configuration management using `config` package
- Debug logging support
- CORS enabled for cross-origin requests
- Security headers with Helmet
- Login and user registration endpoints

## Prerequisites

- Node.js (v14 or higher recommended)
- MySQL 8.0+ server
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abadAfonsoJaime/backoffice.git
cd backoffice/backoffice
```

2. Install dependencies:
```bash
npm install
```

3. Configure your database:
   - Edit `config/default.json` with your database credentials:
```json
{
  "dbConfig": {
    "host": "localhost",
    "user": "your-database-user",
    "port": 3306,
    "password": "your-password",
    "database": "your-database-name"
  },
  "jwtPrivateKey": "your-secret-key"
}
```

4. Set up environment variables:
   - For sensitive data, use environment variables or create `config/custom-environment-variables.json`

## Usage

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /login` - User login (returns JWT token)

### Users
- `GET /users/me` - Get current user info (requires authentication)
- `POST /users/new` - Create new user (requires authentication + admin role)

## Project Structure

```
backoffice/
├── config/                    # Configuration files
│   ├── default.json          # Default configuration
│   └── custom-environment-variables.json
├── middleware/               # Express middleware
│   ├── auth.js              # JWT authentication middleware
│   └── admin.js             # Admin authorization middleware
├── models/                   # Database models
│   ├── userModel.js         # User database operations
│   ├── loginModel.js        # Login operations
│   └── jwtToken.js          # JWT token generation
├── routes/                   # API routes
│   ├── login.js             # Login routes
│   └── users.js             # User management routes
├── startup/                  # Startup modules
│   └── db.js                # Database connection setup
├── index.js                 # Application entry point
├── package.json             # Project dependencies
└── Readme.md               # Project documentation
```

## Dependencies

- **express** (v5.2.1): Web framework
- **mysql2** (v3.11.5): MySQL client with support for MySQL 8.0+ authentication
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **config** (v3.3.9): Configuration management
- **debug** (v4.3.4): Debug logging utility
- **cors** (v2.8.6): Cross-Origin Resource Sharing
- **helmet** (v8.1.0): Security headers
- **joi**: Input validation

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Security headers with Helmet
- Input validation on user registration
- CORS configuration

## Environment Variables

Set the `DEBUG` environment variable to enable debug logging:
```bash
# Windows
set DEBUG=backoffice:*

# Linux/Mac
export DEBUG=backoffice:*
```

Set JWT private key:
```bash
# Windows
set jwtPrivateKey=your-secret-key

# Linux/Mac
export jwtPrivateKey=your-secret-key
```

### Debug Module Namespaces

The project uses the `debug` module for organized logging across different components. Each component has its own namespace for granular control:

- **`backoffice:startup`** - Application startup, server initialization, and configuration loading
- **`backoffice:db`** - Database connection, queries, and connection status
- **`backoffice:models:user`** - User model operations (registration, fetching user data)
- **`backoffice:models:login`** - Login model operations (authentication queries)
- **`backoffice:routes:users`** - User route handlers and API responses

**Examples:**
```bash
# Enable all debug logs
DEBUG=backoffice:*

# Enable only database logs
DEBUG=backoffice:db

# Enable multiple specific namespaces
DEBUG=backoffice:startup,backoffice:db

# Enable all model logs
DEBUG=backoffice:models:*

# Disable debug logs (default)
# Don't set DEBUG variable or set it to empty
```

## API Testing Guide

### Prerequisites for Testing
- Server running on `http://localhost:4000`
- Tools: curl, Postman, Thunder Client, or any HTTP client
- Valid JWT token (obtained from login)

### 1. Login Endpoint

**Endpoint:** `POST /login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "username": "admin_user",
  "password": "yourpassword"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin_user\",\"password\":\"yourpassword\"}"
```

**Success Response (200):**
```json
true
```
**Headers:**
- `x-auth-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT token)

**Error Response (400):**
```
Invalid username or password
```

**Usage:**
1. Copy the `x-auth-token` value from response headers
2. Use this token in subsequent authenticated requests

---

### 2. Get Current User Information

**Endpoint:** `GET /users/me`

**Description:** Get information about authenticated user

**Authentication:** Required (JWT token in header)

**Request Headers:**
```
x-auth-token: YOUR_JWT_TOKEN_HERE
```

**cURL Example:**
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "username": "admin_user",
    "email": "admin@example.com",
    "isAdmin": 1
  }
]
```

**Error Response (401):**
```
Access denied. No token provided.
```

**Error Response (400):**
```
Invalid token.
```

---

### 3. Create New User

**Endpoint:** `POST /users/new`

**Description:** Register a new user (Admin only)

**Authentication:** Required (JWT token with admin privileges)

**Request Headers:**
```
x-auth-token: YOUR_ADMIN_JWT_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securePassword123",
  "isAdmin": false
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"newuser\",\"email\":\"newuser@example.com\",\"password\":\"securePassword123\",\"isAdmin\":false}"
```

**Success Response (201):**
```json
{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 5,
  "info": "",
  "serverStatus": 2,
  "warningStatus": 0
}
```
**Headers:**
- `x-auth-token`: New JWT token for the created user

**Error Responses:**

**400 - Missing Required Fields:**
```
Username, email, and password are required
```

**400 - Password Too Short:**
```
Password must be at least 6 characters long
```

**400 - Invalid Email Format:**
```
Invalid email format
```

**400 - Duplicate Entry:**
```
Duplicate entry 'newuser' for key 'username'
```
or
```
Duplicate entry 'newuser@example.com' for key 'email'
```

**401 - Not Authenticated:**
```
Access denied. No token provided.
```

**403 - Not Admin:**
```
Access denied. Admin privileges required.
```

---

## Integration Testing Workflow

### Complete Test Scenario

**Step 1: Start the server with debug enabled**
```bash
# Windows
set DEBUG=backoffice:*
npm start

# Linux/Mac
DEBUG=backoffice:* npm start
```

**Step 2: Login as admin**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin_user\",\"password\":\"admin_password\"}" ^
  -i
```
Save the `x-auth-token` from response headers.

**Step 3: Verify your identity**
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: YOUR_TOKEN_HERE"
```

**Step 4: Create a new user (admin only)**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"Test123456\",\"isAdmin\":false}"
```

**Step 5: Login with the new user**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"Test123456\"}" ^
  -i
```

**Step 6: Get new user's information**
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: NEW_USER_TOKEN"
```

### Testing with Postman

1. **Import Collection:** Create a new collection called "Backoffice API"

2. **Set Base URL:** Create an environment variable:
   - Variable: `baseUrl`
   - Value: `http://localhost:4000`

3. **Set Token Variable:** After login, save token:
   - Variable: `authToken`
   - Value: Copy from response header `x-auth-token`

4. **Configure Requests:**
   - **POST Login:** `{{baseUrl}}/login`
     - Body: raw JSON with username/password
     - Tests: Save token with `pm.environment.set("authToken", pm.response.headers.get("x-auth-token"))`
   
   - **GET Me:** `{{baseUrl}}/users/me`
     - Headers: `x-auth-token: {{authToken}}`
   
   - **POST New User:** `{{baseUrl}}/users/new`
     - Headers: `x-auth-token: {{authToken}}`
     - Body: raw JSON with user data

### Common Testing Scenarios

**Test Authentication:**
```bash
# Should return 401
curl -X GET http://localhost:4000/users/me
```

**Test Invalid Token:**
```bash
# Should return 400
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: invalid_token"
```

**Test Non-Admin User Creating User:**
```bash
# Login as regular user, then try to create user
# Should return 403
```

**Test Validation:**
```bash
# Missing fields
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"testuser\"}"
# Should return 400: Username, email, and password are required

# Short password
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"123\"}"
# Should return 400: Password must be at least 6 characters long

# Invalid email
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"testuser\",\"email\":\"invalid-email\",\"password\":\"Test123456\"}"
# Should return 400: Invalid email format
```

## License

ISC

## Author

Afonso Jaime