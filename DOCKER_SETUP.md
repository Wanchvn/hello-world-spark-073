# 🐳 Docker Setup Guide for Windows

## ⚡ Quick Install (5 minutes)

### 1. **Download Docker Desktop**
- Go to: https://www.docker.com/products/docker-desktop/
- Click "Download for Windows"
- Choose the right version:
  - **Windows 10/11 Pro/Enterprise:** Docker Desktop for Windows
  - **Windows 10/11 Home:** Docker Desktop for Windows (WSL 2 backend)

### 2. **Install Docker Desktop**
- Run the downloaded `Docker Desktop Installer.exe`
- Follow the installation wizard
- **Important:** Check "Use WSL 2 instead of Hyper-V" if you have Windows 10/11 Home
- Click "Install"

### 3. **Restart Your Computer**
- Docker Desktop requires a restart to work properly

### 4. **Start Docker Desktop**
- Look for Docker Desktop in your Start menu
- Click to start it
- Wait for the Docker icon in system tray to stop animating
- You'll see "Docker Desktop is running" when it's ready

## 🔍 Verify Installation

Open Command Prompt or PowerShell and run:

```bash
docker --version
docker-compose --version
```

You should see version numbers like:
```
Docker version 20.10.21, build baeda1f
docker-compose version 1.29.2, build 5becea4c
```

## 🚀 Alternative: Use WSL 2 (Recommended for Windows 10/11 Home)

### 1. **Enable WSL 2**
Open PowerShell as Administrator and run:

```powershell
# Enable WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# Enable Virtual Machine feature
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart computer
```

### 2. **Install WSL 2 Linux Kernel**
- Download: https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi
- Install the downloaded file

### 3. **Set WSL 2 as Default**
```powershell
wsl --set-default-version 2
```

### 4. **Install Ubuntu from Microsoft Store**
- Open Microsoft Store
- Search for "Ubuntu"
- Install "Ubuntu" (not Ubuntu 20.04 or 22.04)
- Launch Ubuntu and create a username/password

### 5. **Install Docker in WSL 2**
Open Ubuntu and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again
exit
```

## 🚨 Troubleshooting

### Docker Desktop Won't Start
1. **Check Windows version:** Docker Desktop requires Windows 10 64-bit: Pro, Enterprise, or Education (Build 16299 or later)
2. **Enable Hyper-V:** For Windows Pro/Enterprise
3. **Enable WSL 2:** For Windows Home
4. **Check antivirus:** Some antivirus software blocks Docker

### "Docker Desktop is starting..." Forever
1. **Wait longer:** First startup can take 5-10 minutes
2. **Check system resources:** Ensure you have at least 4GB RAM free
3. **Restart Docker Desktop:** Right-click tray icon → Restart
4. **Check Windows updates:** Ensure Windows is up to date

### Permission Errors
1. **Run as Administrator:** Right-click Docker Desktop → Run as Administrator
2. **Check user groups:** Ensure your user is in the "docker-users" group
3. **Restart computer:** After adding user to groups

### Port Conflicts
1. **Check what's using ports 3000/5000:**
```cmd
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

2. **Stop conflicting services or change ports**

## 🔧 Manual Docker Installation (Advanced)

If Docker Desktop doesn't work, you can install Docker manually:

### 1. **Install WSL 2** (see above)

### 2. **Install Docker Engine in WSL 2**
```bash
# In Ubuntu WSL
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 3. **Install Docker Compose**
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 4. **Start Docker Service**
```bash
sudo service docker start
```

## 🎯 After Docker is Working

Once Docker is installed and running:

1. **Test Docker:**
```bash
docker run hello-world
```

2. **Start your app:**
```bash
# Windows
start-local.bat

# Or manually
docker-compose -f docker-compose.local.yml up --build -d
```

3. **Open your browser:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api

## 🆘 Still Having Issues?

1. **Check Docker Desktop logs:**
   - Right-click Docker tray icon → Troubleshoot
   - View logs for specific errors

2. **Common solutions:**
   - Restart Docker Desktop
   - Restart your computer
   - Check Windows updates
   - Disable antivirus temporarily

3. **Get help:**
   - Docker Desktop documentation
   - Docker community forums
   - Stack Overflow

---

**💡 Pro Tip:** Docker Desktop is the easiest way to get started. If you have issues, WSL 2 + Docker Engine is a reliable alternative.

**🎯 Goal:** Get Docker running so you can use the local development scripts!
