# React 18 Migration Script
# Choose which strategy to apply

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  React 18 Migration Script" -ForegroundColor Cyan
Write-Host "  FrontAdminTable Refactoring" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Choose your migration strategy:`n" -ForegroundColor Yellow
Write-Host "1. Minimal Changes (React 18 + Router v5) - EASIEST" -ForegroundColor Green
Write-Host "   - Only updates index.js" -ForegroundColor Gray
Write-Host "   - 5 minutes to complete" -ForegroundColor Gray
Write-Host "   - Low risk`n" -ForegroundColor Gray

Write-Host "2. Modern Approach (React 18 + Router v6) - RECOMMENDED" -ForegroundColor Green
Write-Host "   - Updates 4 files" -ForegroundColor Gray
Write-Host "   - 30-60 minutes to complete" -ForegroundColor Gray
Write-Host "   - Future-proof`n" -ForegroundColor Gray

Write-Host "3. Cancel - Just show me the guide" -ForegroundColor Gray

$choice = Read-Host "`nEnter your choice (1, 2, or 3)"

$projectRoot = "c:\Users\jaban\source\repos-github-abadAfonsoJaime\webdev\server-backoffice\FrontAdminTable"
$srcPath = "$projectRoot\src"

function Backup-Files {
    Write-Host "`nCreating backups..." -ForegroundColor Yellow
    $backupDir = "$projectRoot\backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    
    if (Test-Path "$srcPath\index.js") {
        Copy-Item "$srcPath\index.js" "$backupDir\index.js.backup"
    }
    if (Test-Path "$srcPath\App.js") {
        Copy-Item "$srcPath\App.js" "$backupDir\App.js.backup"
    }
    if (Test-Path "$srcPath\components\common\protectedRoute.js") {
        Copy-Item "$srcPath\components\common\protectedRoute.js" "$backupDir\protectedRoute.js.backup"
    }
    if (Test-Path "$srcPath\components\logout.js") {
        Copy-Item "$srcPath\components\logout.js" "$backupDir\logout.js.backup"
    }
    
    Write-Host "✓ Backups created in: $backupDir" -ForegroundColor Green
}

switch ($choice) {
    "1" {
        Write-Host "`n========================================" -ForegroundColor Cyan
        Write-Host "  Strategy 1: Minimal Changes" -ForegroundColor Cyan
        Write-Host "========================================`n" -ForegroundColor Cyan
        
        Backup-Files
        
        Write-Host "`nApplying minimal changes..." -ForegroundColor Yellow
        
        # Copy the minimal index.js
        if (Test-Path "$projectRoot\MIGRATION-MINIMAL.index.js") {
            Copy-Item "$projectRoot\MIGRATION-MINIMAL.index.js" "$srcPath\index.js" -Force
            Write-Host "✓ Updated src/index.js" -ForegroundColor Green
        } else {
            Write-Host "✗ MIGRATION-MINIMAL.index.js not found!" -ForegroundColor Red
            exit
        }
        
        Write-Host "`n✅ Migration complete!" -ForegroundColor Green
        Write-Host "`nNext steps:" -ForegroundColor Yellow
        Write-Host "1. Run: npm install" -ForegroundColor White
        Write-Host "2. Run: npm start" -ForegroundColor White
        Write-Host "3. Test your application thoroughly`n" -ForegroundColor White
    }
    
    "2" {
        Write-Host "`n========================================" -ForegroundColor Cyan
        Write-Host "  Strategy 2: Modern Approach" -ForegroundColor Cyan
        Write-Host "========================================`n" -ForegroundColor Cyan
        
        Backup-Files
        
        Write-Host "`nApplying modern updates..." -ForegroundColor Yellow
        
        # Update package.json
        if (Test-Path "$projectRoot\MIGRATION-MODERN.package.json") {
            Copy-Item "$projectRoot\MIGRATION-MODERN.package.json" "$projectRoot\package.json" -Force
            Write-Host "✓ Updated package.json" -ForegroundColor Green
        }
        
        # Update index.js (same as minimal)
        if (Test-Path "$projectRoot\MIGRATION-MINIMAL.index.js") {
            Copy-Item "$projectRoot\MIGRATION-MINIMAL.index.js" "$srcPath\index.js" -Force
            Write-Host "✓ Updated src/index.js" -ForegroundColor Green
        } else {
            Write-Host "✗ MIGRATION-MINIMAL.index.js not found!" -ForegroundColor Red
            exit
        }
        
        # Update App.js
        if (Test-Path "$projectRoot\MIGRATION-MODERN.App.js") {
            Copy-Item "$projectRoot\MIGRATION-MODERN.App.js" "$srcPath\App.js" -Force
            Write-Host "✓ Updated src/App.js" -ForegroundColor Green
        } else {
            Write-Host "✗ MIGRATION-MODERN.App.js not found!" -ForegroundColor Red
            exit
        }
        
        # Update protectedRoute.js
        if (Test-Path "$projectRoot\MIGRATION-MODERN.protectedRoute.js") {
            Copy-Item "$projectRoot\MIGRATION-MODERN.protectedRoute.js" "$srcPath\components\common\protectedRoute.js" -Force
            Write-Host "✓ Updated src/components/common/protectedRoute.js" -ForegroundColor Green
        } else {
            Write-Host "✗ MIGRATION-MODERN.protectedRoute.js not found!" -ForegroundColor Red
            exit
        }
        
        # Update logout.js
        if (Test-Path "$projectRoot\MIGRATION-MODERN.logout.js") {
            Copy-Item "$projectRoot\MIGRATION-MODERN.logout.js" "$srcPath\components\logout.js" -Force
            Write-Host "✓ Updated src/components/logout.js" -ForegroundColor Green
        } else {
            Write-Host "✗ MIGRATION-MODERN.logout.js not found!" -ForegroundColor Red
            exit
        }
        
        Write-Host "`n✅ Migration complete!" -ForegroundColor Green
        Write-Host "`nNext steps:" -ForegroundColor Yellow
        Write-Host "1. Delete node_modules and package-lock.json" -ForegroundColor White
        Write-Host "2. Run: npm install" -ForegroundColor White
        Write-Host "3. Run: npm start" -ForegroundColor White
        Write-Host "4. Test your application thoroughly" -ForegroundColor White
        Write-Host "5. Check for any programmatic navigation (history.push) in other components`n" -ForegroundColor White
    }
    
    "3" {
        Write-Host "`nMigration cancelled. Please review MIGRATION-GUIDE.md for detailed instructions.`n" -ForegroundColor Yellow
        exit
    }
    
    default {
        Write-Host "`nInvalid choice. Please run the script again and select 1, 2, or 3.`n" -ForegroundColor Red
        exit
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Need Help?" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Read the full guide: MIGRATION-GUIDE.md" -ForegroundColor White
Write-Host "Your backups are safe in the backup-* folder`n" -ForegroundColor White
