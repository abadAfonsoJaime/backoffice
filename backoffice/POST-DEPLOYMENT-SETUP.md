# Post-Deployment Setup Guide

This guide covers the complete setup process after deploying the backoffice application to a new environment.

## Prerequisites

- ✅ MySQL 8.0+ database server accessible
- ✅ Database created (e.g., `marketing_posts`)
- ✅ Database user with proper permissions
- ✅ Node.js installed on deployment server
- ✅ Application code deployed to server

## Step-by-Step Setup

### Step 1: Configure Environment Variables

Set all required environment variables **before** starting the application.

#### Required Variables

```bash
DB_HOST=your-mysql-host.com
DB_USER=srv_backoffice
DB_PASSWORD=your_secure_password_here
DB_PORT=3306
DB_NAME=marketing_posts
JWT_PRIVATE_KEY=generate_a_strong_32_char_key
```

#### Setting Variables by Platform

<details>
<summary><b>Windows Server (PowerShell)</b></summary>

```powershell
# Persistent (survives reboots)
[System.Environment]::SetEnvironmentVariable('DB_HOST', 'localhost', 'Machine')
[System.Environment]::SetEnvironmentVariable('DB_USER', 'srv_backoffice', 'Machine')
[System.Environment]::SetEnvironmentVariable('DB_PASSWORD', 'your_password', 'Machine')
[System.Environment]::SetEnvironmentVariable('DB_PORT', '3306', 'Machine')
[System.Environment]::SetEnvironmentVariable('DB_NAME', 'marketing_posts', 'Machine')
[System.Environment]::SetEnvironmentVariable('JWT_PRIVATE_KEY', 'your_jwt_key', 'Machine')

# Restart required for Machine-level variables
Restart-Computer
```

Or for current session only:
```powershell
$env:DB_HOST="localhost"
$env:DB_USER="srv_backoffice"
$env:DB_PASSWORD="your_password"
$env:DB_PORT="3306"
$env:DB_NAME="marketing_posts"
$env:JWT_PRIVATE_KEY="your_jwt_key"
```
</details>

<details>
<summary><b>Linux Server</b></summary>

Add to `/etc/environment` (system-wide):
```bash
DB_HOST=localhost
DB_USER=srv_backoffice
DB_PASSWORD=your_password
DB_PORT=3306
DB_NAME=marketing_posts
JWT_PRIVATE_KEY=your_jwt_key
```

Or add to `~/.bashrc` or `~/.profile` (user-specific):
```bash
export DB_HOST=localhost
export DB_USER=srv_backoffice
export DB_PASSWORD=your_password
export DB_PORT=3306
export DB_NAME=marketing_posts
export JWT_PRIVATE_KEY=your_jwt_key
```

Apply changes:
```bash
source ~/.bashrc
# or
source /etc/environment
```
</details>

<details>
<summary><b>Azure App Service</b></summary>

Navigate to: **Configuration → Application settings**

Add each variable:
- Name: `DB_HOST`, Value: `your-mysql-server.mysql.database.azure.com`
- Name: `DB_USER`, Value: `srv_backoffice@your-mysql-server`
- Name: `DB_PASSWORD`, Value: `[your-password]`
- Name: `DB_PORT`, Value: `3306`
- Name: `DB_NAME`, Value: `marketing_posts`
- Name: `JWT_PRIVATE_KEY`, Value: `[your-jwt-key]`

Click **Save** and **Confirm** to restart the app.
</details>

<details>
<summary><b>AWS (Elastic Beanstalk / EC2)</b></summary>

**Elastic Beanstalk:**
```bash
eb setenv DB_HOST=your-rds.amazonaws.com \
  DB_USER=srv_backoffice \
  DB_PASSWORD=your_password \
  DB_PORT=3306 \
  DB_NAME=marketing_posts \
  JWT_PRIVATE_KEY=your_jwt_key
```

**EC2 with PM2:**
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'backoffice',
    script: './index.js',
    env: {
      DB_HOST: 'localhost',
      DB_USER: 'srv_backoffice',
      DB_PASSWORD: 'your_password',
      DB_PORT: '3306',
      DB_NAME: 'marketing_posts',
      JWT_PRIVATE_KEY: 'your_jwt_key'
    }
  }]
};
```
</details>

<details>
<summary><b>Heroku</b></summary>

```bash
heroku config:set DB_HOST=your-mysql-host.com
heroku config:set DB_USER=srv_backoffice
heroku config:set DB_PASSWORD=your_password
heroku config:set DB_PORT=3306
heroku config:set DB_NAME=marketing_posts
heroku config:set JWT_PRIVATE_KEY=your_jwt_key
```

Verify:
```bash
heroku config
```
</details>

### Step 2: Initialize Database Schema

Run the DDL script to create tables:

```bash
cd backoffice
mysql -h your-mysql-host -u srv_backoffice -p marketing_posts < integration-tools/MySQL_INITIAL_DDL.sql
```

Or connect to MySQL and run manually:
```sql
USE marketing_posts;
SOURCE integration-tools/MySQL_INITIAL_DDL.sql;
```

**Verify tables were created:**
```sql
SHOW TABLES;
-- Expected: users, posts
```

### Step 3: Seed Initial Data

Navigate to the backoffice directory and run the seed script:

```bash
cd backoffice
npm run seed-db
```

**Expected Output:**
```
🌱 Starting database seeding...

✅ Connected to database
   Host: localhost
   Database: marketing_posts

