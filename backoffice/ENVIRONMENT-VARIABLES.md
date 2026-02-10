# Environment Variables Guide

## Overview

This guide explains how to configure environment variables for the Backoffice API backend service. The application uses the `config` package to manage configuration across different environments (development, staging, production).

## Required Environment Variables

### Database Configuration

| Variable Name | Description | Example Value | Required |
|--------------|-------------|---------------|----------|
| `DB_HOST` | MySQL database host address | `localhost` or `127.0.0.1` | ✅ Yes |
| `DB_USER` | MySQL database username | `srv_backoffice` | ✅ Yes |
| `DB_PASSWORD` | MySQL database password | `your_secure_password` | ✅ Yes |
| `DB_PORT` | MySQL database port | `3306` | ⚠️ Optional (defaults to 3306) |
| `DB_NAME` | MySQL database name | `marketing_posts` | ✅ Yes |

### Authentication Configuration

| Variable Name | Description | Example Value | Required |
|--------------|-------------|---------------|----------|
| `JWT_PRIVATE_KEY` | Secret key for JWT token signing | `mySecureJWTKey123!` | ✅ Yes |

## Configuration Methods

### Method 1: Local Development (config/local.json)

For local development, you can use the `config/local.json` file (already configured):

```json
{
  "dbConfig": {
    "host": "localhost",
    "user": "srv_backoffice",
    "password": "6/|e`elL;@Z*RHmY",
    "port": 3306,
    "database": "marketing_posts"
  },
  "jwtPrivateKey": "unsecureKey"
}
```

⚠️ **Note:** `local.json` is ignored by git and should NEVER be committed to version control.

### Method 2: Environment Variables (Recommended for Production)

#### Windows PowerShell

```powershell
# Set environment variables for current session
$env:DB_HOST="localhost"
$env:DB_USER="srv_backoffice"
$env:DB_PASSWORD="6/|e`elL;@Z*RHmY"
$env:DB_PORT="3306"
$env:DB_NAME="marketing_posts"
$env:JWT_PRIVATE_KEY="mySecureJWTKey123!"

# Verify variables are set
Get-ChildItem Env: | Where-Object {$_.Name -like "DB_*" -or $_.Name -eq "JWT_PRIVATE_KEY"}

# Run the application
npm start
```

#### Windows Command Prompt

```cmd
set DB_HOST=localhost
set DB_USER=srv_backoffice
set DB_PASSWORD=6/|e`elL;@Z*RHmY
set DB_PORT=3306
set DB_NAME=marketing_posts
set JWT_PRIVATE_KEY=mySecureJWTKey123!

npm start
```

#### Linux / macOS

```bash
# Set environment variables for current session
export DB_HOST="localhost"
export DB_USER="srv_backoffice"
export DB_PASSWORD="6/|e`elL;@Z*RHmY"
export DB_PORT="3306"
export DB_NAME="marketing_posts"
export JWT_PRIVATE_KEY="mySecureJWTKey123!"

# Verify variables are set
env | grep -E "DB_|JWT_"

# Run the application
npm start
```

### Method 3: .env File (Alternative)

Create a `.env` file in the `backoffice/` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=srv_backoffice
DB_PASSWORD=6/|e`elL;@Z*RHmY
DB_PORT=3306
DB_NAME=marketing_posts

# JWT Configuration
JWT_PRIVATE_KEY=mySecureJWTKey123!
```

⚠️ **Important:** Add `.env` to your `.gitignore` file to prevent committing sensitive data.

## Database Seeding

### Initial Database Setup

After configuring environment variables, seed the database with default data:

```bash
# Navigate to backoffice directory
cd backoffice

