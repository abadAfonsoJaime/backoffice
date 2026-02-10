# Documentation Map

Complete guide to all documentation in this project.

## Quick Navigation

- [I want to get started](#getting-started)
- [I need to configure the backend](#backend-configuration)
- [I need to deploy the application](#deployment)
- [I need to test the API](#testing)
- [I'm working on the frontend](#frontend-development)
- [I need CI/CD setup](#cicd-setup)

---

## Getting Started

### First Time Setup

1. **[Main README](./Readme.md)** - Start here for complete overview
   - Architecture overview
   - Full-stack quick start guide
   - Prerequisites and installation
   - Basic troubleshooting

2. **[Backend API Guide](./backoffice/BACKEND-API-GUIDE.md)** - Backend-specific documentation
   - API endpoints reference
   - Database schema
   - Authentication flows
   - Development setup

3. **[Configuration Guide](./backoffice/config/CONFIGURATION-GUIDE.md)** - Config files explained
   - File structure and hierarchy
   - Local development setup
   - Configuration priority
   - Security notes

---

## Backend Configuration

### Environment Setup

**[Environment Variables Guide](./backoffice/ENVIRONMENT-VARIABLES.md)** - Complete environment configuration
- Required variables reference table
- Platform-specific setup (Windows/Linux/macOS)
- Cloud platform configurations (Azure/AWS/Heroku)
- Security best practices
- Troubleshooting guide

**[Configuration Guide](./backoffice/config/CONFIGURATION-GUIDE.md)** - Config file management
- default.json vs local.json
- Environment-specific configs
- Configuration loading order

### Database Setup

**[Seeding Guide](./backoffice/SEEDING-GUIDE.md)** - Database initialization
- Available seed scripts
- Default seeded content (admin user + cards)
- Idempotent behavior
- Post-seed actions

**[Post-Deployment Setup](./backoffice/POST-DEPLOYMENT-SETUP.md)** - Complete deployment checklist
- Step-by-step deployment process
- Environment variables setup by platform
- Database schema initialization
- Seed data execution
- Security hardening
- Troubleshooting common issues
- Deployment checklist

---

## Testing

**[Testing Guide](./TESTING-GUIDE.md)** - Comprehensive testing documentation
- Manual API testing with curl
- Automated testing with Newman
- Test scenarios and examples
- Integration testing workflow

**[Postman Testing Guide](./backoffice/integration-tools/POSTMAN-GUIDE.md)** - Postman-specific guide
- Collection setup
- Environment configuration
- Request examples
- Automated test scripts

---

## Frontend Development

### React Migration (17 → 18)

**[Migration Guide](./FrontAdminTable/MIGRATION-GUIDE.md)** - Detailed migration documentation
- Step-by-step migration process
- Code changes explained
- Troubleshooting common issues
- Testing the migration

**[Migration Comparison](./FrontAdminTable/MIGRATION-COMPARISON.md)** - Strategy analysis
- Minimal changes approach vs modern approach
- Trade-offs and considerations
- Decision rationale

**[Migration Cheatsheet](./FrontAdminTable/MIGRATION-CHEATSHEET.md)** - Quick reference
- Key API changes
- Common patterns
- Quick fixes

**[Implementation Summary](./FrontAdminTable/IMPLEMENTATION-SUMMARY.md)** - What was changed
- Files modified
- Dependencies updated
- Configuration changes

---

## Deployment

### CI/CD Setup

**[GitHub CI/CD Setup Guide](./GITHUB-CICD-SETUP.md)** - Complete GitHub Actions configuration
- Workflow files explained
- Environment setup in GitHub
- Secrets and variables configuration
- Branch protection rules
- Deployment triggers

**[CI/CD Checklist](./CICD-CHECKLIST.md)** - Step-by-step setup checklist
- Pre-deployment requirements
- GitHub configuration steps
- Testing automation setup
- Verification steps

**[Branch Setup Guide](./BRANCH-SETUP-GUIDE.md)** - Git workflow
- Branch naming conventions
- Protection rules configuration
- PR approval process
- Merge strategies

### Server Deployment

**[Deployment Connection Guide](./DEPLOYMENT-CONNECTION-GUIDE.md)** - Server connectivity
- SSH setup
- Remote server configuration
- Connection troubleshooting
- Security considerations

**[Post-Deployment Setup](./backoffice/POST-DEPLOYMENT-SETUP.md)** - After deployment tasks
- Environment variables setup
- Database initialization
- Seed data execution
- Security hardening
- Health checks

---

## Documentation by Category

### 📚 Core Documentation
- [Main README](./Readme.md) - Project overview
- [Backend API Guide](./backoffice/BACKEND-API-GUIDE.md) - API reference
- [Documentation Map](./DOCUMENTATION-MAP.md) - This file

### ⚙️ Configuration
- [Environment Variables](./backoffice/ENVIRONMENT-VARIABLES.md) - Env vars guide
- [Configuration Guide](./backoffice/config/CONFIGURATION-GUIDE.md) - Config files
- [Seeding Guide](./backoffice/SEEDING-GUIDE.md) - Database seeding

### 🧪 Testing
- [Testing Guide](./TESTING-GUIDE.md) - Comprehensive testing
- [Postman Guide](./backoffice/integration-tools/POSTMAN-GUIDE.md) - API testing

### 🚀 Deployment
- [Post-Deployment Setup](./backoffice/POST-DEPLOYMENT-SETUP.md) - Deployment steps
- [GitHub CI/CD Setup](./GITHUB-CICD-SETUP.md) - GitHub Actions
- [CI/CD Checklist](./CICD-CHECKLIST.md) - Setup checklist
- [Branch Setup Guide](./BRANCH-SETUP-GUIDE.md) - Git workflow
- [Deployment Connection](./DEPLOYMENT-CONNECTION-GUIDE.md) - Server setup

### ⚛️ Frontend
- [Migration Guide](./FrontAdminTable/MIGRATION-GUIDE.md) - React 18 migration
- [Migration Comparison](./FrontAdminTable/MIGRATION-COMPARISON.md) - Strategy analysis
- [Migration Cheatsheet](./FrontAdminTable/MIGRATION-CHEATSHEET.md) - Quick reference
- [Implementation Summary](./FrontAdminTable/IMPLEMENTATION-SUMMARY.md) - Changes summary

---

## Common Tasks Quick Links

### "I need to..."

#### Set up for development
1. [Main README - Quick Start](./Readme.md#-quick-start---full-stack-setup)
2. [Environment Variables](./backoffice/ENVIRONMENT-VARIABLES.md)
3. [Seeding Guide](./backoffice/SEEDING-GUIDE.md)

#### Test the API
1. [Testing Guide](./TESTING-GUIDE.md)
2. [Postman Guide](./backoffice/integration-tools/POSTMAN-GUIDE.md)

#### Deploy to production
1. [Post-Deployment Setup](./backoffice/POST-DEPLOYMENT-SETUP.md)
2. [Environment Variables - Production](./backoffice/ENVIRONMENT-VARIABLES.md#deployment-configuration)
3. [CI/CD Setup](./GITHUB-CICD-SETUP.md)

#### Configure CI/CD
1. [GitHub CI/CD Setup](./GITHUB-CICD-SETUP.md)
2. [CI/CD Checklist](./CICD-CHECKLIST.md)
3. [Branch Setup Guide](./BRANCH-SETUP-GUIDE.md)

#### Understand React migration
1. [Migration Guide](./FrontAdminTable/MIGRATION-GUIDE.md)
2. [Migration Comparison](./FrontAdminTable/MIGRATION-COMPARISON.md)
3. [Migration Cheatsheet](./FrontAdminTable/MIGRATION-CHEATSHEET.md)

#### Troubleshoot issues
1. [Main README - Troubleshooting](./Readme.md#-troubleshooting)
2. [Post-Deployment Setup - Troubleshooting](./backoffice/POST-DEPLOYMENT-SETUP.md#troubleshooting)
3. [Environment Variables - Troubleshooting](./backoffice/ENVIRONMENT-VARIABLES.md#troubleshooting)

---

## Document Relationships

```
Main README (./Readme.md)
│
├─── Backend Documentation
│    ├── Backend API Guide (./backoffice/BACKEND-API-GUIDE.md)
│    ├── Environment Variables (./backoffice/ENVIRONMENT-VARIABLES.md)
│    ├── Seeding Guide (./backoffice/SEEDING-GUIDE.md)
│    ├── Post-Deployment Setup (./backoffice/POST-DEPLOYMENT-SETUP.md)
│    └── Configuration Guide (./backoffice/config/CONFIGURATION-GUIDE.md)
│
├─── Frontend Documentation
│    ├── Migration Guide (./FrontAdminTable/MIGRATION-GUIDE.md)
│    ├── Migration Comparison (./FrontAdminTable/MIGRATION-COMPARISON.md)
│    ├── Migration Cheatsheet (./FrontAdminTable/MIGRATION-CHEATSHEET.md)
│    └── Implementation Summary (./FrontAdminTable/IMPLEMENTATION-SUMMARY.md)
│
├─── Testing Documentation
│    ├── Testing Guide (./TESTING-GUIDE.md)
│    └── Postman Guide (./backoffice/integration-tools/POSTMAN-GUIDE.md)
│
└─── Deployment Documentation
     ├── GitHub CI/CD Setup (./GITHUB-CICD-SETUP.md)
     ├── CI/CD Checklist (./CICD-CHECKLIST.md)
     ├── Branch Setup Guide (./BRANCH-SETUP-GUIDE.md)
     └── Deployment Connection (./DEPLOYMENT-CONNECTION-GUIDE.md)
```

---

## Contributing to Documentation

When adding or updating documentation:

1. **Avoid duplication** - Reference existing docs instead of repeating
2. **Update this map** - Add new documents to appropriate sections
3. **Cross-reference** - Link related documents
4. **Keep organized** - Follow the established structure
5. **Test links** - Ensure all links work before committing

## Last Updated

February 2026
