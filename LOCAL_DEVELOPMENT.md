# 🚀 Local Development Guide

Get your application running on localhost in minutes!

## ⚡ Quick Start

### Option 1: Use the Scripts (Recommended)

**Windows:**
```bash
# Double-click this file or run in Command Prompt
start-local.bat
```

**PowerShell:**
```powershell
# Right-click and "Run with PowerShell" or run in PowerShell
.\start-local.ps1
```

### Option 2: Manual Commands

```bash
# Build and start services
docker-compose -f docker-compose.local.yml up --build -d

# View logs
docker-compose -f docker-compose.local.yml logs -f

# Stop services
docker-compose -f docker-compose.local.yml down
```

## 🌐 Access Your Application

Once running, your application will be available at:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 🔧 Development Features

### Hot Reloading
- Frontend changes automatically refresh the browser
- Backend changes automatically restart the service
- No need to rebuild containers for code changes

### Volume Mounts
- `./src` → `/app/src` (frontend source code)
- `./backend` → `/app` (backend source code)
- `./public` → `/app/public` (static assets)

### Environment Variables
- `NODE_ENV=development`
- `CORS_ORIGIN=http://localhost:3000`
- `VITE_API_URL=http://localhost:5000/api`

## 📋 Prerequisites

1. **Docker Desktop** installed and running
2. **Docker Compose** available
3. **Git** (to clone the repository)

## 🚨 Troubleshooting

### Docker Not Running
```bash
# Start Docker Desktop
# Wait for it to fully start
# Try the script again
```

### Port Already in Use
```bash
# Check what's using the ports
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Stop conflicting services or change ports in docker-compose.local.yml
```

### Services Won't Start
```bash
# Check logs
docker-compose -f docker-compose.local.yml logs

# Rebuild containers
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up --build -d
```

### Permission Issues
```bash
# Run PowerShell as Administrator
# Or use the .bat file instead
```

## 🔄 Common Commands

### Start Development Environment
```bash
docker-compose -f docker-compose.local.yml up -d
```

### View Logs
```bash
# All services
docker-compose -f docker-compose.local.yml logs -f

# Specific service
docker-compose -f docker-compose.local.yml logs -f backend
docker-compose -f docker-compose.local.yml logs -f frontend
```

### Stop Services
```bash
docker-compose -f docker-compose.local.yml down
```

### Restart Services
```bash
docker-compose -f docker-compose.local.yml restart
```

### Rebuild After Changes
```bash
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up --build -d
```

## 🧪 Testing

### Health Check
```bash
# Test backend
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost:3000
```

### API Testing
```bash
# Test backend API endpoints
curl http://localhost:5000/api/your-endpoint

# Use tools like Postman or Insomnia
# Base URL: http://localhost:5000/api
```

## 📁 File Structure

```
your-project/
├── docker-compose.local.yml     # Local development setup
├── start-local.bat             # Windows startup script
├── start-local.ps1             # PowerShell startup script
├── src/                        # Frontend source code
├── backend/                    # Backend source code
└── public/                     # Static assets
```

## 🔍 Debugging

### View Container Status
```bash
docker-compose -f docker-compose.local.yml ps
```

### Access Container Shell
```bash
# Backend container
docker-compose -f docker-compose.local.yml exec backend sh

# Frontend container
docker-compose -f docker-compose.local.yml exec frontend sh
```

### Check Resource Usage
```bash
docker stats
```

## 🚀 Next Steps

1. **Start developing:** Make changes to your code
2. **Test changes:** Refresh browser or restart backend
3. **Add features:** Implement new functionality
4. **Deploy to production:** Use the production deployment guide

## 🆘 Need Help?

1. **Check logs first:** `docker-compose -f docker-compose.local.yml logs -f`
2. **Verify Docker is running:** `docker info`
3. **Check container status:** `docker-compose -f docker-compose.local.yml ps`
4. **Restart services:** `docker-compose -f docker-compose.local.yml restart`

---

**💡 Pro Tip:** Use the startup scripts for the easiest experience. They handle all the setup automatically!

**🎯 Goal:** Get your app running locally so you can develop and test before deploying to production.