# Run the comprehensive seed script
npm run seed-db
```

This will:
1. ✅ Create an admin user:
   - **Username:** `admin`
   - **Email:** `admin@example.com`
   - **Password:** `admin123` (⚠️ change in production!)
   - **Role:** Administrator

2. ✅ Create 4 default cards/posts:
   - Welcome to Backoffice
   - Getting Started Guide
   - Feature Announcement
   - Contact Support

### Seed Script Features

- **Idempotent:** Safe to run multiple times (skips existing records)
- **Comprehensive:** Seeds both users and posts tables
- **Logging:** Clear console output showing progress
- **Error Handling:** Graceful handling of duplicates and errors

## Deployment Configuration

### Production Checklist

- [ ] Generate a strong, unique `JWT_PRIVATE_KEY` (minimum 32 characters)
- [ ] Use secure database password (avoid special characters that require escaping)
- [ ] Set `DB_HOST` to your production MySQL server
- [ ] Ensure `DB_PORT` matches your MySQL configuration
- [ ] Verify `DB_NAME` matches your production database
- [ ] Test database connection before deploying
- [ ] Run `npm run seed-db` after initial deployment
- [ ] Change default admin password immediately after first login

### Cloud Platform Examples

#### Azure App Service

Configure in **Configuration > Application settings**:

```
DB_HOST = your-mysql-server.mysql.database.azure.com
DB_USER = srv_backoffice@your-mysql-server
DB_PASSWORD = [your-secure-password]
DB_PORT = 3306
DB_NAME = marketing_posts
JWT_PRIVATE_KEY = [your-unique-jwt-key]
```

#### AWS Elastic Beanstalk

Configure via `.ebextensions/environment.config`:

```yaml
option_settings:
  - namespace: aws:elasticbeanstalk:application:environment
    option_name: DB_HOST
    value: your-rds-endpoint.rds.amazonaws.com
  - namespace: aws:elasticbeanstalk:application:environment
    option_name: DB_USER
    value: srv_backoffice
  # ... (add remaining variables)
```

#### Heroku

```bash
heroku config:set DB_HOST=your-mysql-host.com
heroku config:set DB_USER=srv_backoffice
heroku config:set DB_PASSWORD=your-secure-password
heroku config:set DB_PORT=3306
heroku config:set DB_NAME=marketing_posts
heroku config:set JWT_PRIVATE_KEY=your-unique-jwt-key
```

## Troubleshooting

### Issue: "Cannot connect to database"

**Solution:** Verify environment variables are set correctly:

```bash
# Windows PowerShell
Get-ChildItem Env: | Where-Object {$_.Name -like "DB_*"}

# Linux/macOS
env | grep DB_
```

### Issue: "JWT must be provided"

**Solution:** Ensure `JWT_PRIVATE_KEY` is set:

```bash
# Windows PowerShell
$env:JWT_PRIVATE_KEY

# Linux/macOS
echo $JWT_PRIVATE_KEY
```

### Issue: Seeding fails with "Table doesn't exist"

**Solution:** Run the DDL script first:

```bash
# From MySQL command line or workbench
mysql -u srv_backoffice -p marketing_posts < integration-tools/MySQL_INITIAL_DDL.sql
```

## Security Best Practices

1. ✅ **Never commit** `local.json` or `.env` files to version control
2. ✅ **Use strong passwords** for database and JWT keys in production
3. ✅ **Rotate JWT keys** periodically in production environments
4. ✅ **Limit database user permissions** to only required operations
5. ✅ **Use SSL/TLS** for database connections in production
6. ✅ **Change default credentials** immediately after deployment

## Configuration Hierarchy

The `config` package loads configuration in this order (later sources override earlier ones):

1. `config/default.json` - Base configuration
2. `config/custom-environment-variables.json` - Environment variable mappings
3. `config/local.json` - Local development overrides (git-ignored)
4. Environment variables - Production configuration

## Additional Resources

### Internal Documentation
- **[Configuration Guide](config/CONFIGURATION-GUIDE.md)** - Config files hierarchy and loading order
- **[Seeding Guide](SEEDING-GUIDE.md)** - Database initialization and seeding
- **[Post-Deployment Setup](POST-DEPLOYMENT-SETUP.md)** - Complete deployment checklist
- **[Backend API Guide](BACKEND-API-GUIDE.md)** - API endpoints and usage
- **[Main README](../Readme.md)** - Project overview

### External Resources
- [Config Package Documentation](https://github.com/node-config/node-config)
- [MySQL Secure Deployment Guide](https://dev.mysql.com/doc/refman/8.0/en/security-guidelines.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
