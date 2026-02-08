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

5. Initialize the database:
   - Run the DDL script in `integration-tools/MySQL_INITIAL_DDL.sql` to create the required tables

6. Create the initial admin user:
```bash
npm run seed
```
   This will create an admin user with:
   - Username: `admin`
   - Password: `admin123` (change in `seed-admin.js` before running)
   - Email: `admin@example.com`
   - Admin privileges: Yes

## Usage

### Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start server with auto-reload (nodemon) |
| `npm run seed` | Create initial admin user in database |
| `npm test` | Run API tests with Newman (CLI output) |
| `npm run test:verbose` | Run tests with detailed debugging information |
| `npm run test:report` | Run tests and generate HTML report |

### Start the Server

**Production mode:**
```bash
npm start
```

**Development mode with auto-reload:**
```bash
npm run dev
```

**Seed initial admin user:**
```bash
npm run seed
```

The server will start on `http://localhost:4000`

### Run API Tests

**Quick test:**
```bash
npm test
```

**With detailed output:**
```bash
npm run test:verbose
```

**Generate visual HTML report:**
```bash
npm run test:report
# Opens newman-report.html
```

> **💡 Note:** Make sure the server is running before executing tests.

## 📚 Documentation Index

This repository contains multiple documentation files for different purposes:

- **[Readme.md](Readme.md)** (this file) - Main project documentation with API testing guide
- **[Postman Collection Guide](integration-tools/POSTMAN-GUIDE.md)** - Complete guide for Postman and Newman testing
- **[Postman Collection](integration-tools/Backoffice-API-Tests.postman_collection.json)** - Ready-to-import collection with 22 tests
- **[Postman Environment](integration-tools/Backoffice-API.postman_environment.json)** - Environment variables configuration

---

## Quick Start: Testing with Postman & Newman

**🎯 Want to test the API?**

**Option 1: Postman GUI (Interactive testing)**
Import the ready-to-use Postman collection from the `integration-tools/` directory:
- Complete test suite with all 22 automated tests
- Environment variables pre-configured
- See [Postman Collection Guide](integration-tools/POSTMAN-GUIDE.md) for detailed setup instructions

**Option 2: Newman CLI (Automated testing)**
Run tests from the command line:
```bash
npm test                # Run all tests
npm run test:verbose    # Detailed output
npm run test:report     # Generate HTML report
```

---

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
- Tools: curl, Postman, Thunder Client, Newman, or any HTTP client
- Valid JWT token (obtained from login)
- MySQL database with `users` table containing at least one user

### Automated Testing with Newman

[Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) is the command-line Collection Runner for Postman. It allows you to run and test Postman collections directly from the command line.

#### Installation

Install Newman as a development dependency:
```bash
npm install
```

Or install globally:
```bash
npm install -g newman
```

#### Running Tests with Newman

**Basic test run:**
```bash
npm test
```

**Verbose output with detailed information:**
```bash
npm run test:verbose
```

**Generate HTML report:**
```bash
npm run test:report
```
This creates a `newman-report.html` file in the project root.

#### Manual Newman Commands

**Run collection with environment:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json
```

**Run with custom environment variables:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --env-var "validUsername=admin" \
  --env-var "validPassword=admin123"
```

**Run specific folder (e.g., only login tests):**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --folder "1. Login Tests"
```

**Multiple reporters (CLI + HTML + JSON):**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --reporters cli,html,json \
  --reporter-html-export report.html \
  --reporter-json-export report.json
```

#### Newman CI/CD Integration

Newman is perfect for integrating API tests into your CI/CD pipeline:

**GitHub Actions Example:**
```yaml
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run seed
      - run: npm start &
      - run: npm test
```

**GitLab CI Example:**
```yaml
test_api:
  script:
    - npm install
    - npm run seed
    - npm start &
    - sleep 5
    - npm test
```

#### Expected Output

Successful test run should show:
```
→ Backoffice API - Complete Test Suite
  ↳ 1. Login Tests
    ↳ 1.1 Login - Success
      POST http://localhost:4000/login [200 OK, 245B, 45ms]
      ✓ Status code is 200
      ✓ Token header exists
  ...

┌─────────────────────────┬────────────┬────────────┐
│                         │   executed │     failed │
├─────────────────────────┼────────────┼────────────┤
│              iterations │          1 │          0 │
├─────────────────────────┼────────────┼────────────┤
│                requests │         22 │          0 │
├─────────────────────────┼────────────┼────────────┤
│            test-scripts │         22 │          0 │
├─────────────────────────┼────────────┼────────────┤
│      prerequest-scripts │          4 │          0 │
├─────────────────────────┼────────────┼────────────┤
│              assertions │         66 │          0 │
├─────────────────────────┴────────────┴────────────┤
│ total run duration: 2.3s                          │
└───────────────────────────────────────────────────┘
```

> **💡 Tip:** Make sure to run `npm run seed` before running tests to ensure you have an admin user in the database.

---

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

**🚀 Ready-to-Use Postman Collection Available!**

A complete Postman collection with all 22 test cases is included in the `postman/` directory.

**Quick Start:**

1. **Import Files:**
   - Open Postman
   - Import `postman/Backoffice-API-Tests.postman_collection.json`
   - Import `postman/Backoffice-API.postman_environment.json`

2. **Configure Environment:**
   - Select "Backoffice API - Local Development" environment
   - Update these variables:
     - `validUsername` - Your admin username
     - `validPassword` - Your admin password
     - `validEmail` - Your admin email
     - `jwtPrivateKey` - Your JWT secret key

3. **Run Tests:**
   - Click **Run** on the collection
   - Select the environment
   - Execute all 22 tests automatically

**What's Included:**
- ✅ All 22 test cases with automated assertions
- ✅ Environment variables aligned with Node.js config
- ✅ Automatic token management
- ✅ Dynamic test data generation
- ✅ Pre-request and test scripts
- ✅ Complete documentation in [Postman Guide](postman/POSTMAN-GUIDE.md)

**See [Postman Collection Guide](postman/POSTMAN-GUIDE.md) for detailed instructions.**

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

## License

ISC

## Author

Afonso Jaime