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

### Running Tests with Newman

[Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) is Postman's command-line Collection Runner, perfect for CI/CD integration and automated testing.

#### Installation

**Install via npm (project dependency):**
```bash
npm install newman --save-dev
```

**Install globally:**
```bash
npm install -g newman
```

#### Basic Usage

**Run the complete test suite:**
```bash
npm test
```

This runs the npm script defined in package.json:
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json
```

#### Available npm Scripts

The project includes three Newman test scripts:

**1. Standard test run:**
```bash
npm test
```
Runs all tests with standard CLI output.

**2. Verbose output:**
```bash
npm run test:verbose
```
Shows detailed request/response information for debugging.

**3. HTML report generation:**
```bash
npm run test:report
```
Creates a `newman-report.html` file with a visual test report.

#### Advanced Newman Options

**Run specific folder:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --folder "1. Login Tests"
```

**Override environment variables:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --env-var "validUsername=admin" \
  --env-var "validPassword=admin123"
```

**Multiple reporters:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --reporters cli,html,json \
  --reporter-html-export test-report.html \
  --reporter-json-export test-results.json
```

**Delay between requests (useful for rate-limited APIs):**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --delay-request 1000
```

**Timeout configuration:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --timeout-request 5000 \
  --timeout-script 10000
```

**Disable SSL verification (not recommended for production):**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --insecure
```

**Set global variables:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --global-var "apiVersion=v1"
```

#### Newman Output Interpretation

**Successful run example:**
```
→ Backoffice API - Complete Test Suite
  ↳ 1. Login Tests
    ↳ 1.1 Login - Success
      POST http://localhost:4000/login [200 OK, 245B, 45ms]
      ✓ Status code is 200
      ✓ Token header exists
    ↳ 1.2 Login - Missing Username
      POST http://localhost:4000/login [400 Bad Request, 198B, 12ms]
      ✓ Status code is 400
      ✓ Error message returned

┌─────────────────────────┬───────────────────┬──────────────────┐
│                         │          executed │           failed │
├─────────────────────────┼───────────────────┼──────────────────┤
│              iterations │                 1 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│                requests │                22 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│            test-scripts │                22 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│      prerequest-scripts │                 4 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│              assertions │                66 │                0 │
├─────────────────────────┴───────────────────┴──────────────────┤
│ total run duration: 2.3s                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Exit codes:**
- `0` - All tests passed
- `1` - One or more tests failed
- Useful for CI/CD pipeline decisions

#### CI/CD Integration Examples

**GitHub Actions:**
```yaml
name: API Tests
on: [push, pull_request]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: marketing_posts
        ports:
          - 3306:3306
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backoffice
          npm install
      
      - name: Configure database
        run: |
          # Run initial DDL script
          mysql -h 127.0.0.1 -u root -proot marketing_posts < backoffice/integration-tools/MySQL_INITIAL_DDL.sql
      
      - name: Seed admin user
        run: |
          cd backoffice
          npm run seed
      
      - name: Start server
        run: |
          cd backoffice
          npm start &
          sleep 5
      
      - name: Run API tests
        run: |
          cd backoffice
          npm test
      
      - name: Generate HTML report
        if: always()
        run: |
          cd backoffice
          npm run test:report
      
      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: newman-report
          path: backoffice/newman-report.html
```

**GitLab CI:**
```yaml
image: node:18

services:
  - mysql:8.0

variables:
  MYSQL_ROOT_PASSWORD: root
  MYSQL_DATABASE: marketing_posts

stages:
  - test

api_tests:
  stage: test
  before_script:
    - cd backoffice
    - npm install
    - mysql -h mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < integration-tools/MySQL_INITIAL_DDL.sql
    - npm run seed
  script:
    - npm start &
    - sleep 5
    - npm test
  artifacts:
    when: always
    paths:
      - backoffice/newman-report.html
    reports:
      junit: backoffice/test-results.xml
