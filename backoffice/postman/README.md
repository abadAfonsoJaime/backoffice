# Postman Collection for Backoffice API

This directory contains a comprehensive Postman collection with 22 automated test cases covering all API endpoints.

## Files

- **`Backoffice-API-Tests.postman_collection.json`** - Complete test collection with all 22 test cases
- **`Backoffice-API.postman_environment.json`** - Environment variables aligned with Node.js configuration

## Quick Setup

### 1. Import Collection and Environment

1. Open Postman
2. Click **Import** button
3. Select both JSON files:
   - `Backoffice-API-Tests.postman_collection.json`
   - `Backoffice-API.postman_environment.json`
4. Click **Import**

### 2. Configure Environment Variables

After importing, select the **"Backoffice API - Local Development"** environment and update these variables:

**Required (Update These):**
- `validUsername` - Your admin username (e.g., "admin_user")
- `validPassword` - Your admin password
- `validEmail` - Your admin email
- `jwtPrivateKey` - Your JWT secret key (must match server config)
- `dbPassword` - Your database password (for reference only)

**Automatically Set Variables (Don't change):**
- `authToken` - Set automatically after successful login (Test 1.1)
- `newUserToken` - Set automatically after creating a user (Test 3.1)
- `testUsername`, `testEmail`, etc. - Generated dynamically during tests

**Pre-configured (Usually correct):**
- `baseUrl` - http://localhost:4000
- `port` - 4000
- `dbHost` - localhost
- `dbPort` - 3306
- `dbUser` - srv_backoffice
- `dbName` - marketing_posts

### 3. Ensure Server is Running

Start your backoffice server:
```bash
cd backoffice
npm start
```

Verify it's running at http://localhost:4000

## Running Tests

### Run All Tests (Complete Suite)

1. Select **"Backoffice API - Complete Test Suite"** collection
2. Click **Run** button
3. Select **"Backoffice API - Local Development"** environment
4. Click **Run Backoffice API - Complete Test Suite**
5. Watch all 22 tests execute sequentially

**Expected Results:**
- ✅ 22 tests passing
- ⏱️ Execution time: ~2-3 seconds
- 📊 Some requests may fail intentionally (e.g., duplicate tests if run multiple times)

### Run Individual Test Groups

You can run specific test groups:

**1. Login Tests (6 tests)**
- Expand "1. Login Tests" folder
- Click Run on folder
- Tests authentication scenarios

**2. Get User Info Tests (4 tests)**
- Expand "2. Get User Info Tests" folder  
- Click Run on folder
- Tests authorization and token validation

**3. Create User Tests (12 tests)**
- Expand "3. Create User Tests (Admin)" folder
- Click Run on folder  
- Tests user creation, validation, and constraints

### Run Individual Tests

Click on any test request to:
- View request details
- See pre-request scripts
- Review test assertions
- Send individual request
- Examine response

## Test Coverage

### All 22 Tests Included:

#### Login Tests (6)
- ✅ Test 1.1: Successful Login
- ✅ Test 1.2: Login with Incorrect Password
- ✅ Test 1.3: Login with Non-existent Username
- ✅ Test 1.4: Login with Missing Username
- ✅ Test 1.5: Login with Missing Password
- ✅ Test 1.6: Login with Empty Body

#### Get User Info Tests (4)
- ✅ Test 2.1: Get User Info with Valid Token
- ✅ Test 2.2: Get User Info Without Token (401)
- ✅ Test 2.3: Get User Info with Invalid Token
- ✅ Test 2.4: Get User Info with Expired Token

#### Create User Tests (12)
- ✅ Test 3.1: Create User Successfully (Admin)
- ✅ Test 3.2: Create User Without Authentication (401)
- ✅ Test 3.3: Create User as Non-Admin User (403)
- ✅ Test 3.4: Create User with Missing Username
- ✅ Test 3.5: Create User with Missing Email
- ✅ Test 3.6: Create User with Missing Password
- ✅ Test 3.7: Create User with Short Password
- ✅ Test 3.8: Create User with Invalid Email Format
- ✅ Test 3.9: Create User with Duplicate Username
- ✅ Test 3.10: Create User with Duplicate Email
- ✅ Test 3.11: Create Admin User
- ✅ Test 3.12: Create User Without isAdmin (Default)

## Features

### Automated Test Assertions

Each request includes comprehensive test scripts:
- Status code validation
- Response body validation
- Header validation
- Error message verification
- Data type checking

### Dynamic Variables

Tests use pre-request scripts to:
- Generate unique usernames/emails using timestamps
- Prevent duplicate entry conflicts
- Enable multiple test runs without manual cleanup

### Token Management

- **Test 1.1** automatically saves `authToken` after successful login
- **Test 3.1** automatically saves `newUserToken` for non-admin tests
- Tokens are reused across subsequent requests

### Test Dependencies

Some tests depend on previous tests:
1. **Test 2.1** requires `authToken` from Test 1.1
2. **Test 3.3** uses `newUserToken` from Test 3.1
3. Run tests in order for dependencies to work

## Environment Variables Alignment

### Node.js Environment Variables → Postman Variables

| Node ENV Variable | Postman Variable | Purpose |
|-------------------|------------------|---------|
| `PORT` | `port` | Server port |
| `jwtPrivateKey` / `purisimaJwtPrivateKey` | `jwtPrivateKey` | JWT secret key |
| `purisima_host` | `dbHost` | Database host |
| `purisima_user` | `dbUser` | Database user |
| `purisima_password` | `dbPassword` | Database password |
| `DEBUG` | `debugNamespace` | Debug logging |

### Node Config (default.json) → Postman Variables

| Config Path | Postman Variable | Value |
|-------------|------------------|-------|
| `dbConfig.host` | `dbHost` | localhost |
| `dbConfig.user` | `dbUser` | srv_backoffice |
| `dbConfig.port` | `dbPort` | 3306 |
| `dbConfig.database` | `dbName` | marketing_posts |

## Troubleshooting

### "Access denied" errors
- Ensure server is running
- Verify `validUsername` and `validPassword` are correct
- Run **Test 1.1** first to get a valid token

### "Duplicate entry" errors
- Expected when running Test 3.9 or 3.10 multiple times
- Tests use dynamic variables to minimize this
- Can be ignored or manually clean up test users from database

### "Invalid token" errors  
- Run **Test 1.1** to refresh the token
- Check that `jwtPrivateKey` in environment matches server configuration
- Token may have expired (if JWT expiration is configured)

### Tests not using environment variables
- Ensure **"Backoffice API - Local Development"** environment is selected (dropdown in top-right)
- Variables should appear in yellow when selected correctly

## Advanced Usage

### Query Parameters

Currently, the API doesn't use `:id` path parameters, but if you add endpoints like `/users/:id`:

1. Add variable in environment: `userId`
2. In request URL use: `{{baseUrl}}/users/{{userId}}`
3. Set value in pre-request script:
   ```javascript
   pm.environment.set("userId", "123");
   ```

### Custom Test Scripts

You can add custom assertions to any test:

```javascript
pm.test("Custom validation", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.someField).to.equal("expectedValue");
});
```

### Collection Variables

If you need variables shared across collections but not environment:

1. Right-click collection → **Edit**
2. Go to **Variables** tab
3. Add collection-level variables

## Export Results

After running tests:
1. Click **Export Results** in test runner
2. Save as JSON or HTML
3. Share with team or include in CI/CD reports

## CI/CD Integration

To run this collection in CI/CD using Newman:

```bash
npm install -g newman

newman run Backoffice-API-Tests.postman_collection.json \
  -e Backoffice-API.postman_environment.json \
  --reporters cli,json,html
```

## Support

For issues or questions:
- Check main project README.md
- Review individual test descriptions
- Verify environment variables match your configuration
- Ensure database contains at least one admin user