📝 Seeding Admin User...
✅ Admin user created successfully!
   Username: admin
   Email: admin@example.com
   Password: admin123
   User ID: 1

📝 Seeding Default Cards/Posts...
✅ Created card: "Welcome to Backoffice" (ID: 1)
✅ Created card: "Getting Started Guide" (ID: 2)
✅ Created card: "Feature Announcement" (ID: 3)
✅ Created card: "Contact Support" (ID: 4)

📊 Summary:
   Total cards attempted: 4
   New cards created: 4

🔒 Database connection closed

🎉 Database seeding completed successfully!
```

### Step 4: Verify Environment Configuration

Test that environment variables are correctly loaded:

```bash
cd backoffice
node -e "const config = require('config'); console.log(config.get('dbConfig'));"
```

**Expected Output:**
```javascript
{
  host: 'your-mysql-host',
  user: 'srv_backoffice',
  password: '***',  // masked
  port: 3306,
  database: 'marketing_posts'
}
```

### Step 5: Start the Application

```bash
cd backoffice
npm start
```

**Verify Startup:**
- ✅ No database connection errors
- ✅ Server starts on port 4000 (or configured port)
- ✅ Console shows: "Server running on port 4000"

### Step 6: Test Basic Functionality

#### Test 1: Health Check
```bash
curl http://localhost:4000/
```

#### Test 2: Login with Seeded Admin
```bash
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

#### Test 3: Retrieve Cards (Requires Token)
```bash
# Use token from login response
curl http://localhost:4000/cards \
  -H "x-auth-token: YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "title": "Welcome to Backoffice",
    "description": "This is your first card...",
    "landingPage": "https://example.com/welcome",
    "buttonText": "Learn More",
    "isVisible": true
  },
  // ... 3 more cards
]
```

## Post-Setup Security Tasks

### Critical Security Actions

1. **Change Default Admin Password**
   ```bash
   # Login to frontend
   # Navigate to: http://localhost:3000
   # Login as admin/admin123
   # Go to profile/settings and change password
   ```

2. **Review JWT Key Strength**
   ```bash
   # Ensure JWT_PRIVATE_KEY is at least 32 characters
   # Use random string generator for production
   openssl rand -base64 32
   ```

3. **Verify Database User Permissions**
   ```sql
   SHOW GRANTS FOR 'srv_backoffice'@'%';
   -- Should only have SELECT, INSERT, UPDATE, DELETE
   -- NOT: DROP, CREATE, ALTER, GRANT
   ```

4. **Enable HTTPS (Production)**
   - Configure SSL/TLS certificates
   - Update frontend config.json to use HTTPS endpoint
   - Enable HSTS headers

5. **Restrict CORS (Production)**
   - Edit `backoffice/index.js`
   - Change `cors()` to specific origin:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

## Troubleshooting

### Issue: "Failed to connect to database"

**Causes & Solutions:**

1. **Environment variables not set**
   ```bash
   # Verify all variables
   echo $DB_HOST $DB_USER $DB_PORT $DB_NAME
   ```

2. **Database not accessible**
   ```bash
   # Test direct MySQL connection
   mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -P $DB_PORT $DB_NAME
   ```

3. **Firewall blocking connection**
   - Ensure MySQL port (3306) is open
   - Check security group rules (AWS/Azure)

### Issue: "Seed script fails with duplicate entry"

**Solution:** This is normal if running seed script multiple times. The script skips existing records.

### Issue: "JWT must be provided" on API calls

**Solution:** 
1. Login to get token
2. Include token in header: `x-auth-token: YOUR_TOKEN`

### Issue: Frontend can't connect to backend

**Causes & Solutions:**

1. **Backend not running**
   ```bash
   cd backoffice && npm start
   ```

2. **Wrong URL in frontend config**
   - Check `FrontAdminTable/src/config.js`
   - Should match backend URL: `http://localhost:4000`

3. **CORS not enabled**
   - Verify `cors` middleware is enabled in `backoffice/index.js`

## Deployment Checklist

Use this checklist for each new deployment:

- [ ] Create MySQL database
- [ ] Create database user with proper permissions
- [ ] Set all 6 environment variables
- [ ] Verify environment variables are loaded
- [ ] Run DDL script to create tables
- [ ] Run seed script (`npm run seed-db`)
- [ ] Verify admin user was created
- [ ] Verify default cards were created
- [ ] Start application (`npm start`)
- [ ] Test login endpoint
- [ ] Test cards endpoint with authentication
- [ ] Change default admin password
- [ ] Generate strong JWT key for production
- [ ] Enable HTTPS (production only)
- [ ] Configure CORS for production domain
- [ ] Review and restrict database user permissions
- [ ] Set up monitoring and logging

## Additional Resources

- **[Environment Variables Guide](ENVIRONMENT-VARIABLES.md)** - Comprehensive variable documentation
- **[Seeding Guide](SEEDING-GUIDE.md)** - Database seeding options and behavior
- **[Configuration Guide](config/CONFIGURATION-GUIDE.md)** - Configuration file hierarchy
- **[Backend API Guide](BACKEND-API-GUIDE.md)** - Complete API documentation
- **[Main README](../Readme.md)** - Full application documentation
- **[CI/CD Setup](../GITHUB-CICD-SETUP.md)** - Automated deployment guide

## Support

If you encounter issues not covered in this guide:
1. Check application logs for detailed error messages
2. Enable debug logging: `DEBUG=backoffice:* npm start`
3. Verify database connectivity independently
4. Review security group/firewall rules
5. Consult the troubleshooting section in main README
