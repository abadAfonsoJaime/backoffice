# Database Seeding Summary

## Available Seed Scripts

### 1. Comprehensive Seeding (Recommended)
```bash
npm run seed-db
```
**Seeds:**
- ✅ Admin user (username: `admin`, password: `admin123`)
- ✅ 4 default cards/posts with sample content

**Use this for:** Complete database initialization after deployment

### 2. Admin User Only (Legacy)
```bash
npm run seed
# or
npm run seed-users
```
**Seeds:**
- ✅ Admin user only (username: `admin`, password: `admin123`)

**Use this for:** Only creating admin user without sample cards

## Default Seeded Content

### Admin User
- **Username:** admin
- **Email:** admin@example.com
- **Password:** admin123 ⚠️ (Change in production!)
- **Role:** Administrator (isAdmin: true)

### Default Cards/Posts
1. **Welcome to Backoffice** - Introduction card (visible)
2. **Getting Started Guide** - Feature overview (visible)
3. **Feature Announcement** - Updates and news (visible)
4. **Contact Support** - Help and support (hidden)

## Environment Requirements

Both seed scripts require proper database configuration via:
- Environment variables (recommended for production)
- `config/local.json` (local development)

See [ENVIRONMENT-VARIABLES.md](ENVIRONMENT-VARIABLES.md) for setup instructions.

## Idempotent Behavior

All seed scripts are **idempotent** - safe to run multiple times:
- Skips existing records (checks for duplicates)
- Will not overwrite existing admin user or cards
- Logs clearly what was created vs. skipped

## Post-Seed Actions

After running seed scripts:
1. ✅ Verify admin login works
2. ✅ Check cards appear in API response: `GET http://localhost:4000/cards`
3. ⚠️ Change default admin password in production
4. ✅ Customize or delete default cards as needed

## Related Documentation

- **[Environment Variables Guide](ENVIRONMENT-VARIABLES.md)** - Configure database connection
- **[Post-Deployment Setup](POST-DEPLOYMENT-SETUP.md)** - Complete deployment process
- **[Backend API Guide](BACKEND-API-GUIDE.md)** - API endpoints and usage
- **[Main README](../Readme.md)** - Project overview
