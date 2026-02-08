# Setting Up the Develop Branch

This guide explains how to create and configure the `develop` branch parallel to `main`.

## Quick Setup (5 minutes)

### Step 1: Create develop branch from main

```bash
# Ensure you're on main and it's up to date
git checkout main
git pull origin main

# Create develop branch from main
git checkout -b develop

# Push develop to GitHub
git push -u origin develop
```

### Step 2: Set develop as default branch for new PRs (Optional)

1. Go to **Settings** → **General**
2. Under "Default branch", click the switch  icon
3. Select `develop`
4. Click "Update"

This makes `develop` the default target for new PRs, which fits the typical workflow.

### Step 3: Configure branch protection for develop

Go to **Settings** → **Branches** → **Add branch protection rule**

**Branch name pattern:** `develop`

Enable these settings:
- ✅ Require a pull request before merging
  - ✅ Require approvals: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging
  - Select: `test`, `code-quality`
- ✅ Require conversation resolution before merging
- ✅ Block force pushes
- ✅ Block deletions

Click **Create**.

### Step 4: Merge current test branch to develop

Now that develop exists, merge your test/ci-setup branch:

```bash
# Option A: Via Pull Request (Recommended)
# 1. Go to GitHub
# 2. Change PR base from 'main' to 'develop'
# 3. Get approval and merge

# Option B: Direct merge (if branch protection allows)
git checkout develop
git merge test/ci-setup
git push origin develop
```

### Step 5: Update main from develop (initial sync)

Create a PR from `develop` to `main` to align them:

```bash
# On GitHub:
# 1. Go to Pull Requests
# 2. New Pull Request
# 3. Base: main ← Compare: develop
# 4. Title: "Initial sync: Align main with develop"
# 5. Get 2 approvals (as per main's branch protection)
# 6. Merge
```

## Branch Workflow Going Forward

### Daily Development

```bash
# 1. Start new feature from develop
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature

# 3. Create PR to develop
# - CI runs automatically
# - Get 1 approval
# - Merge to develop
# - Auto-deploys to staging environment

# 4. Test in staging
# - Verify feature works
# - Run manual tests
# - Gather feedback
```

### Release to Production

```bash
# Once staging is stable and tested:

# 1. Create release PR from develop to main
# On GitHub:
# - New Pull Request
# - Base: main ← Compare: develop
# - Title: "Release v1.x.x"
# - Add release notes

# 2. Get 2 approvals (required for main)

# 3. Merge to main
# - Auto-deploys to production

# 4. Create Git tag
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## Branch Status After Setup

```
main (production)        develop (staging)
    |                         |
    |<--- PR (2 approvals) ---|
    |                         |
    |                    feature/new-feature
    |                         |<--- PR (1 approval)
    |                         |
  [PROD]                   [STAGING]
```

## Common Operations

### Hotfix to Production

For urgent production fixes:

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# 2. Fix and commit
git add .
git commit -m "fix: critical bug in production"
git push origin hotfix/critical-bug

# 3. Create PR to main
# - Get 2 approvals
# - Merge
# - Auto-deploys to production

# 4. Backport to develop
git checkout develop
git pull origin develop
git merge hotfix/critical-bug
git push origin develop
```

### Sync develop with main (after hotfix)

```bash
# If main was updated directly (hotfix), sync develop
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

### Delete merged feature branches

```bash
# After PR is merged
git branch -d feature/my-feature            # Delete local
git push origin --delete feature/my-feature # Delete remote
```

## Verification Checklist

After completing the setup:

- [ ] `develop` branch exists on GitHub
- [ ] `develop` has branch protection (1 approval required)
- [ ] `main` has branch protection (2 approvals required)
- [ ] CI workflow runs on PRs to both branches
- [ ] CD to staging triggers on push to `develop`
- [ ] CD to production triggers on push to `main`
- [ ] All branches are aligned (same content)

## Troubleshooting

### Problem: Can't push to develop

**Solution:** Branch protection is working! Create a PR instead.

### Problem: CI fails on develop

**Solution:** Check the Actions tab for details. Common issues:
- package-lock.json out of sync → Fixed in latest CI workflow
- Tests failing → Run tests locally first
- Database connection → Check config

### Problem: Branches are out of sync

**Solution:** Create a sync PR:
```bash
# To sync develop with main
git checkout develop
git pull origin develop
git merge main
git push origin develop

# Or create PR from main to develop
```

### Problem: Accidentally committed to main/develop directly

**Solution:** If branch protection is set up, this shouldn't be possible. If it happened:

```bash
# Revert the commit
git revert HEAD
git push origin main  # or develop

# Then create proper PR with the change
```

## Next Steps

1. ✅ Complete this setup
2. ✅ Commit and push package-lock.json
3. ✅ Update CI workflow (already done)
4. ✅ Test CI flow with a sample PR
5. ✅ Configure GitHub environments for CD
6. ✅ Test staging deployment
7. ✅ Test production deployment

**Estimated time:** 5-10 minutes
