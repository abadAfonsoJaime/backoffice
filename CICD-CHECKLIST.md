# GitHub CI/CD Quick Setup Checklist

## 📋 Pre-Deployment Checklist

Complete these steps before pushing to `main` or `develop`:

### Step 1: GitHub Repository Setup

- [ ] Repository is created and code is pushed
- [ ] All team members have appropriate access levels

### Step 2: GitHub Environments

- [ ] **Production** environment created
  - [ ] Required reviewers added (minimum 2)
  - [ ] Deployment branch limited to `main`
- [ ] **Staging** environment created
  - [ ] Deployment branch limited to `develop`

### Step 3: Production Secrets (**Settings → Environments → production → Secrets**)

- [ ] `PROD_DB_HOST` - Database hostname
- [ ] `PROD_DB_PASSWORD` - Database password
- [ ] `PROD_JWT_PRIVATE_KEY` - JWT signing key

### Step 4: Production Variables (**Settings → Environments → production → Variables**)

- [ ] `PROD_DB_USER` - Database username (e.g., `srv_backoffice`)
- [ ] `PROD_DB_PORT` - Database port (e.g., `3306`)
- [ ] `PROD_DB_NAME` - Database name (e.g., `marketing_posts`)
- [ ] `PROD_DEPLOY_PATH` - Windows deployment path (e.g., `C:\inetpub\backoffice-api`)
- [ ] `PROD_BASE_URL` - Production URL (e.g., `https://api.company.com`)

### Step 5: Staging Secrets (**Settings → Environments → staging → Secrets**)

- [ ] `STAGING_DB_HOST` - Staging database hostname
- [ ] `STAGING_DB_PASSWORD` - Staging database password
- [ ] `STAGING_JWT_PRIVATE_KEY` - Staging JWT signing key

### Step 6: Staging Variables (**Settings → Environments → staging → Variables**)

- [ ] `STAGING_DB_USER` - Staging database username
- [ ] `STAGING_DB_PORT` - Staging database port
- [ ] `STAGING_DB_NAME` - Staging database name
- [ ] `STAGING_DEPLOY_PATH` - Windows deployment path (e.g., `C:\inetpub\backoffice-api-staging`)
- [ ] `STAGING_BASE_URL` - Staging URL (e.g., `https://api-staging.company.com`)

### Step 7: Branch Protection - `main` (**Settings → Branches → Add rule**)

- [ ] Branch name pattern: `main`
- [ ] ✅ Require pull request before merging
- [ ] ✅ Require approvals: **2**
- [ ] ✅ Dismiss stale PR approvals
- [ ] ✅ Require status checks: `test`, `code-quality`, `build`
- [ ] ✅ Require conversation resolution
- [ ] ✅ Include administrators
- [ ] ✅ Restrict pushes (maintainers only)
- [ ] ✅ Block force pushes
- [ ] ✅ Block deletions

### Step 8: Branch Protection - `develop` (**Settings → Branches → Add rule**)

- [ ] Branch name pattern: `develop`
- [ ] ✅ Require pull request before merging
- [ ] ✅ Require approvals: **1**
- [ ] ✅ Dismiss stale PR approvals
- [ ] ✅ Require status checks: `test`, `code-quality`
- [ ] ✅ Require conversation resolution
- [ ] ✅ Block force pushes
- [ ] ✅ Block deletions

### Step 9: Actions Permissions (**Settings → Actions → General**)

- [ ] Workflow permissions: ✅ Read and write permissions
- [ ] ✅ Allow GitHub Actions to create and approve pull requests

### Step 10: Windows Server Setup (Both Production & Staging)

#### Production Server:
- [ ] Node.js installed (v18 or v20)
- [ ] MySQL 8.0 installed and running
- [ ] Database created and DDL script executed
- [ ] Admin user seeded
- [ ] Deployment directory created: `C:\inetpub\backoffice-api`
- [ ] Firewall port 4000 opened (or configured port)
- [ ] Git installed (if using self-hosted runner)

#### Staging Server:
- [ ] Node.js installed (v18 or v20)
- [ ] MySQL 8.0 installed and running
- [ ] Database created and DDL script executed
- [ ] Admin user seeded
- [ ] Deployment directory created: `C:\inetpub\backoffice-api-staging`
- [ ] Firewall port opened
- [ ] Git installed (if using self-hosted runner)

### Step 11: Local Development Setup

- [ ] Clone repository
- [ ] Copy `config/default.json` to `config/local.json`
- [ ] Update `local.json` with actual credentials
- [ ] Run `npm install`
- [ ] Run `npm run seed`
- [ ] Run `npm start`
- [ ] Verify server starts successfully
- [ ] Run `npm test` to verify tests pass

### Step 12: Verify CI/CD Pipeline

- [ ] Create test branch from `develop`
- [ ] Make a small change (e.g., update README)
- [ ] Push and create PR to `develop`
- [ ] Verify CI workflow runs and passes
- [ ] Merge PR (with approval)
- [ ] Verify staging deployment succeeds
- [ ] Test staging environment
- [ ] Create PR from `develop` to `main`
- [ ] Verify CI workflow runs
- [ ] Get required approvals (2)
- [ ] Merge to `main`
- [ ] Verify production deployment succeeds
- [ ] Test production environment

---

## 🚀 Quick Commands Reference

### Local Development
```bash
# Install dependencies
npm install

# Seed admin user
npm run seed

# Start development server
npm run dev

# Run tests
npm test

# Generate test report
npm run test:report
```

### Git Workflow
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature

# After PR merged to develop, create release PR
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# Create PR from release branch to main
```

### Manual Deployment Trigger
1. Go to GitHub → **Actions** tab
2. Select **CD - Deploy to Production** or **CD - Deploy to Staging**
3. Click **Run workflow**
4. Select branch and run

---

## ✅ Post-Setup Verification

### After First Deployment to Staging:
```bash
# Test the API
curl https://api-staging.company.com
curl https://api-staging.company.com/login -d '{"username":"admin","password":"admin123"}'
```

### After First Deployment to Production:
```bash
# Test the API
curl https://api.company.com
curl https://api.company.com/login -d '{"username":"admin","password":"[prod-password]"}'
```

---

## 🎯 Success Criteria

CI/CD is successfully configured when:

- ✅ CI runs automatically on every PR
- ✅ Tests must pass before PR can be merged
- ✅ `main` branch requires 2 approvals
- ✅ `develop` branch requires 1 approval
- ✅ Push to `develop` automatically deploys to staging
- ✅ Push to `main` automatically deploys to production
- ✅ Deployments complete without errors
- ✅ Health checks pass after deployment
- ✅ Manual rollback is possible if needed

---

## 📞 Need Help?

**Workflow not running?**
- Check Actions permissions in repository settings
- Verify workflow files are in `.github/workflows/` directory
- Check branch names match exactly

**Secrets not found?**
- Verify secret names match exactly (case-sensitive)
- Check secrets are in the correct environment
- Don't confuse Repository secrets with Environment secrets

**Deployment fails?**
- Check workflow logs in Actions tab
- Verify Windows server is accessible
- Check database connectivity
- Verify all secrets and variables are set

**Tests fail in CI?**
- Run tests locally first
- Check Node.js version matches (18.x or 20.x)
- Verify MySQL 8.0 compatibility
- Check environment-specific issues

---

## 📚 Full Documentation

For detailed information, see: [GITHUB-CICD-SETUP.md](./GITHUB-CICD-SETUP.md)

---

**Estimated Setup Time:** 30-45 minutes

**Last Updated:** February 2026
