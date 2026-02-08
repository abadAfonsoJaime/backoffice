# GitHub CI/CD Setup Guide

This guide walks you through setting up Continuous Integration and Continuous Deployment for the Backoffice Server using GitHub Actions.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Branch Strategy](#branch-strategy)
3. [GitHub Environments](#github-environments)
4. [Secrets and Variables](#secrets-and-variables)
5. [Branch Protection Rules](#branch-protection-rules)
6. [Workflows](#workflows)
7. [Deployment Process](#deployment-process)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────┐
│  Developer  │
└──────┬──────┘
       │ Push
       ▼
┌─────────────┐     PR       ┌─────────────┐
│   develop   │─────────────→│     main    │
│  (Staging)  │   (Review)   │ (Production)│
└──────┬──────┘              └──────┬──────┘
       │                            │
       │ Auto Deploy                │ Auto Deploy
       ▼                            ▼
┌──────────────┐            ┌──────────────┐
│   Staging    │            │  Production  │
│ Environment  │            │ Environment  │
│  (Windows)   │            │  (Windows)   │
└──────────────┘            └──────────────┘
```

**CI/CD Workflows:**
- **CI (Continuous Integration)**: Runs on every PR and push
- **CD Staging**: Auto-deploys `develop` branch to Windows staging server
- **CD Production**: Auto-deploys `main` branch to Windows production server

---

## Branch Strategy

### Branch Structure

| Branch    | Purpose           | Protection | Auto-Deploy |
|-----------|-------------------|------------|-------------|
| `main`    | Production code   | ✅ Yes     | ✅ Production |
| `develop` | Staging/Testing   | ✅ Yes     | ✅ Staging   |
| `feature/*` | Feature development | ❌ No | ❌ No |

### Workflow

1. Create feature branch from `develop`: `git checkout -b feature/my-feature develop`
2. Develop and commit changes
3. Push and create PR to `develop`
4. PR triggers CI tests
5. After approval, merge to `develop` → Auto-deploy to staging
6. Test in staging environment
7. Create PR from `develop` to `main`
8. After approval, merge to `main` → Auto-deploy to production

---

## GitHub Environments

### 1. Create Environments

Go to your GitHub repository → **Settings** → **Environments**

#### Create **production** environment:
1. Click "New environment"
2. Name: `production`
3. Configure:
   - ✅ Required reviewers: Add team members
   - ✅ Wait timer: 5 minutes (optional)
   - Deployment branches: `main` only

#### Create **staging** environment:
1. Click "New environment"
2. Name: `staging`
3. Configure:
   - Deployment branches: `develop` only

---

## Secrets and Variables

### Production Environment Secrets

Go to **Settings** → **Environments** → **production** → **Add secret**

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `PROD_DB_HOST` | Database hostname | `db.production.com` |
| `PROD_DB_PASSWORD` | Database password | `Str0ng!P@ssw0rd` |
| `PROD_JWT_PRIVATE_KEY` | JWT signing key | `production_jwt_secret_key_xyz` |

### Production Environment Variables

Go to **Settings** → **Environments** → **production** → **Add variable**

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `PROD_DB_USER` | Database username | `srv_backoffice` |
| `PROD_DB_PORT` | Database port | `3306` |
| `PROD_DB_NAME` | Database name | `marketing_posts` |
| `PROD_DEPLOY_PATH` | Deployment directory | `C:\inetpub\backoffice-api` |
| `PROD_BASE_URL` | Production base URL | `https://api.yourcompany.com` |

### Staging Environment Secrets

Go to **Settings** → **Environments** → **staging** → **Add secret**

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `STAGING_DB_HOST` | Database hostname | `db.staging.com` |
| `STAGING_DB_PASSWORD` | Database password | `Staging!P@ss` |
| `STAGING_JWT_PRIVATE_KEY` | JWT signing key | `staging_jwt_secret_key_abc` |

### Staging Environment Variables

Go to **Settings** → **Environments** → **staging** → **Add variable**

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `STAGING_DB_USER` | Database username | `srv_backoffice_staging` |
| `STAGING_DB_PORT` | Database port | `3306` |
| `STAGING_DB_NAME` | Database name | `marketing_posts_staging` |
| `STAGING_DEPLOY_PATH` | Deployment directory | `C:\inetpub\backoffice-api-staging` |
| `STAGING_BASE_URL` | Staging base URL | `https://api-staging.yourcompany.com` |

---

## Branch Protection Rules

### 1. Protect `main` Branch

Go to **Settings** → **Branches** → **Add branch protection rule**

**Branch name pattern:** `main`

**Settings to enable:**
- ✅ Require a pull request before merging
  - ✅ Require approvals: **2**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
- ✅ Require status checks to pass before merging
  - Add required checks:
    - `test` (CI workflow)
    - `code-quality` (CI workflow)
    - `build` (CI workflow)
- ✅ Require conversation resolution before merging
- ✅ Require signed commits (recommended)
- ✅ Require linear history
- ✅ Include administrators
- ✅ Restrict who can push to matching branches
  - Add: Only maintainers and admins
- ✅ Allow force pushes: **Never**
- ✅ Allow deletions: **No**

### 2. Protect `develop` Branch

**Branch name pattern:** `develop`

**Settings to enable:**
- ✅ Require a pull request before merging
  - ✅ Require approvals: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging
  - Add required checks:
    - `test` (CI workflow)
    - `code-quality` (CI workflow)
- ✅ Require conversation resolution before merging
- ✅ Allow force pushes: **No**
- ✅ Allow deletions: **No**

---

## Workflows

### CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Pull requests to `main` or `develop`
- Pushes to `main` or `develop`

**Jobs:**
1. **test**: Runs on Ubuntu with MySQL 8.0
   - Tests against Node.js 18.x and 20.x
   - Runs full Newman test suite
2. **code-quality**: Security audit and package checks
3. **build**: Verifies package structure

### CD Production Workflow (`.github/workflows/cd-production.yml`)

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Jobs:**
1. **deploy**: Deploys to Windows production server
   - Creates production config from secrets
   - Stops existing service
   - Deploys new code
   - Starts service
   - Runs health check
2. **post-deployment-tests**: Runs smoke tests against production

### CD Staging Workflow (`.github/workflows/cd-staging.yml`)

**Triggers:**
- Push to `develop` branch
- Manual workflow dispatch

**Jobs:**
1. **deploy**: Deploys to Windows staging server
   - Creates staging config from secrets
   - Stops existing service
   - Deploys new code
   - Starts service
   - Runs health check
2. **integration-tests**: Runs full test suite against staging

---

## Deployment Process

### Automatic Deployment

#### To Staging (develop branch):
```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

1. Create PR to `develop`
2. CI runs automatically
3. Get 1 approval
4. Merge PR
5. **Auto-deploy to staging** 🚀
6. Integration tests run
7. Verify in staging environment

#### To Production (main branch):
```bash
git checkout develop
git pull origin develop
# Ensure staging is stable and tested
```

1. Create PR from `develop` to `main`
2. CI runs automatically
3. Get 2 approvals
4. Merge PR
5. **Auto-deploy to production** 🚀
6. Smoke tests run
7. Verify in production environment

### Manual Deployment

If you need to deploy manually:

1. Go to **Actions** tab
2. Select workflow: **CD - Deploy to Production** or **CD - Deploy to Staging**
3. Click **Run workflow**
4. Select branch
5. Click **Run workflow**

---

## PowerShell Setup for Windows Deployment

### Prerequisites on Windows Server

1. **Install Node.js:**
   ```powershell
   # Using Chocolatey
   choco install nodejs-lts -y
   
   # Verify
   node --version
   npm --version
   ```

2. **Install Git:**
   ```powershell
   choco install git -y
   ```

3. **Create deployment directories:**
   ```powershell
   New-Item -ItemType Directory -Path "C:\inetpub\backoffice-api" -Force
   New-Item -ItemType Directory -Path "C:\inetpub\backoffice-api-staging" -Force
   ```

4. **Configure Windows Service (Optional but recommended):**
   
   Install `node-windows` to run as a Windows Service:
   ```powershell
   cd C:\inetpub\backoffice-api
   npm install node-windows
   
   # Create service wrapper
   node install-service.js
   ```

5. **Firewall rules:**
   ```powershell
   New-NetFirewallRule -DisplayName "Backoffice API" -Direction Inbound -LocalPort 4000 -Protocol TCP -Action Allow
   ```

### Setting Up GitHub Actions Runner (Self-hosted)

If deploying to on-premise Windows servers:

1. Go to **Settings** → **Actions** → **Runners** → **New self-hosted runner**
2. Select **Windows**
3. Follow the instructions to download and configure
4. Run as a service:
   ```powershell
   .\svc.sh install
   .\svc.sh start
   ```

---

## MySQL Setup on Ubuntu (for CI)

The CI workflow uses MySQL 8.0 as a service. The configuration is automatic, but for reference:

```yaml
services:
  mysql:
    image: mysql:8.0
    env:
      MYSQL_ROOT_PASSWORD: root_test_password
      MYSQL_DATABASE: marketing_posts
    ports:
      - 3306:3306
    options: >-
      --health-cmd="mysqladmin ping"
      --health-interval=10s
      --health-timeout=5s
      --health-retries=5
```

---

## Troubleshooting

### Common Issues

#### 1. Workflow fails with "Resource not accessible by integration"
**Solution:** Ensure the repository has the necessary permissions:
- Go to **Settings** → **Actions** → **General**
- Set "Workflow permissions" to "Read and write permissions"

#### 2. Deployment fails with PowerShell errors
**Solution:** Verify PowerShell execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 3. Health check fails after deployment
**Solution:** 
- Check if the port is available
- Verify database connectivity
- Check application logs
- Ensure JWT key is set correctly

#### 4. Tests fail in CI but pass locally
**Solution:**
- Check Node.js version compatibility
- Verify environment-specific configurations
- Check MySQL version (CI uses 8.0)

#### 5. Secret not found error
**Solution:**
- Verify secret name matches exactly (case-sensitive)
- Check secret is in correct environment (production vs staging)
- Ensure environment is selected in workflow

### Viewing Logs

**GitHub Actions Logs:**
1. Go to **Actions** tab
2. Click on workflow run
3. Click on job
4. View detailed logs

**Application Logs:**
```powershell
# On Windows server
Get-Content C:\inetpub\backoffice-api\logs\app.log -Tail 50 -Wait
```

---

## Security Best Practices

1. ✅ Never commit secrets to Git
2. ✅ Use GitHub Secrets for sensitive data
3. ✅ Rotate JWT keys regularly
4. ✅ Use strong database passwords
5. ✅ Enable 2FA on GitHub accounts
6. ✅ Review PR changes carefully
7. ✅ Keep dependencies updated
8. ✅ Run security audits: `npm audit`
9. ✅ Use HTTPS for all endpoints
10. ✅ Limit who can approve PRs to main

---

## Next Steps

1. ✅ Set up GitHub environments
2. ✅ Add secrets and variables
3. ✅ Configure branch protection rules
4. ✅ Create initial PR to test CI
5. ✅ Verify staging deployment
6. ✅ Verify production deployment
7. ✅ Set up monitoring and alerts

---

## Support

For issues or questions:
- Check workflow logs in GitHub Actions
- Review this documentation
- Contact the DevOps team

**Last updated:** February 2026
