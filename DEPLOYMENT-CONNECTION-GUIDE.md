# GitHub Actions → Server Deployment: How the Connection Works

This guide explains the different methods for GitHub Actions to connect to and deploy on your Windows servers.

## Table of Contents

1. [Overview](#overview)
2. [Method 1: Self-Hosted Runners (Recommended)](#method-1-self-hosted-runners-recommended)
3. [Method 2: Remote PowerShell (WinRM)](#method-2-remote-powershell-winrm)
4. [Method 3: SSH Tunnel](#method-3-ssh-tunnel)
5. [Method 4: Azure DevOps / Third-Party Tools](#method-4-azure-devops--third-party-tools)
6. [Comparison Table](#comparison-table)
7. [Security Considerations](#security-considerations)

---

## Overview

GitHub Actions needs a way to execute commands on your Windows servers. There are several approaches:

```
┌─────────────────┐
│  GitHub Actions │
│   (Cloud)       │
└────────┬────────┘
         │
         │ How to connect?
         │
    ┌────▼────┐
    │ Options │
    └────┬────┘
         │
    ┌────┴─────────────────────────┐
    │                              │
    ▼                              ▼
┌────────────────┐         ┌──────────────┐
│ Self-Hosted    │         │ Remote       │
│ Runner         │         │ PowerShell   │
│ (On Server)    │         │ (WinRM/SSH)  │
└────────────────┘         └──────────────┘
```

**Current CD workflows are configured for: Self-Hosted Runners**

┌──────────────┐       ┌─────────────────┐
│   GitHub     │       │ Your Windows    │
│   (Cloud)    │       │ Server          │
│              │       │                 │
│  Workflows   │       │  [Runner App]   │
│   trigger →  │ ───▶ │   ↓ polls       │
│              │       │   ↓ executes    │
│              │       │   ↓ reports     │
└──────────────┘       └─────────────────┘
---

## Method 1: Self-Hosted Runners (Recommended)

### What It Is

A GitHub Actions runner application installed directly on your Windows server. It polls GitHub for jobs and executes them locally.

### How It Works

```
1. GitHub triggers workflow (push to main/develop)
2. Self-hosted runner (on your server) picks up the job
3. Runner executes PowerShell commands locally
4. Results reported back to GitHub
```

### Advantages

✅ **Most secure** - Server initiates connection (outbound only)
✅ **No firewall configuration needed**
✅ **Full access to local resources** (databases, files, services)
✅ **No credential storage** - Already authenticated locally
✅ **Best performance** - No network hops
✅ **Works behind corporate firewall**

### Setup Instructions

#### Step 1: Download Runner

1. Go to your GitHub repository
2. **Settings** → **Actions** → **Runners** → **New self-hosted runner**
3. Select **Windows**
4. Copy the download and configuration commands

#### Step 2: Install Runner on Server

```powershell
# Create a folder for the runner
mkdir C:\actions-runner
cd C:\actions-runner

# Download the latest runner package
Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-win-x64-2.311.0.zip -OutFile actions-runner-win-x64-2.311.0.zip

# Follow GitHub's download instructions
.\config.cmd --url https://github.com/YOUR_REPO --token TOKEN --labels windows,production
.\svc.sh install
.\svc.sh start

# Extract the installer
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD\actions-runner-win-x64-2.311.0.zip", "$PWD")
```

#### Step 3: Configure Runner

```powershell
# Configure the runner (use token from GitHub)
.\config.cmd --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN

# When prompted:
# - Enter runner name: production-server (or staging-server)
# - Enter runner group: Default
# - Enter labels: windows, production (or staging)
# - Enter work folder: _work (default)
```

#### Step 4: Install as Windows Service

```powershell
# Install as service (runs automatically on boot)
.\svc.sh install

# Start the service
.\svc.sh start

# Check status
.\svc.sh status
```

#### Step 5: Update Workflows to Use Self-Hosted Runner

Update your CD workflows:

```yaml
deploy:
  name: Deploy to Production
  runs-on: self-hosted  # Changed from: windows-latest
  # Also add labels if you have multiple runners:
  # runs-on: [self-hosted, windows, production]
```

### Configuration for Multiple Environments

**Production Server Runner:**
```powershell
# Labels: self-hosted, windows, production
```

**Staging Server Runner:**
```powershell
# Labels: self-hosted, windows, staging
```

**Workflow Selection:**
```yaml
# Production deployment
runs-on: [self-hosted, windows, production]

# Staging deployment
runs-on: [self-hosted, windows, staging]
```

### Maintenance

```powershell
# Update runner
cd C:\actions-runner
.\svc.sh stop
# Download new version
# Extract and replace files
.\svc.sh start

# View logs
Get-Content C:\actions-runner\_diag\Runner_*.log -Tail 50

# Restart service
.\svc.sh stop
.\svc.sh start
```

---

## Method 2: Remote PowerShell (WinRM)

### What It Is

Execute PowerShell commands remotely from GitHub-hosted runners using WinRM (Windows Remote Management).

### How It Works

```
1. GitHub-hosted runner (Ubuntu/Windows)
2. Connects to Windows server via WinRM
3. Executes PowerShell commands remotely
4. Returns results
```

### Setup Instructions

#### Step 1: Enable WinRM on Server

```powershell
# Run on Windows Server
Enable-PSRemoting -Force

# Configure for HTTPS (recommended)
winrm quickconfig -transport:https

# Allow from specific IPs (if possible)
Set-Item WSMan:\localhost\Client\TrustedHosts -Value "github-runner-ip"

# Configure firewall
New-NetFirewallRule -DisplayName "WinRM-HTTPS" -Direction Inbound -LocalPort 5986 -Protocol TCP -Action Allow
```

#### Step 2: Create Service Account

```powershell
# Create dedicated deployment user
New-LocalUser -Name "gh-deploy" -Password (ConvertTo-SecureString "StrongP@ssw0rd!" -AsPlainText -Force) -PasswordNeverExpires

# Add to Administrators group (or create custom group with deploy permissions)
Add-LocalGroupMember -Group "Administrators" -Member "gh-deploy"
```

#### Step 3: Store Credentials in GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

- `PROD_SERVER_HOST`: Windows server IP/hostname
- `PROD_SERVER_USER`: gh-deploy
- `PROD_SERVER_PASSWORD`: Password

#### Step 4: Update Workflow

```yaml
deploy:
  name: Deploy to Production
  runs-on: ubuntu-latest  # Can use GitHub-hosted runner
  
  steps:
    - name: Deploy via WinRM
      run: |
        # Install PowerShell on Ubuntu runner
        sudo apt-get install -y powershell
        
        # Create PowerShell script
        pwsh << 'EOF'
        $securePassword = ConvertTo-SecureString "$env:SERVER_PASSWORD" -AsPlainText -Force
        $credential = New-Object System.Management.Automation.PSCredential("$env:SERVER_USER", $securePassword)
        
        $session = New-PSSession -ComputerName $env:SERVER_HOST -Credential $credential -UseSSL -SessionOption (New-PSSessionOption -SkipCACheck -SkipCNCheck)
        
        Invoke-Command -Session $session -ScriptBlock {
          cd C:\inetpub\backoffice-api
          git pull
          npm install
          # Restart service
        }
        
        Remove-PSSession $session
        EOF
      env:
        SERVER_HOST: ${{ secrets.PROD_SERVER_HOST }}
        SERVER_USER: ${{ secrets.PROD_SERVER_USER }}
        SERVER_PASSWORD: ${{ secrets.PROD_SERVER_PASSWORD }}
```

### Advantages

✅ No runner installation needed
✅ Use GitHub-hosted runners (no maintenance)
✅ Centralized management

### Disadvantages

❌ Server must be accessible from internet
❌ Firewall configuration required
❌ Credentials stored in GitHub
❌ Security risks (exposed WinRM port)
❌ More complex troubleshooting

---

## Method 3: SSH Tunnel

### What It Is

Use SSH with a jump host or VPN to reach Windows servers.

### Setup

Requires:
1. OpenSSH Server on Windows
2. SSH keys for authentication
3. Possible jump host if server is internal

```yaml
- name: Deploy via SSH
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.SSH_HOST }}
    username: ${{ secrets.SSH_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      cd C:\inetpub\backoffice-api
      git pull
      npm install
      # Restart service
```

### Advantages

✅ Secure (SSH keys)
✅ Industry standard
✅ Good for mixed OS environments

### Disadvantages

❌ Requires OpenSSH on Windows
❌ Server must be accessible
❌ Less native for Windows

---

## Method 4: Azure DevOps / Third-Party Tools

Use Azure Pipelines, Jenkins, or other CI/CD tools that have better Windows integration.

---

## Comparison Table

| Method | Security | Setup Complexity | Firewall Needed | Best For |
|--------|----------|------------------|-----------------|----------|
| **Self-Hosted Runner** | ⭐⭐⭐⭐⭐ | Medium | No | **Recommended** - Most secure |
| **WinRM** | ⭐⭐⭐ | High | Yes | Testing/Dev environments |
| **SSH** | ⭐⭐⭐⭐ | High | Yes | Mixed OS environments |
| **Azure DevOps** | ⭐⭐⭐⭐ | Low | No | Azure ecosystem |

---

## Security Considerations

### Self-Hosted Runners (Best Security)

✅ **Pros:**
- Server initiates connection (outbound only)
- No inbound firewall rules needed
- No credentials in GitHub
- Behind corporate firewall

⚠️ **Security Notes:**
- Use dedicated runner service account
- Keep runner software updated
- Monitor runner logs
- Use labels to isolate environments

### Remote PowerShell/SSH (Moderate Security)

⚠️ **Security Concerns:**
- Exposed management ports (5986, 22)
- Credentials stored in GitHub
- Requires firewall rules
- Attack surface on internet

🛡️ **Mitigations:**
- Use VPN/jump host
- IP allowlisting
- Certificate authentication
- Strong passwords/keys
- Regular security audits

---

## Recommended Setup (Step-by-Step)

### For Production & Staging

**1. Install Self-Hosted Runners (30 minutes)**

**Production Server:**
```powershell
# On production Windows server
cd C:\
mkdir actions-runner-prod
cd actions-runner-prod
# Follow download steps above
.\config.cmd --url https://github.com/YOUR_ORG/YOUR_REPO --token TOKEN --labels windows,production
.\svc.sh install
.\svc.sh start
```

**Staging Server:**
```powershell
# On staging Windows server
cd C:\
mkdir actions-runner-staging
cd actions-runner-staging
# Follow download steps above
.\config.cmd --url https://github.com/YOUR_ORG/YOUR_REPO --token TOKEN --labels windows,staging
.\svc.sh install
.\svc.sh start
```

**2. Update Workflows**

**`.github/workflows/cd-production.yml`:**
```yaml
deploy:
  name: Deploy to Production
  runs-on: [self-hosted, windows, production]  # ← Updated
  environment:
    name: production
```

**`.github/workflows/cd-staging.yml`:**
```yaml
deploy:
  name: Deploy to Staging
  runs-on: [self-hosted, windows, staging]  # ← Updated
  environment:
    name: staging
```

**3. Test Connection**

Push a test commit to `develop` and verify:
- Runner picks up the job
- Deployment executes
- Service restarts
- Application is accessible

---

## Troubleshooting

### Runner Not Picking Up Jobs

**Check runner status:**
```powershell
cd C:\actions-runner
.\svc.sh status

# If not running:
.\svc.sh start
```

**Check runner logs:**
```powershell
Get-Content C:\actions-runner\_diag\Runner_*.log -Tail 100
```

**Verify runner is online:**
- Go to **Settings** → **Actions** → **Runners**
- Check if runner shows as "Active" (green dot)

### Jobs Queued but Not Running

- **Problem:** Workflow specifies `runs-on: windows-latest` but you have self-hosted
- **Solution:** Update workflow to `runs-on: [self-hosted, windows]`

### Permission Denied Errors

- **Problem:** Runner service account lacks permissions
- **Solution:** Run runner as Administrator or grant specific permissions

### Network/Firewall Issues

- **Problem:** Runner can't reach GitHub
- **Solution:** Check outbound internet access on port 443

---

## Next Steps

1. ✅ Choose deployment method (Self-Hosted recommended)
2. ✅ Install runners on servers
3. ✅ Update CD workflows with correct `runs-on` value
4. ✅ Test deployment with dummy change
5. ✅ Monitor first few deployments
6. ✅ Document your specific setup

---

## Support & Resources

- [GitHub Actions Self-Hosted Runners Docs](https://docs.github.com/en/actions/hosting-your-own-runners)
- [GitHub Actions Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [WinRM Configuration Guide](https://docs.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management)

**Last Updated:** February 2026
