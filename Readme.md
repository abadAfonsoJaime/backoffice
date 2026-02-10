# Backoffice Full-Stack Application

A complete full-stack backoffice solution with Node.js REST API backend and React SPA frontend, featuring MySQL database integration, JWT authentication, and automated CI/CD deployment.

## 📑 Table of Contents

- [Architecture](#-architecture)
- [Features](#features)
- [Quick Start](#-quick-start---full-stack-setup)
- [Project Structure](#-project-structure-complete)
- [Development Workflow](#-development-workflow)
- [Testing](#-testing-the-full-stack)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security-considerations)
- [CI/CD & Deployment](#-cicd--deployment)
- [Environment Variables](#environment-variables)
- [Quick Reference](#-quick-reference)

## 🏗️ Architecture

This project consists of two main components:

### Backend API (`backoffice/`)
- Node.js + Express.js REST API
- MySQL database with mysql2
- JWT-based authentication
- Port: `4000`

### Frontend SPA (`FrontAdminTable/`)
- React 18 single-page application
- React Router v5 for navigation
- Bootstrap 5 for UI
- Port: `3000`

## Features

### Backend Features
- MySQL database connection with mysql2
- JWT-based authentication and authorization
- User management with role-based access control (Admin/User roles)
- Secure password hashing with bcrypt
- Configuration management using `config` package
- Debug logging support
- CORS enabled for cross-origin requests
- Security headers with Helmet
- RESTful API endpoints
- **Automated CI/CD with GitHub Actions**
- **Automated testing with Newman**
- **Multi-environment deployment (Production & Staging)**

### Frontend Features
- React 18 with modern hooks and components
- Protected routes with authentication
- User login and registration forms
- Cards management interface
- Toast notifications for user feedback
- Responsive design with Bootstrap 5
- API integration with axios

## 🚀 CI/CD & Deployment

This project includes complete CI/CD automation using GitHub Actions:

- ✅ **Continuous Integration**: Automated testing on every PR
- ✅ **Continuous Deployment**: Auto-deploy to staging (`develop`) and production (`main`)
- ✅ **Branch Protection**: PR approvals required for main (2) and develop (1)
- ✅ **Environment Management**: Separate configs for production, staging, and development
- ✅ **Automated Testing**: Newman API tests run on every deployment

**📚 Complete Setup Guides:**
- **[CI/CD Setup Guide](./GITHUB-CICD-SETUP.md)** - Comprehensive GitHub Actions configuration
- **[Setup Checklist](./CICD-CHECKLIST.md)** - Step-by-step checklist for deployment setup

**Quick Start:**
1. Configure GitHub environments (production & staging)
2. Add secrets and variables
3. Set up branch protection rules
4. Push to `develop` → Auto-deploys to staging
5. Merge to `main` → Auto-deploys to production

## Prerequisites

- **Node.js** (v14 or higher recommended, v18+ for React 18)
- **MySQL 8.0+** server
- **npm** or yarn
- Modern web browser (Chrome, Firefox, Edge, Safari)

## 🚀 Quick Start - Full Stack Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/abadAfonsoJaime/backoffice.git
cd server-backoffice
```

### 2️⃣ Database Setup

**Create MySQL Database:**
```sql
CREATE DATABASE marketing_posts;
```

**Run Initial DDL Script:**
```bash
# Navigate to backoffice folder
cd backoffice

# Run the MySQL DDL script
mysql -u your-user -p marketing_posts < integration-tools/MySQL_INITIAL_DDL.sql
```

This creates the `users` and `posts` tables.

### 3️⃣ Backend Setup

**Install Backend Dependencies:**
```bash
# From backoffice/ directory
cd backoffice
npm install
```

**Configure Database Connection:**

Edit `backoffice/config/local.json`:
```json
{
  "dbConfig": {
    "host": "localhost",
    "user": "your-mysql-username",
    "port": 3306,
    "password": "your-mysql-password",
    "database": "marketing_posts"
  },
  "jwtPrivateKey": "your-secret-jwt-key"
}
```

**Seed Database with Initial Data (Optional but Recommended):**
```bash
npm run seed-db
```
Creates admin user (`admin` / `admin123`) and 4 default cards for immediate testing.

### 4️⃣ Frontend Setup

**Install Frontend Dependencies:**
```bash
# From project root, navigate to FrontAdminTable
cd ../FrontAdminTable
npm install
```

**Verify API Configuration:**

Check `FrontAdminTable/src/config.json`:
```json
{
  "SERVER_URL": "http://localhost:4000"
}
```

### 5️⃣ Launch Both Applications

**Option A: Two Separate Terminals (Recommended for Development)**

Terminal 1 - Backend:
```powershell
# From backoffice/ directory
cd backoffice
npm run dev
# Server runs on http://localhost:4000
```

Terminal 2 - Frontend:
```powershell
# From FrontAdminTable/ directory
cd FrontAdminTable
npm start
# App opens automatically at http://localhost:3000
```

**Option B: Single Commands**

Windows PowerShell (from project root):
```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backoffice; npm run dev"

# Start frontend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd FrontAdminTable; npm start"
```

Linux/Mac:
```bash
# Start backend in background
cd backoffice && npm run dev &

# Start frontend
cd ../FrontAdminTable && npm start
```

### 6️⃣ Access the Application

- **Frontend (React SPA)**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Login Credentials** (if seeded): `admin` / `admin123`

## 📁 Project Structure (Complete)

```
server-backoffice/
├── backoffice/                     # Backend API (Node.js)
│   ├── config/                     # Configuration files
│   │   ├── default.json           # Default configuration
│   │   ├── local.json             # Local development config
│   │   └── custom-environment-variables.json
│   ├── middleware/                # Express middleware
│   │   ├── auth.js               # JWT authentication
│   │   └── admin.js              # Admin authorization
│   ├── models/                    # Database models
│   │   ├── userModel.js          # User operations
│   │   ├── loginModel.js         # Login operations
│   │   ├── cardsModel.js         # Cards/Posts operations
│   │   └── jwtToken.js           # JWT token generation
│   ├── routes/                    # API routes
│   │   ├── login.js              # Login endpoints
│   │   ├── users.js              # User management
│   │   └── cards.js              # Cards/Posts endpoints
│   ├── startup/                   # Startup modules
│   │   └── db.js                 # Database connection
│   ├── integration-tools/         # Testing and setup tools
│   │   ├── MySQL_INITIAL_DDL.sql # Database schema
│   │   ├── Backoffice-API-Tests.postman_collection.json
│   │   └── POSTMAN-GUIDE.md
│   ├── index.js                   # Application entry point
│   ├── seed-admin.js             # Admin user seeding
│   ├── package.json              # Backend dependencies
│   └── Readme.md                 # Backend documentation
│
└── FrontAdminTable/               # Frontend SPA (React 18)
    ├── public/                    # Static files
    │   ├── index.html
    │   └── robots.txt
    ├── src/
    │   ├── components/            # React components
    │   │   ├── cards.js          # Cards list
    │   │   ├── cardForm.js       # Card editor
    │   │   ├── loginForm.js      # Login form
    │   │   ├── registerForm.js   # Registration form
    │   │   ├── navBar.js         # Navigation
    │   │   └── common/           # Reusable components
    │   ├── services/              # API services
    │   │   ├── authService.js    # Authentication
    │   │   ├── cardService.js    # Cards API
    │   │   └── httpService.js    # HTTP client
    │   ├── App.js                # Main application
    │   ├── index.js              # React entry point
    │   └── config.json           # API configuration
    ├── package.json              # Frontend dependencies
    └── .gitignore                # Git ignore rules
```

## 🔧 Development Workflow

### Backend Development

**Start with Auto-reload:**
```bash
cd backoffice
npm run dev
```

**Run Tests:**
```bash
npm test           # Run Newman API tests
npm run test:verbose    # Detailed test output
```

**Enable Debug Logging:**
```powershell
# Windows
$env:DEBUG="backoffice:*"
npm run dev

# Linux/Mac
DEBUG=backoffice:* npm run dev
```

### Frontend Development

**Start Development Server:**
```bash
cd FrontAdminTable
npm start
```

**Build for Production:**
```bash
npm run build
# Creates optimized build in build/ directory
```

**Run Tests:**
```bash
npm test
```

## 🧪 Testing the Full Stack

### 1. Backend API Testing

**Using Postman:**
- Import `backoffice/integration-tools/Backoffice-API-Tests.postman_collection.json`
- Import `backoffice/integration-tools/Backoffice-API.postman_environment.json`
- See `backoffice/integration-tools/POSTMAN-GUIDE.md` for details

**Using Newman (Command Line):**
```bash
cd backoffice
npm test
```

### 2. Frontend Testing

**Manual Testing Checklist:**
1. Open http://localhost:3000
2. Login with credentials
3. Navigate to Cards page
4. Create/edit/delete cards
5. Test logout functionality
6. Test protected routes (without authentication)

**Key Test Scenarios:**
- ✅ Login with valid credentials
- ✅ Login with invalid credentials (should show error)
- ✅ Access protected routes without login (should redirect)
- ✅ Create new card (admin only)
- ✅ Edit existing card
- ✅ Logout and verify session cleared
- ✅ API calls to backend succeed
- ✅ Toast notifications appear

### 3. Integration Testing

Test the full flow:
```
User Login → JWT Token → API Request → MySQL Query → Response → UI Update
```

## Usage by Component

### Backend API Usage

Start the server:
```bash
cd backoffice
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

### Frontend Usage

Start the React app:
```bash
cd FrontAdminTable
npm start
```

The app will automatically open at `http://localhost:3000`

## API Endpoints

### Authentication Endpoints
- `POST /login` - User login (returns JWT token)
  - Body: `{ "username": "admin", "password": "admin123" }`
  - Returns: JWT token in `x-auth-token` header

### User Management Endpoints
- `GET /users/me` - Get current user info
  - Requires: JWT token in `x-auth-token` header
  - Returns: User object (without password)

- `POST /users/new` - Create new user
  - Requires: JWT token + Admin role
  - Body: `{ "username": "...", "email": "...", "password": "...", "isAdmin": false }`

### Cards/Posts Endpoints
- `GET /cards` - Get all cards
  - Requires: JWT token
  - Returns: Array of card objects

- `GET /cards/:id` - Get specific card
  - Requires: JWT token
  - Returns: Single card object

- `POST /cards` - Create new card
  - Requires: JWT token + Admin role
  - Body: Card data

- `PUT /cards/:id` - Update card
  - Requires: JWT token + Admin role
  - Body: Updated card data

- `DELETE /cards/:id` - Delete card
  - Requires: JWT token + Admin role

## Frontend Routes

- `/` - Redirects to `/cards`
- `/login` - Login page (public)
- `/logout` - Logout action
- `/cards` - Cards list (protected)
- `/cards/:id` - Edit card (protected)
- `/register` - User registration (protected, admin only)
- `/not-found` - 404 page

## 🐛 Troubleshooting

### Backend Issues

**Issue: Cannot connect to MySQL**
```bash
# Check MySQL is running
# Windows: services.msc → Look for MySQL
# Linux: systemctl status mysql
```

**Issue: "FATAL ERROR: jwtPrivateKey is not defined"**
- Ensure `jwtPrivateKey` is set in `config/local.json`
- Or set environment variable: `$env:jwtPrivateKey="your-key"`

**Issue: Port 4000 already in use**
```bash
# Windows: Find and kill process
netstat -ano | findstr :4000
taskkill /PID <process-id> /F

# Linux/Mac
lsof -ti:4000 | xargs kill
```

### Frontend Issues

**Issue: Cannot connect to backend API**
- Verify backend is running on http://localhost:4000
- Check `FrontAdminTable/src/config.json` has correct SERVER_URL
- Check CORS is enabled on backend (it is by default)

**Issue: Port 3000 already in use**
- React will automatically suggest port 3001
- Or kill the process using port 3000

**Issue: Login fails with valid credentials**
- Check backend logs for errors
- Verify JWT token is being returned in response headers
- Check browser console for errors

**Issue: Protected routes not redirecting**
- Clear browser localStorage: `localStorage.clear()`
- Check `authService.js` is properly configured

### Integration Issues

**Issue: CORS errors in browser console**
- Verify backend has CORS enabled: `app.use(cors())`
- Check frontend is making requests to http://localhost:4000

**Issue: Auth token not persisting**
- Check browser localStorage has `token` key
- Verify `authService.js` is saving token correctly

**Issue: "Network Error" on API calls**
- Backend not running → Start backend server
- Wrong API URL → Check config.json
- Firewall blocking → Allow Node.js through firewall

## 🔐 Security Considerations

### For Development
- ✅ Use `local.json` for sensitive config (gitignored)
- ✅ Never commit credentials to Git
- ✅ Use strong JWT secret keys
- ✅ Default admin password should be changed

### For Production
- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS (not HTTP)
- ✅ Set secure CORS origins (not `*`)
- ✅ Use strong database passwords
- ✅ Regular security audits: `npm audit`
- ✅ Keep dependencies updated

## Project Structure (Simplified)

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

### Backend Dependencies
- **express** (v5.2.1): Web framework
- **mysql2** (v3.11.5): MySQL client with support for MySQL 8.0+ authentication
- **bcrypt** (v6.0.0): Password hashing
- **jsonwebtoken** (v9.0.3): JWT token generation and verification
- **config** (v3.3.9): Configuration management
- **debug** (v4.3.4): Debug logging utility
- **cors** (v2.8.6): Cross-Origin Resource Sharing
- **helmet** (v8.1.0): Security headers

### Frontend Dependencies
- **react** (v18.3.1): UI library
- **react-dom** (v18.3.1): React DOM rendering
- **react-router-dom** (v5.3.4): Client-side routing
- **axios** (v1.6.2): HTTP client for API calls
- **react-toastify** (v9.1.3): Toast notifications
- **bootstrap** (v5.3.2): CSS framework
- **joi-browser** (v13.4.0): Input validation

### Dev Dependencies
- **react-scripts** (v5.0.1): Create React App build tools
- **nodemon** (v3.0.2): Auto-reload for Node.js
- **newman** (v6.2.1): Postman test runner

## Security Features

### Backend Security
- JWT-based authentication with secure token generation
- Password hashing with bcrypt (salt rounds: 10)
- Role-based access control (Admin/User)
- Security headers with Helmet middleware
- Input validation on user registration
- CORS configuration for allowed origins
- SQL injection prevention with parameterized queries
- Secure session management

### Frontend Security
- Protected routes requiring authentication
- JWT token storage in localStorage
- Automatic token inclusion in API requests
- Session expiration handling
- Secure password input fields
- XSS protection through React's built-in escaping

## Environment Variables

The application uses environment variables for secure configuration management. See [ENVIRONMENT-VARIABLES.md](backoffice/ENVIRONMENT-VARIABLES.md) for complete documentation.

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL database host | `localhost` |
| `DB_USER` | MySQL username | `srv_backoffice` |
| `DB_PASSWORD` | MySQL password | `your_password` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_NAME` | Database name | `marketing_posts` |
| `JWT_PRIVATE_KEY` | JWT signing key | `your_secret_key` |

### Quick Setup

**Windows PowerShell:**
```powershell
$env:DB_HOST="localhost"
$env:DB_USER="srv_backoffice"
$env:DB_PASSWORD="your_password"
$env:DB_PORT="3306"
$env:DB_NAME="marketing_posts"
$env:JWT_PRIVATE_KEY="your_secret_key"
```

**Linux/macOS:**
```bash
export DB_HOST=localhost
export DB_USER=srv_backoffice
export DB_PASSWORD=your_password
export DB_PORT=3306
export DB_NAME=marketing_posts
export JWT_PRIVATE_KEY=your_secret_key
```

### Database Seeding

After setting up environment variables, seed the database with initial data:

```bash
cd backoffice
npm run seed-db
```

This creates:
- ✅ Admin user: `admin` / `admin123`
- ✅ 4 default cards/posts for immediate testing

### Debug Logging (Optional)

Set the `DEBUG` environment variable to enable debug logging:
```bash
# Windows
set DEBUG=backoffice:*

# Linux/Mac
export DEBUG=backoffice:*
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
- MySQL database with `users` table containing at least one user

---

## Detailed Test Examples by Route Feature

### 1. Login Endpoint - User Authentication

**Endpoint:** `POST /login`

**Description:** Authenticate user and receive JWT token

---

#### Test 1.1: Successful Login

**Purpose:** Verify user can login with correct credentials

**Request:**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin_user\",\"password\":\"correctPassword123\"}" ^
  -i
```

**Expected Response:**
- Status: `200 OK`
- Body: `true`
- Headers: 
  ```
  x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbl91c2VyIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzA3MzM5NjAwfQ.abc123...
  access-control-expose-headers: x-auth-token
  ```

**What to verify:**
- Response status is 200
- Body contains `true`
- `x-auth-token` header is present and contains a valid JWT
- Token can be decoded to show user info

---

#### Test 1.2: Login with Incorrect Password

**Purpose:** Verify system rejects invalid passwords

**Request:**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin_user\",\"password\":\"wrongPassword\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid username or password`
- Headers: No `x-auth-token`

**What to verify:**
- Response status is 400
- Error message doesn't reveal whether username or password was wrong (security)
- No token is provided

---

#### Test 1.3: Login with Non-existent Username

**Purpose:** Verify system handles non-existent users

**Request:**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"nonexistent_user\",\"password\":\"anyPassword\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid username or password`

**What to verify:**
- Same response as incorrect password (prevents username enumeration)
- No information leak about user existence

---

#### Test 1.4: Login with Missing Username

**Purpose:** Verify input validation

**Request:**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"password\":\"somePassword\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid username or password`

**What to verify:**
- Request is rejected with proper error message
- System doesn't crash or leak debug info

---

#### Test 1.5: Login with Missing Password

**Purpose:** Verify input validation

**Request:**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin_user\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid username or password`

---

#### Test 1.6: Login with Empty Body

**Purpose:** Verify request validation

**Request:**
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid username or password`

---

### 2. Get Current User Info - Authenticated User Data

**Endpoint:** `GET /users/me`

**Description:** Retrieve authenticated user's information (requires valid JWT)

---

#### Test 2.1: Get User Info with Valid Token

**Purpose:** Verify authenticated user can retrieve their information

**Setup:**
```bash
# First, login to get token
set TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request:**
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: %TOKEN%" ^
  -i
```

**Expected Response:**
- Status: `200 OK`
- Body: 
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

**What to verify:**
- User info matches logged-in user
- Password is NOT included in response
- `isAdmin` field correctly reflects user role
- Returns array with single user object

---

#### Test 2.2: Get User Info Without Token

**Purpose:** Verify authentication is required

**Request:**
```bash
curl -X GET http://localhost:4000/users/me ^
  -i
```

**Expected Response:**
- Status: `401 Unauthorized`
- Body: `Access denied. No token provided.`

**What to verify:**
- Request is rejected without authentication
- Proper HTTP status code (401)
- Clear error message

---

#### Test 2.3: Get User Info with Invalid Token

**Purpose:** Verify token validation

**Request:**
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: invalid.token.here" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid token.`

**What to verify:**
- Malformed tokens are rejected
- System doesn't crash on invalid JWT

---

#### Test 2.4: Get User Info with Expired Token

**Purpose:** Verify token expiration handling

**Request:**
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired.token" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid token.`

**What to verify:**
- Expired tokens are rejected
- User must re-authenticate

---

### 3. Create New User - Admin User Registration

**Endpoint:** `POST /users/new`

**Description:** Register a new user (Admin privileges required)

---

#### Test 3.1: Create User Successfully (Admin)

**Purpose:** Verify admin can create new users

**Setup:**
```bash
# Login as admin and get token
set ADMIN_TOKEN=admin_jwt_token_here
```

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"newuser\",\"email\":\"newuser@example.com\",\"password\":\"SecurePass123\",\"isAdmin\":false}" ^
  -i
```

**Expected Response:**
- Status: `201 Created`
- Body: 
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
- Headers: 
  ```
  x-auth-token: new_user_jwt_token
  ```

**What to verify:**
- User is created in database
- `insertId` shows the new user's ID
- New JWT token is generated for the created user
- `affectedRows` is 1

---

#### Test 3.2: Create User Without Authentication

**Purpose:** Verify endpoint requires authentication

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"newuser\",\"email\":\"new@example.com\",\"password\":\"Pass123\"}" ^
  -i
```

**Expected Response:**
- Status: `401 Unauthorized`
- Body: `Access denied. No token provided.`

**What to verify:**
- Cannot create users without authentication
- Proper 401 status code

---

#### Test 3.3: Create User as Non-Admin User

**Purpose:** Verify only admins can create users

**Setup:**
```bash
# Login as regular (non-admin) user
set USER_TOKEN=regular_user_jwt_token
```

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %USER_TOKEN%" ^
  -d "{\"username\":\"another\",\"email\":\"another@example.com\",\"password\":\"Pass123\"}" ^
  -i
```

**Expected Response:**
- Status: `403 Forbidden`
- Body: `Access denied. Admin privileges required.`

**What to verify:**
- Regular users cannot create new users
- Proper 403 status code for authorization failure

---

#### Test 3.4: Create User with Missing Username

**Purpose:** Verify input validation - required fields

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"Pass123\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Username, email, and password are required`

**What to verify:**
- Validation catches missing username
- Clear error message about required fields

---

#### Test 3.5: Create User with Missing Email

**Purpose:** Verify input validation - required fields

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"testuser\",\"password\":\"Pass123\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Username, email, and password are required`

---

#### Test 3.6: Create User with Missing Password

**Purpose:** Verify input validation - required fields

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Username, email, and password are required`

---

#### Test 3.7: Create User with Short Password

**Purpose:** Verify password length validation

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"12345\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Password must be at least 6 characters long`

**What to verify:**
- Password must be at least 6 characters
- Validation prevents weak passwords

---

#### Test 3.8: Create User with Invalid Email Format

**Purpose:** Verify email format validation

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"testuser\",\"email\":\"invalid-email\",\"password\":\"Pass123456\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Invalid email format`

**What to verify:**
- Email format is validated with regex
- Common invalid formats are rejected (missing @, missing domain, etc.)

---

#### Test 3.9: Create User with Duplicate Username

**Purpose:** Verify username uniqueness constraint

**Request:**
```bash
# Try to create user with existing username
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"admin_user\",\"email\":\"different@example.com\",\"password\":\"Pass123456\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Duplicate entry 'admin_user' for key 'username'`

**What to verify:**
- Database unique constraint is enforced
- Duplicate usernames are rejected
- Error message identifies the constraint violation

---

#### Test 3.10: Create User with Duplicate Email

**Purpose:** Verify email uniqueness constraint

**Request:**
```bash
# Try to create user with existing email
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"newusername\",\"email\":\"admin@example.com\",\"password\":\"Pass123456\"}" ^
  -i
```

**Expected Response:**
- Status: `400 Bad Request`
- Body: `Duplicate entry 'admin@example.com' for key 'email'`

**What to verify:**
- Email addresses must be unique
- Database constraint prevents duplicates

---

#### Test 3.11: Create Admin User

**Purpose:** Verify admin user creation

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"newadmin\",\"email\":\"newadmin@example.com\",\"password\":\"AdminPass123\",\"isAdmin\":true}" ^
  -i
```

**Expected Response:**
- Status: `201 Created`
- Body: Success with new user ID

**What to verify:**
- Admin flag is properly set
- New admin user can perform admin operations
- Database stores `isAdmin=1`

---

#### Test 3.12: Create User Without isAdmin Field (Default)

**Purpose:** Verify default behavior for isAdmin field

**Request:**
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: %ADMIN_TOKEN%" ^
  -d "{\"username\":\"defaultuser\",\"email\":\"default@example.com\",\"password\":\"Pass123456\"}" ^
  -i
```

**Expected Response:**
- Status: `201 Created`
- User created with `isAdmin=false` (default)

**What to verify:**
- Missing `isAdmin` field defaults to `false`
- User is created as regular (non-admin) user

---

## Integration Testing Workflow

### Complete End-to-End Test Scenario

This workflow demonstrates a complete user journey through the API:

**Step 1: Start the server with debug enabled**
```bash
# Windows
set DEBUG=backoffice:*
npm start

# Linux/Mac
DEBUG=backoffice:* npm start
```

**Step 2: Test Authentication - Login as admin** (See Test 1.1)
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin_user\",\"password\":\"admin_password\"}" ^
  -i
```
✓ Save the `x-auth-token` from response headers  
✓ Verify response status is 200  
✓ Body should be `true`

**Step 3: Verify Authentication - Get your identity** (See Test 2.1)
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: YOUR_TOKEN_HERE"
```
✓ Verify you receive your user information  
✓ Check that `isAdmin` is 1 or true

**Step 4: Test Authorization - Create a new user as admin** (See Test 3.1)
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"Test123456\",\"isAdmin\":false}"
```
✓ Verify response status is 201  
✓ Check `insertId` in response  
✓ Save new user's token from headers

**Step 5: Test New User - Login with the newly created user** (See Test 1.1)
```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"Test123456\"}" ^
  -i
```
✓ Verify new user can authenticate  
✓ Save new user's token

**Step 6: Verify New User - Get new user's information** (See Test 2.1)
```bash
curl -X GET http://localhost:4000/users/me ^
  -H "x-auth-token: NEW_USER_TOKEN"
```
✓ Verify correct user info is returned  
✓ Check that `isAdmin` is 0 or false

**Step 7: Test Authorization - Try to create user as non-admin** (See Test 3.3)
```bash
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: NEW_USER_TOKEN" ^
  -d "{\"username\":\"unauthorized\",\"email\":\"unauth@example.com\",\"password\":\"Pass123\"}"
```
✓ Verify response status is 403  
✓ Confirm error message about admin privileges

**Step 8: Test Validation - Attempt invalid operations** (See Tests 3.4-3.12)
```bash
# Try short password
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"test2\",\"email\":\"test2@example.com\",\"password\":\"123\"}"

# Try invalid email
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"test3\",\"email\":\"invalid-email\",\"password\":\"Pass123456\"}"

# Try duplicate username
curl -X POST http://localhost:4000/users/new ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: YOUR_ADMIN_TOKEN" ^
  -d "{\"username\":\"testuser\",\"email\":\"another@example.com\",\"password\":\"Pass123456\"}"
```
✓ All should return 400 with appropriate error messages

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

5. **Use the Detailed Tests:** Replicate Tests 1.1-3.12 above in Postman for comprehensive testing

---

## Quick Test Reference

### By Feature

**Authentication Tests:**
- Test 1.1-1.6: Login functionality with various scenarios

**Authorization Tests:**
- Test 2.1-2.4: User info retrieval with different auth states
- Test 3.2-3.3: Admin-only operations

**Validation Tests:**
- Test 3.4-3.10: Input validation and constraints
- Test 3.11-3.12: Optional fields and defaults

### By HTTP Status Code

**200 OK:**
- Test 1.1: Successful login
- Test 2.1: Get user info with valid token

**201 Created:**
- Test 3.1: Create user successfully
- Test 3.11: Create admin user
- Test 3.12: Create user with defaults

**400 Bad Request:**
- Test 1.2-1.6: Invalid login attempts
- Test 2.3-2.4: Invalid/expired tokens
- Test 3.4-3.10: Validation failures

**401 Unauthorized:**
- Test 2.2: Access without token
- Test 3.2: Create user without authentication

**403 Forbidden:**
- Test 3.3: Non-admin trying to create user

### By Test Type

**Happy Path (Success):**
- Tests 1.1, 2.1, 3.1, 3.11, 3.12

**Security:**
- Tests 1.2, 1.3, 2.2, 2.3, 2.4, 3.2, 3.3

**Validation:**
- Tests 1.4, 1.5, 1.6, 3.4, 3.5, 3.6, 3.7, 3.8

**Constraints:**
- Tests 3.9, 3.10

---

### Common Testing Scenarios

All scenarios below reference the detailed tests above. Use this as a quick checklist:

**Scenario: Test Authentication**
- Run Tests 2.2 (no token), 2.3 (invalid token), 2.4 (expired token)
- ✓ All should be rejected with appropriate errors

**Scenario: Test Non-Admin User Creating User**
- Login as regular user
- Run Test 3.3
- ✓ Should return 403 Forbidden

**Scenario: Test All Validation Rules**
- Run Tests 3.4-3.8 in sequence
- ✓ Each should fail with specific validation message

**Scenario: Test Database Constraints**
- Run Tests 3.9-3.10
- ✓ Should prevent duplicates

**Scenario: Test Password Security**
- Verify passwords are hashed (check database)
- Run Test 1.2 with wrong password
- Run Test 3.7 with short password
- ✓ Passwords not visible in responses or logs

**Scenario: Test Token Lifecycle**
1. Run Test 1.1 - Get fresh token
2. Run Test 2.1 - Use token successfully
3. Wait for expiration (if configured)
4. Run Test 2.4 - Token should be rejected
5. Run Test 1.1 again - Get new token

**Full Regression Test Suite:**
Execute all tests in order (1.1 through 3.12) to verify all functionality:
```bash
# Run comprehensive test
# Takes ~2-3 minutes
# Should have: 
#   - 6 passing authentication tests
#   - 4 passing authorization tests  
#   - 12 passing user creation tests
#   - Total: 22 tests
```

---

## 🎯 Quick Reference

### Start Both Applications (Development)

**Terminal 1 - Backend:**
```powershell
cd backoffice
npm run dev
# → http://localhost:4000
```

**Terminal 2 - Frontend:**
```powershell
cd FrontAdminTable
npm start
# → http://localhost:3000
```

### Default Credentials
```
Username: admin
Password: admin123
```
*(If seeded with `npm run seed`)*

### Key URLs
- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Login Page**: http://localhost:3000/login
- **Cards Page**: http://localhost:3000/cards

### Common Commands

**Backend:**
```bash
cd backoffice
npm install          # Install dependencies
npm run dev          # Start with auto-reload
npm start            # Start production mode
npm run seed         # Create admin user
npm test             # Run API tests
```

**Frontend:**
```bash
cd FrontAdminTable
npm install          # Install dependencies
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests
```

### Environment Files

**Backend Config:** `backoffice/config/local.json`
```json
{
  "dbConfig": {
    "host": "localhost",
    "user": "your-user",
    "password": "your-password",
    "database": "marketing_posts"
  },
  "jwtPrivateKey": "your-secret-key"
}
```

**Frontend Config:** `FrontAdminTable/src/config.json`
```json
{
  "SERVER_URL": "http://localhost:4000"
}
```

### Troubleshooting Quick Fixes

**Backend won't start:**
```bash
# Check MySQL is running
# Verify config/local.json exists
# Check port 4000 is available
```

**Frontend can't connect:**
```bash
# 1. Verify backend is running
curl http://localhost:4000

# 2. Check config.json has correct URL
# 3. Clear browser cache/localStorage
```

**Login fails:**
```bash
# 1. Seed admin user
cd backoffice
npm run seed

# 2. Check backend logs
# 3. Verify database has users
```

### Project Documentation

- **Main README**: `./Readme.md` (this file)
- **Backend Docs**: `./backoffice/Readme.md`
- **API Testing**: `./backoffice/integration-tools/POSTMAN-GUIDE.md`
- **CI/CD Setup**: `./GITHUB-CICD-SETUP.md`
- **Deployment**: `./DEPLOYMENT-CONNECTION-GUIDE.md`
- **Frontend Migration**: `./FrontAdminTable/MIGRATION-GUIDE.md`

### Tech Stack Summary

| Component | Technology | Version | Port |
|-----------|-----------|---------|------|
| Backend | Node.js + Express | 5.2.1 | 4000 |
| Frontend | React | 18.3.1 | 3000 |
| Database | MySQL | 8.0+ | 3306 |
| Router | React Router | 5.3.4 | - |
| UI Framework | Bootstrap | 5.3.2 | - |
| HTTP Client | Axios | 1.6.2 | - |

### Development Tools

- **Backend Auto-reload**: nodemon
- **API Testing**: Postman/Newman
- **Frontend Dev Server**: react-scripts
- **Build Tool**: Create React App
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions

---

## License

ISC

## Author

Afonso Jaime