```

**Jenkins Pipeline:**
```groovy
pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'cd backoffice && npm install'
            }
        }
        
        stage('Setup Database') {
            steps {
                sh '''
                    mysql -u root -p$MYSQL_PASSWORD marketing_posts < backoffice/integration-tools/MySQL_INITIAL_DDL.sql
                    cd backoffice && npm run seed
                '''
            }
        }
        
        stage('Start Server') {
            steps {
                sh 'cd backoffice && npm start &'
                sleep time: 5, unit: 'SECONDS'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'cd backoffice && npm run test:report'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                reportDir: 'backoffice',
                reportFiles: 'newman-report.html',
                reportName: 'Newman Test Report'
            ])
        }
    }
}
```

#### Troubleshooting Common Issues

**Issue: Connection refused**
```
Error: connect ECONNREFUSED 127.0.0.1:4000
```
**Solution:** Ensure the server is running before executing tests.

**Issue: Authentication failures**
```
✗ Token header exists
```
**Solution:** Verify environment variables `validUsername` and `validPassword` match a user in the database.

**Issue: Database not found**
```
Error: ER_BAD_DB_ERROR: Unknown database
```
**Solution:** Run the MySQL DDL script and seed the admin user:
```bash
npm run seed
```

**Issue: Tests pass in Postman but fail in Newman**
```
✗ Assertion failed
```
**Solution:** Check that environment variables are correctly set in the environment file. Postman GUI and Newman use separate environment configurations.

#### Newman HTML Reporter

The HTML report generated by `npm run test:report` includes:
- ✅ Pass/Fail summary with visual indicators
- 📊 Request/response details for each test
- ⏱️ Execution time per request
- 📝 Assertion results with detailed messages
- 🔍 Full request/response headers and bodies

Open `newman-report.html` in any browser to view the detailed report.

#### Newman Reporters

Available reporters:
- **cli** - Standard terminal output (default)
- **json** - JSON format for parsing and integration
- **html** - Visual HTML report
- **junit** - JUnit XML format for CI tools
- **htmlextra** - Enhanced HTML with charts (requires separate package)

**Install additional reporters:**
```bash
npm install -g newman-reporter-htmlextra
```

**Use with Newman:**
```bash
newman run collection.json -e environment.json --reporters htmlextra
```

---

## Quick Reference: Newman Commands

### Essential Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests with standard output |
| `npm run test:verbose` | Run tests with detailed debugging info |
| `npm run test:report` | Run tests and generate HTML report |

### Common Newman Options

| Option | Example | Description |
|--------|---------|-------------|
| `-e, --environment` | `-e env.json` | Specify environment file |
| `--folder` | `--folder "Login Tests"` | Run specific folder only |
| `--env-var` | `--env-var "key=value"` | Override environment variable |
| `--reporters` | `--reporters cli,html,json` | Specify output reporters |
| `--reporter-html-export` | `--reporter-html-export report.html` | HTML report file path |
| `--reporter-json-export` | `--reporter-json-export results.json` | JSON report file path |
| `--delay-request` | `--delay-request 1000` | Delay between requests (ms) |
| `--timeout-request` | `--timeout-request 5000` | Request timeout (ms) |
| `--verbose` | `--verbose` | Show detailed output |
| `--bail` | `--bail` | Stop on first test failure |
| `--insecure` | `--insecure` | Disable SSL verification |

### Quick Test Scenarios

**Test only login functionality:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --folder "1. Login Tests"
```

**Test with custom credentials:**
```bash
newman run integration-tools/Backoffice-API-Tests.postman_collection.json \
  -e integration-tools/Backoffice-API.postman_environment.json \
  --env-var "validUsername=testuser" \
  --env-var "validPassword=testpass"
```

**Debug failing tests:**
```bash
npm run test:verbose
```

**Generate report for stakeholders:**
```bash
npm run test:report
# Open newman-report.html in browser
```

---



## Support

For issues or questions:
- Check main project README.md
- Review individual test descriptions
- Verify environment variables match your configuration
- Ensure database contains at least one admin user
